import { Character, ITEMS } from './character.js';

export class InventoryManager {
  constructor(character, uiManager) {
    this.character = character;
    this.ui = uiManager;
    this.draggedItem = null;
    this.dragSource = null;
    this.inventoryOpen = false;
    
    this.initializeInventory();
    this.setupEventListeners();
  }

  initializeInventory() {
    // Add some starting items
    this.character.addItemToBackpack(ITEMS.redCloth);
    this.character.addItemToBackpack(ITEMS.bearHead);
    this.character.addItemToBackpack(ITEMS.ironSword);
  }

  setupEventListeners() {
    const invBtn = document.getElementById('inv-btn');
    
    if (invBtn) {
      invBtn.addEventListener('click', () => this.toggleInventory());
    }

    // Generate backpack slots
    this.generateBackpackSlots();

    // Setup drag and drop for all inventory slots
    this.setupDragAndDrop();
  }

  generateBackpackSlots() {
    const backpackContainer = document.getElementById('backpack-slots');
    if (!backpackContainer) return;

    // Clear existing slots
    backpackContainer.innerHTML = '';

    // Generate 24 backpack slots
    for (let i = 0; i < 24; i++) {
      const slot = document.createElement('div');
      slot.className = 'backpack-slot drop-zone';
      slot.dataset.slotType = 'backpack';
      slot.dataset.slotIndex = i.toString();
      backpackContainer.appendChild(slot);
    }
  }

  toggleInventory() {
    const inventory = document.getElementById('inventory');
    const invBtn = document.getElementById('inv-btn');
    const characterInfo = document.getElementById('character-info');
    
    if (!inventory || !invBtn) return;

    this.inventoryOpen = !this.inventoryOpen;
    
    if (this.inventoryOpen) {
      inventory.classList.remove('hidden');
      if (characterInfo) characterInfo.classList.remove('hidden');
      invBtn.style.background = "url('./img/caravan/book2.png') no-repeat";
      invBtn.style.backgroundSize = "cover";
    } else {
      inventory.classList.add('hidden');
      if (characterInfo) characterInfo.classList.add('hidden');
      invBtn.style.background = "url('./img/caravan/book1.png') no-repeat";
      invBtn.style.backgroundSize = "cover";
    }
    
    this.renderInventory();
  }

  setupDragAndDrop() {
    // Add event listeners to all equipment slots and backpack slots
    document.addEventListener('dragstart', (e) => this.onDragStart(e));
    document.addEventListener('dragover', (e) => this.onDragOver(e));
    document.addEventListener('dragenter', (e) => this.onDragEnter(e));
    document.addEventListener('dragleave', (e) => this.onDragLeave(e));
    document.addEventListener('drop', (e) => this.onDrop(e));
    document.addEventListener('dragend', (e) => this.onDragEnd(e));
  }

  onDragStart(e) {
    const itemElement = e.target.closest('.draggable-item');
    if (!itemElement) return;

    const itemId = itemElement.dataset.itemId;
    const sourceType = itemElement.dataset.sourceType;
    const sourceIndex = itemElement.dataset.sourceIndex;

    this.draggedItem = {
      id: itemId,
      sourceType: sourceType,
      sourceIndex: sourceIndex
    };

    itemElement.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onDragEnter(e) {
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone && this.draggedItem) {
      dropZone.classList.add('drag-hover');
    }
  }

