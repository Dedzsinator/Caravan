import { CONFIG } from './config.js';
import { CaravanManager } from './caravan.js';
import { Character } from './character.js';
import { InventoryManager } from './inventory.js';
import { UIManager } from './ui.js';
import { EventManager } from './events.js';
import { AudioManager } from './audio.js';
import { DebugUtils } from './debug.js';

export class Game {
  constructor() {
    this.gameActive = false;
    this.previousTime = null;
    
    this.initializeManagers();
    this.setupEventListeners();
  }

  initializeManagers() {
    // Initialize core managers
    this.caravan = new CaravanManager();
    this.character = new Character();
    this.ui = new UIManager(this.caravan, this.character);
    this.inventory = new InventoryManager(this.character, this.ui);
    this.eventManager = new EventManager(this.caravan, this.ui, this);
    this.audioManager = new AudioManager();

    // Set up cross-references
    this.ui.game = this;
    this.ui.inventory = this.inventory;

    // Initialize caravan with starting stats
    this.caravan.init({
      day: 0,
      distance: 0,
      csapattag: 30,
      étel: 80,
      folyadék: 100,
      ökör: 2,
      gold: 300,
      tűzerő: 2
    });

    this.caravan.ui = this.ui;
  }

  setupEventListeners() {
    // Setup inventory button
    const invBtn = document.getElementById('inv-btn');
    if (invBtn) {
      invBtn.classList.remove('hidden');
      invBtn.style.background = "url('./img/caravan/book1.png') no-repeat";
      invBtn.style.backgroundSize = "cover";
      invBtn.style.width = "50px";
      invBtn.style.height = "50px";
      invBtn.style.cursor = "pointer";
      invBtn.style.border = "2px solid brown";
      invBtn.style.borderRadius = "5px";
    }
  }

  startJourney() {
    this.gameActive = true;
    this.previousTime = null;
    this.ui.notify('Egy új kaland veszi kezdetét!', 'positive');
    
    // Initial UI update
    this.ui.refreshStats();
    
    // Start game loop
    this.step();
  }

  step(timestamp) {
    if (!this.previousTime) {
      this.previousTime = timestamp;
      this.updateGame();
    }

    const progress = timestamp - this.previousTime;

    if (progress >= CONFIG.GAME_SPEED) {
      this.previousTime = timestamp;
      this.updateGame();
    }

    if (this.gameActive) {
      window.requestAnimationFrame((ts) => this.step(ts));
    }
  }

  updateGame() {
    // Update day
    this.caravan.stats.day += CONFIG.DAY_PER_STEP;
    
    // Give character XP
    this.character.gainXp(CONFIG.XP_PER_DAY());

    // Consume resources
    this.caravan.consumeFood();
    this.caravan.consumeWater();

    // Check for food shortage
    if (this.caravan.étel === 0) {
      this.ui.notify('A karavánod éhenhalt!', 'negative');
      this.gameActive = false;
      return;
    }

    // Check for crew death
    if (this.caravan.csapattag <= 0) {
      this.caravan.csapattag = 0;
      this.ui.notify('Mindenki meghalt!', 'negative');
      this.gameActive = false;
      return;
    }

    // Check for ox loss
    if (this.caravan.ökör <= 0) {
      this.caravan.ökör = 0;
      this.ui.notify('Elfogytak az ökreid, így nem tudsz hazaérni!', 'negative');
      this.gameActive = false;
      return;
    }

    // Update caravan state
    this.caravan.updateWeight();
    this.caravan.updateDistance();

    // Update UI
    this.ui.refreshStats();

    // Check win condition
    if (this.caravan.distance >= CONFIG.FINAL_DISTANCE) {
      this.ui.notify('Hazaértél! Gratulálok!', 'positive');
      this.gameActive = false;
      return;
    }

    // Random events
    if (Math.random() <= CONFIG.EVENT_PROBABILITY) {
      this.eventManager.generateEvent();
    }
  }

  pauseJourney() {
    this.gameActive = false;
  }

  resumeJourney() {
    this.gameActive = true;
    this.step();
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing Caravan Game...');
    const game = new Game();
    game.startJourney();
    
    // Make game globally accessible for debugging
    window.caravanGame = game;
    console.log('Game initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize game:', error);
  }
});
