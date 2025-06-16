// Item system classes and data for Svelte
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

  getTooltipData() {
    return {
      name: this.name,
      level: this.level,
      type: this.type,
      physDmg: this.physDmg,
      armor: this.armor,
      properties: this.properties
    };
  }
}

// Predefined items
export const ITEMS = {
  // Helmets
  bearHead: new Item("Bear Head", "helmet", "/img/caravan/helmet.png", 1, 0, 15),
  ironHelmet: new Item("Iron Helmet", "helmet", "/img/caravan/helmet.png", 2, 0, 25),
  dragonHelmet: new Item("Dragon Helmet", "helmet", "/img/caravan/helmet.png", 4, 0, 50),
  crystalHelmet: new Item("Crystal Helmet", "helmet", "/img/caravan/helmet.png", 5, 0, 60),
  
  // Armor
  redCloth: new Item("Red Cloth", "bodyarmour", "/img/caravan/armor.png", 1, 0, 10),
  chainmail: new Item("Chainmail", "bodyarmour", "/img/caravan/armor.png", 2, 0, 20),
  orcArmor: new Item("Orc Armor", "bodyarmour", "/img/caravan/armor.png", 3, 0, 35),
  
  // Weapons
  ironSword: new Item("Iron Sword", "weapon", "/img/caravan/sword.png", 1, 15, 0),
  steelSword: new Item("Steel Sword", "weapon", "/img/caravan/sword.png", 2, 25, 0),
  legendSword: new Item("Legend Sword", "weapon", "/img/caravan/sword.png", 5, 50, 0),
  hunterBow: new Item("Hunter Bow", "weapon", "/img/caravan/sword.png", 3, 30, 0),
  
  // Gloves
  leatherGloves: new Item("Leather Gloves", "glove", "/img/caravan/boot.png", 1, 5, 5),
  battleGauntlets: new Item("Battle Gauntlets", "glove", "/img/caravan/boot.png", 2, 10, 10),
  
  // Belts
  reinforcedBelt: new Item("Reinforced Belt", "belt", "/img/caravan/belt.png", 1, 0, 8),
  magicBelt: new Item("Magic Belt", "belt", "/img/caravan/belt.png", 2, 0, 15),
  mysticBelt: new Item("Mystic Belt", "belt", "/img/caravan/belt.png", 3, 0, 20),
  
  // Boots
  elfBoots: new Item("Elf Boots", "boots", "/img/caravan/boot.png", 2, 0, 12),
  
  // Rings
  royalRing: new Item("Royal Ring", "ring", "/img/caravan/ring.png", 2, 3, 8),
  holyRing: new Item("Holy Ring", "ring", "/img/caravan/ring.png", 3, 5, 12),
  elfRing: new Item("Elf Ring", "ring", "/img/caravan/ring.png", 4, 8, 15),
  
  // Amulets
  magicAmulet: new Item("Magic Amulet", "amulet", "/img/caravan/neklace.png", 2, 2, 10),
  waterAmulet: new Item("Water Amulet", "amulet", "/img/caravan/neklace.png", 2, 0, 15),
  rubyAmulet: new Item("Ruby Amulet", "amulet", "/img/caravan/neklace.png", 4, 5, 20)
};

export const EQUIPMENT_SLOTS = [
  'helmet', 'bodyarmour', 'boots', 'weapon', 'glove', 'amulet', 'ring', 'belt'
];

export function getSlotIcon(slotType) {
  const icons = {
    helmet: '/img/caravan/helmet.png',
    bodyarmour: '/img/caravan/armor.png',
    boots: '/img/caravan/boot.png',
    weapon: '/img/caravan/sword.png',
    glove: '/img/caravan/boot.png',
    amulet: '/img/caravan/neklace.png',
    ring: '/img/caravan/ring.png',
    belt: '/img/caravan/belt.png'
  };
  return icons[slotType] || '';
}
