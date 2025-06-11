// Game constants and configuration
export const CONFIG = {
  // Weight and capacity
  WEIGHT_PER_OX: 23,
  WEIGHT_PER_PERSON: 2,
  FOOD_WEIGHT: 0.6,
  LIQUID_WEIGHT: 0.5,
  FIREPOWER_WEIGHT: 5,
  
  // Game timing
  GAME_SPEED: 800,
  DAY_PER_STEP: 0.2,
  
  // Consumption rates
  FOOD_PER_PERSON: 0.02,
  WATER_PER_PERSON: 0.01,
  
  // Movement
  FULL_SPEED: 5,
  SLOW_SPEED: 3,
  FINAL_DISTANCE: 5000,
  
  // Events
  EVENT_PROBABILITY: 0.15,
  ENEMY_FIREPOWER_AVG: 5,
  ENEMY_GOLD_AVG: 50,
  FOOD_AVG: 37,
  
  // Character progression
  XP_PER_DAY: () => Math.floor(Math.random() * 10) + 1,
  XP_FOR_LEVEL: 50
};
