<script>
  import { character, gameState, equipItem, addItemToBackpack } from '../stores/gameStore.js';
  import { EQUIPMENT_SLOTS, getSlotIcon } from '../lib/items.js';
  import ItemSlot from './ItemSlot.svelte';

  let draggedItem = null;
  let draggedFromSlot = null;
  let draggedFromIndex = null;

  function handleDragStart(event, item, fromSlot, fromIndex) {
    draggedItem = item;
    draggedFromSlot = fromSlot;
    draggedFromIndex = fromIndex;
    
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', '');
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event, targetSlot, targetIndex) {
    event.preventDefault();
    
    if (!draggedItem) return;

    // Handle equipment slot drops
    if (targetSlot === 'equipment') {
      if (draggedItem.type === targetIndex) {
        character.update(char => {
          // Remove from source
          if (draggedFromSlot === 'equipment') {
            char.equippedItems[draggedFromIndex] = null;
          } else if (draggedFromSlot === 'backpack') {
            char.backpack[draggedFromIndex] = null;
          }
          
          // If there's already an item equipped, move it to backpack
          if (char.equippedItems[targetIndex]) {
            const emptySlot = char.backpack.findIndex(slot => slot === null);
            if (emptySlot !== -1) {
              char.backpack[emptySlot] = char.equippedItems[targetIndex];
            }
          }
          
          // Equip the new item
          char.equippedItems[targetIndex] = draggedItem;
          return char;
        });
      }
    }
    
    // Handle backpack slot drops
    else if (targetSlot === 'backpack') {
      character.update(char => {
        // Store what's currently in target slot
        const targetItem = char.backpack[targetIndex];
        
        // Remove from source
        if (draggedFromSlot === 'equipment') {
          char.equippedItems[draggedFromIndex] = null;
        } else if (draggedFromSlot === 'backpack') {
          char.backpack[draggedFromIndex] = null;
        }
        
        // Place dragged item in target
        char.backpack[targetIndex] = draggedItem;
        
        // If there was an item in target and source was backpack, swap them
        if (targetItem && draggedFromSlot === 'backpack') {
          char.backpack[draggedFromIndex] = targetItem;
        }
        
        return char;
      });
    }

    // Clear drag state
    draggedItem = null;
    draggedFromSlot = null;
    draggedFromIndex = null;
  }

  function closeInventory() {
    gameState.update(state => ({ ...state, inventoryOpen: false }));
  }
</script>

{#if $gameState.inventoryOpen}
  <div class="inventory-overlay" on:click={closeInventory}>
    <div class="inventory" on:click|stopPropagation>
      <div class="inventory-header">
        <h2>Inventory</h2>
        <button type="button" class="btn close-inventory" on:click={closeInventory}>
          Close
        </button>
      </div>
      
      <div class="inventory-container">
        <div class="character-display">
          <img src="/img/caravan/player.png" alt="Character" class="character-image" />
          
          <!-- Equipment Slots -->
          <div class="equipment-slots">
            {#each EQUIPMENT_SLOTS as slotType}
              <div 
                class="equipment-slot {slotType}-slot drop-zone"
                class:has-item={$character.equippedItems[slotType]}
                on:dragover={handleDragOver}
                on:drop={(e) => handleDrop(e, 'equipment', slotType)}
              >
                {#if $character.equippedItems[slotType]}
                  <ItemSlot 
                    item={$character.equippedItems[slotType]}
                    slotType="equipment"
                    slotIndex={slotType}
                    on:dragstart={(e) => handleDragStart(e.detail, $character.equippedItems[slotType], 'equipment', slotType)}
                  />
                {:else}
                  <div class="slot-icon" style="background-image: url('{getSlotIcon(slotType)}')"></div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Backpack Grid -->
        <div class="backpack-grid">
          <h3>Backpack</h3>
          <div class="backpack-slots">
            {#each Array(24) as _, index}
              <div 
                class="backpack-slot drop-zone"
                class:has-item={$character.backpack[index]}
                on:dragover={handleDragOver}
                on:drop={(e) => handleDrop(e, 'backpack', index)}
              >
                {#if $character.backpack[index]}
                  <ItemSlot 
                    item={$character.backpack[index]}
                    slotType="backpack"
                    slotIndex={index}
                    on:dragstart={(e) => handleDragStart(e.detail, $character.backpack[index], 'backpack', index)}
                  />
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .inventory-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .inventory {
    width: 800px;
    height: 600px;
    background-color: #FFD700;
    border: 5px solid #8B4513;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .inventory-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #8B4513;
  }

  .inventory-header h2 {
    color: #8B4513;
    margin: 0;
  }

  .close-inventory {
    background-color: #DC143C;
    border: 2px solid #B22222;
    border-radius: 8px;
    color: #FFD700;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .close-inventory:hover {
    background-color: #B22222;
    transform: translateY(-1px);
  }

  .inventory-container {
    display: flex;
    gap: 20px;
    height: calc(100% - 80px);
  }

  .character-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
  }

  .character-image {
    width: 120px;
    height: 200px;
    object-fit: cover;
    border: 3px solid #8B4513;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .equipment-slots {
    display: grid;
    grid-template-columns: repeat(3, 60px);
    grid-template-rows: repeat(3, 60px);
    gap: 10px;
    position: relative;
  }

  .equipment-slot {
    width: 60px;
    height: 60px;
    border: 3px solid #8B4513;
    border-radius: 8px;
    background-color: #D2B48C;
    position: relative;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .equipment-slot.has-item {
    background-color: #FFD700;
  }

  .equipment-slot:hover {
    border-color: #32CD32;
    transform: scale(1.05);
  }

  .slot-icon {
    width: 80%;
    height: 80%;
    background-size: cover;
    background-position: center;
    opacity: 0.3;
  }

  /* Equipment slot positioning */
  .helmet-slot { grid-column: 2; grid-row: 1; }
  .armor-slot { grid-column: 2; grid-row: 2; }
  .boots-slot { grid-column: 2; grid-row: 3; }
  .weapon-slot { grid-column: 1; grid-row: 2; }
  .glove-slot { grid-column: 3; grid-row: 2; }
  .amulet-slot { grid-column: 1; grid-row: 1; }
  .ring-slot { grid-column: 3; grid-row: 1; }
  .belt-slot { grid-column: 1; grid-row: 3; }

  .backpack-grid {
    flex: 1;
  }

  .backpack-grid h3 {
    color: #8B4513;
    margin: 0 0 15px 0;
    text-align: center;
  }

  .backpack-slots {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 5px;
    height: calc(100% - 45px);
  }

  .backpack-slot {
    border: 2px solid #8B4513;
    border-radius: 6px;
    background-color: #D2B48C;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
  }

  .backpack-slot.has-item {
    background-color: #FFD700;
  }

  .backpack-slot:hover {
    border-color: #32CD32;
    transform: scale(1.05);
  }

  .drop-zone:hover {
    border-color: #32CD32;
    background-color: rgba(50, 205, 50, 0.1);
  }
</style>
