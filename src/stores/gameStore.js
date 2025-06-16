import { writable, derived } from 'svelte/store';

// Caravan stats store
export const caravanStats = writable({
  day: 0,
  distance: 0,
  csapattag: 30,
  étel: 80,
  folyadék: 100,
  ökör: 2,
  gold: 300,
  tűzerő: 2,
  weight: 0,
  capacity: 0
});

// Character store
export const character = writable({
  stats: {
    level: 1,
    xp: 0,
    strength: 10,
    defense: 10,
    maxHealth: 100,
    health: 100
  },
  equippedItems: {
    helmet: null,
    bodyarmour: null,
    boots: null,
    weapon: null,
    glove: null,
    amulet: null,
    ring: null,
    belt: null
  },
  backpack: new Array(24).fill(null)
});

// Game state store
export const gameState = writable({
  gameActive: false,
  inventoryOpen: false,
  currentEvent: null,
  showShop: false,
  showAttack: false,
  showGood: false,
  showChoice: false
});

// UI messages store
export const messages = writable([]);

// Derived stores
export const characterLevel = derived(
  character,
  $character => Math.floor($character.stats.xp / 50) + 1 // XP_FOR_LEVEL = 50
);

export const totalStats = derived(
  character,
  $character => {
    let totalBonus = { strength: 0, defense: 0, health: 0 };
    
    Object.values($character.equippedItems).forEach(item => {
      if (item) {
        totalBonus.strength += item.physDmg || 0;
        totalBonus.defense += item.armor || 0;
        totalBonus.health += item.health || 0;
      }
    });
    
    return {
      strength: $character.stats.strength + totalBonus.strength,
      defense: $character.stats.defense + totalBonus.defense,
      health: $character.stats.maxHealth + totalBonus.health
    };
  }
);

// Game store with actions
function createGameStore() {
  const { subscribe, set, update } = writable({
    initialized: false,
    paused: false
  });

  return {
    subscribe,
    initialize: () => update(state => ({ ...state, initialized: true })),
    pause: () => update(state => ({ ...state, paused: true })),
    resume: () => update(state => ({ ...state, paused: false })),
    reset: () => set({ initialized: false, paused: false })
  };
}

export const gameStore = createGameStore();

// Helper functions for store operations
export function addMessage(text, type) {
  messages.update(msgs => {
    const newMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date()
    };
    
    const updated = [newMessage, ...msgs];
    return updated.slice(0, 20); // Keep only 20 most recent messages
  });
}

export function updateCaravanStats(updates) {
  caravanStats.update(stats => ({ ...stats, ...updates }));
}

export function addItemToBackpack(item) {
  character.update(char => {
    const emptySlot = char.backpack.findIndex(slot => slot === null);
    if (emptySlot !== -1) {
      char.backpack[emptySlot] = item;
    }
    return char;
  });
}

export function equipItem(item, slot) {
  character.update(char => {
    // Remove from backpack if it's there
    const backpackIndex = char.backpack.findIndex(bItem => bItem && bItem.id === item.id);
    if (backpackIndex !== -1) {
      char.backpack[backpackIndex] = null;
    }
    
    // Unequip current item and move to backpack
    if (char.equippedItems[slot]) {
      const emptySlot = char.backpack.findIndex(slot => slot === null);
      if (emptySlot !== -1) {
        char.backpack[emptySlot] = char.equippedItems[slot];
      }
    }
    
    // Equip new item
    char.equippedItems[slot] = item;
    return char;
  });
}

export function gainXp(amount) {
  character.update(char => {
    char.stats.xp += amount;
    
    // Check for level up
    const XP_FOR_LEVEL = 50;
    const newLevel = Math.floor(char.stats.xp / XP_FOR_LEVEL) + 1;
    if (newLevel > char.stats.level) {
      char.stats.level = newLevel;
      char.stats.strength += 2;
      char.stats.defense += 1;
      char.stats.maxHealth += 10;
      addMessage(`Level up! You are now level ${newLevel}`, 'positive');
    }
    
    return char;
  });
}