  onDragLeave(e) {
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
      dropZone.classList.remove('drag-hover');
    }
  }

  onDrop(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    if (!dropZone || !this.draggedItem) return;

    dropZone.classList.remove('drag-hover');

    const targetType = dropZone.dataset.slotType;
    const targetIndex = dropZone.dataset.slotIndex;

    this.handleItemMove(this.draggedItem, targetType, targetIndex);
  }

  onDragEnd(e) {
    if (this.draggedItem) {
      const draggedElement = document.querySelector(`[data-item-id="${this.draggedItem.id}"]`);
      if (draggedElement) {
        draggedElement.classList.remove('dragging');
      }
    }

    // Clear drag hover states
    document.querySelectorAll('.drag-hover').forEach(el => {
      el.classList.remove('drag-hover');
    });

    this.draggedItem = null;
  }

  handleItemMove(draggedItem, targetType, targetIndex) {
    const item = this.findItemById(draggedItem.id);
    if (!item) return;

    // Add item to target
    if (targetType === 'equipment') {
      // Validate item type matches equipment slot
      if (item.type !== targetIndex) {
        this.ui.notify(`Cannot equip ${item.name} in ${targetIndex} slot!`, 'negative');
        return;
      }
      
      // Check if there's already an item equipped in target slot
      const currentItem = this.character.equippedItems[targetIndex];
      
      // Remove item from source
      this.removeItemFromSource(draggedItem);
      
      // If there was an item in the target slot, move it to source location
      if (currentItem && draggedItem.sourceType === 'backpack') {
        const sourceIndex = parseInt(draggedItem.sourceIndex);
        while (this.character.backpack.length <= sourceIndex) {
          this.character.backpack.push(null);
        }
        this.character.backpack[sourceIndex] = currentItem;
      } else if (currentItem) {
        // Try to find empty backpack slot for displaced item
        const emptyIndex = this.character.backpack.findIndex(slot => slot === null || slot === undefined);
        if (emptyIndex !== -1) {
          this.character.backpack[emptyIndex] = currentItem;
        } else {
          this.character.backpack.push(currentItem);
        }
      }
      
      // Equip the new item
      this.character.equippedItems[targetIndex] = item;
      this.character.updateStats();
    } else if (targetType === 'backpack') {
      // Remove item from source
      this.removeItemFromSource(draggedItem);
      const index = parseInt(targetIndex);
      
      // Ensure backpack array is properly sized
      while (this.character.backpack.length <= index) {
        this.character.backpack.push(null);
      }
      
      // If target slot is occupied, swap items
      if (this.character.backpack[index]) {
        const existingItem = this.character.backpack[index];
        this.character.backpack[index] = item;
        
        // Put existing item back to source if possible
        if (draggedItem.sourceType === 'backpack') {
          const sourceIndex = parseInt(draggedItem.sourceIndex);
          while (this.character.backpack.length <= sourceIndex) {
            this.character.backpack.push(null);
          }
          this.character.backpack[sourceIndex] = existingItem;
        } else {
          // Try to find empty slot for existing item
          const emptyIndex = this.character.backpack.findIndex(slot => slot === null || slot === undefined);
          if (emptyIndex !== -1) {
            this.character.backpack[emptyIndex] = existingItem;
          } else {
            // If no empty slot, add to end
            this.character.backpack.push(existingItem);
          }
        }
      } else {
        this.character.backpack[index] = item;
      }
    }

    this.renderInventory();
    this.ui.refreshStats();
  }

  findItemById(id) {
    // Check equipped items
    for (const slot in this.character.equippedItems) {
      const item = this.character.equippedItems[slot];
      if (item && item.id === id) {
        return item;
      }
    }

    // Check backpack
    return this.character.backpack.find(item => item.id === id);
  }

  removeItemFromSource(draggedItem) {
    if (draggedItem.sourceType === 'equipment') {
      const slot = draggedItem.sourceIndex;
      this.character.equippedItems[slot] = null;
    } else if (draggedItem.sourceType === 'backpack') {
      const index = parseInt(draggedItem.sourceIndex);
      if (index >= 0 && index < this.character.backpack.length) {
        this.character.backpack[index] = null;
      }
    }
  }

  renderInventory() {
    this.renderEquipmentSlots();
    this.renderBackpack();
  }

  renderEquipmentSlots() {
    const equipmentSlots = {
      helmet: 0,
      bodyarmour: 1,
      boots: 2,
      weapon: 3,
      glove: 4,
      amulet: 5,
      ring: 6,
      belt: 7
    };

    Object.entries(equipmentSlots).forEach(([slotType, index]) => {
      const slotElement = document.querySelector(`[data-slot-type="equipment"][data-slot-index="${slotType}"]`);
      if (!slotElement) return;

      const item = this.character.equippedItems[slotType];
      this.renderItemInSlot(slotElement, item, 'equipment', slotType);
    });
  }

  renderBackpack() {
    const backpackSlots = document.querySelectorAll('[data-slot-type="backpack"]');
    
    backpackSlots.forEach((slot, index) => {
      const item = this.character.backpack[index] || null;
      this.renderItemInSlot(slot, item, 'backpack', index.toString());
    });
  }

  renderItemInSlot(slotElement, item, sourceType, sourceIndex) {
    // Clear existing content
    slotElement.innerHTML = '';

    if (item && item.name && item.name !== 'Empty' && item.id) {
      const itemElement = document.createElement('div');
      itemElement.className = 'draggable-item';
      itemElement.draggable = true;
      itemElement.dataset.itemId = item.id;
      itemElement.dataset.sourceType = sourceType;
      itemElement.dataset.sourceIndex = sourceIndex;

      if (item.image && item.image !== '') {
        itemElement.style.backgroundImage = `url('${item.image}')`;
        itemElement.style.backgroundSize = 'cover';
        itemElement.style.backgroundPosition = 'center';
        itemElement.style.backgroundRepeat = 'no-repeat';
      }

      // Add item name overlay
      const nameElement = document.createElement('div');
      nameElement.className = 'item-name';
      nameElement.textContent = item.name;
      itemElement.appendChild(nameElement);

      // Add tooltip
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'item-tooltip hidden';
      tooltipElement.innerHTML = item.getTooltip();
      itemElement.appendChild(tooltipElement);

      // Add hover events for tooltip
      itemElement.addEventListener('mouseenter', () => {
        tooltipElement.classList.remove('hidden');
      });

      itemElement.addEventListener('mouseleave', () => {
        tooltipElement.classList.add('hidden');
      });

      // Ensure drag events are properly set up
      itemElement.addEventListener('dragstart', (e) => this.onDragStart(e));
      itemElement.addEventListener('dragend', (e) => this.onDragEnd(e));

      slotElement.appendChild(itemElement);
    }
  }

  addItemToBackpack(item) {
    return this.character.addItemToBackpack(item);
  }

  getCharacterStats() {
    return this.character.stats;
  }
}
