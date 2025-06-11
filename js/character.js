// Item system classes and data
export class Item {
  constructor(name, type, image, level = 1, physDmg = 0, armor = 0, properties = {}) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.image = image;
    this.level = level;
    this.physDmg = physDmg;
    this.armor = armor;
    this.properties = properties;
  }

  getTooltip() {
    return `
      <div class="item-tooltip">
        <h3>${this.name}</h3>
        <p>Level: ${this.level}</p>
        <p>Type: ${this.type}</p>
        ${this.physDmg > 0 ? `<p>Physical Damage: ${this.physDmg}</p>` : ''}
        ${this.armor > 0 ? `<p>Armor: ${this.armor}</p>` : ''}
      </div>
    `;
  }
}

export class Character {
  constructor() {
    this.stats = {
      hp: 50,
      mp: 25,
      armor: 0.0,
      shield: 0,
      physDmg: 5,
      fireDmg: 0,
      coldDmg: 0,
      lightningDmg: 0,
      fireResistance: 0,
      coldResistance: 0,
      lightningResistance: 0,
      healPower: 5,
      pureDmg: 0,
      critChance: 10,
      critDmg: 1.0,
      level: 1,
      xp: 0
    };

    this.equippedItems = {
      helmet: null,
      bodyarmour: null,
      glove: null,
      belt: null,
      ring: null,
      amulet: null,
      weapon: null,
      boots: null
    };

    this.backpack = [];
    this.maxBackpackSize = 24;
  }

  equipItem(item, fromSlot = null) {
    const targetSlot = item.type;
    
    if (!this.equippedItems.hasOwnProperty(targetSlot)) {
      return false;
    }

    // Unequip current item if any
    const currentItem = this.equippedItems[targetSlot];
    if (currentItem) {
      this.unequipItem(targetSlot);
    }

    // Equip new item
    this.equippedItems[targetSlot] = item;
    
    // Remove from backpack if it was there
    if (fromSlot === 'backpack') {
      const index = this.backpack.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.backpack.splice(index, 1);
      }
    }

    this.updateStats();
    return true;
  }

  unequipItem(slot) {
    const item = this.equippedItems[slot];
    if (!item) return false;

    // Find empty slot in backpack
    for (let i = 0; i < this.maxBackpackSize; i++) {
      if (!this.backpack[i]) {
        this.backpack[i] = item;
        this.equippedItems[slot] = null;
        this.updateStats();
        return true;
      }
    }
    return false; // Backpack full
  }

  addItemToBackpack(item) {
    // Find the first empty slot
    for (let i = 0; i < this.maxBackpackSize; i++) {
      if (!this.backpack[i]) {
        this.backpack[i] = item;
        return true;
      }
    }
    return false; // Backpack full
  }

  updateStats() {
    // Reset to base stats
    this.stats.armor = 0;
    this.stats.physDmg = 5;
    
    // Apply equipment bonuses
    Object.values(this.equippedItems).forEach(item => {
      if (item) {
        this.stats.armor += item.armor;
        this.stats.physDmg += item.physDmg;
        // Add other stat modifications here
      }
    });
  }

  gainXp(amount) {
    this.stats.xp += amount;
    while (this.stats.xp >= 50) {
      this.levelUp();
    }
  }

  levelUp() {
    this.stats.xp -= 50;
    this.stats.level++;
    this.stats.hp += 25;
    return true;
  }
}

// Predefined items
export const ITEMS = {
  // Helmets
  bearHead: new Item("Bear Head", "helmet", "./img/caravan/helmet.png", 1, 0, 15),
  ironHelmet: new Item("Iron Helmet", "helmet", "./img/caravan/helmet.png", 2, 0, 25),
  
  // Armor
  redCloth: new Item("Red Cloth", "bodyarmour", "./img/caravan/armor.png", 1, 0, 10),
  chainmail: new Item("Chainmail", "bodyarmour", "./img/caravan/armor.png", 2, 0, 20),
  
  // Weapons
  ironSword: new Item("Iron Sword", "weapon", "./img/caravan/sword.png", 1, 15, 0),
  steelSword: new Item("Steel Sword", "weapon", "./img/caravan/sword.png", 2, 25, 0),
  
  // Empty/default items
  empty: {
    helmet: new Item("Empty", "helmet", "", 0, 0, 0),
    bodyarmour: new Item("Empty", "bodyarmour", "", 0, 0, 0),
    glove: new Item("Empty", "glove", "", 0, 0, 0),
    belt: new Item("Empty", "belt", "", 0, 0, 0),
    ring: new Item("Empty", "ring", "", 0, 0, 0),
    amulet: new Item("Empty", "amulet", "", 0, 0, 0),
    weapon: new Item("Empty", "weapon", "", 0, 0, 0),
    boots: new Item("Empty", "boots", "", 0, 0, 0)
  }
};
