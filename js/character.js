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
  dragonHelmet: new Item("Dragon Helmet", "helmet", "./img/caravan/helmet.png", 4, 0, 50),
  crystalHelmet: new Item("Crystal Helmet", "helmet", "./img/caravan/helmet.png", 5, 0, 60),
  
  // Armor
  redCloth: new Item("Red Cloth", "bodyarmour", "./img/caravan/armor.png", 1, 0, 10),
  chainmail: new Item("Chainmail", "bodyarmour", "./img/caravan/armor.png", 2, 0, 20),
  orcArmor: new Item("Orc Armor", "bodyarmour", "./img/caravan/armor.png", 3, 0, 35),
  
  // Weapons
  ironSword: new Item("Iron Sword", "weapon", "./img/caravan/sword.png", 1, 15, 0),
  steelSword: new Item("Steel Sword", "weapon", "./img/caravan/sword.png", 2, 25, 0),
  legendSword: new Item("Legend Sword", "weapon", "./img/caravan/sword.png", 5, 50, 0),
  hunterBow: new Item("Hunter Bow", "weapon", "./img/caravan/sword.png", 3, 30, 0),
  
  // Gloves
  leatherGloves: new Item("Leather Gloves", "glove", "./img/caravan/boot.png", 1, 5, 5),
  battleGauntlets: new Item("Battle Gauntlets", "glove", "./img/caravan/boot.png", 2, 10, 10),
  
  // Belts
  reinforcedBelt: new Item("Reinforced Belt", "belt", "./img/caravan/belt.png", 1, 0, 8),
  magicBelt: new Item("Magic Belt", "belt", "./img/caravan/belt.png", 2, 0, 15),
  mysticBelt: new Item("Mystic Belt", "belt", "./img/caravan/belt.png", 3, 0, 20),
  
  // Boots
  elfBoots: new Item("Elf Boots", "boots", "./img/caravan/boot.png", 2, 0, 12),
  
  // Rings
  royalRing: new Item("Royal Ring", "ring", "./img/caravan/ring.png", 2, 3, 8),
  holyRing: new Item("Holy Ring", "ring", "./img/caravan/ring.png", 3, 5, 12),
  elfRing: new Item("Elf Ring", "ring", "./img/caravan/ring.png", 4, 8, 15),
  
  // Amulets
  magicAmulet: new Item("Magic Amulet", "amulet", "./img/caravan/neklace.png", 2, 2, 10),
  waterAmulet: new Item("Water Amulet", "amulet", "./img/caravan/neklace.png", 2, 0, 15),
  rubyAmulet: new Item("Ruby Amulet", "amulet", "./img/caravan/neklace.png", 4, 5, 20),
  
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
