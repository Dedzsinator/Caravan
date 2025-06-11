// Final game demonstration and feature showcase
import { Game } from './js/game.js';

class GameDemo {
  constructor() {
    this.game = null;
    this.setupDemo();
  }

  async setupDemo() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initDemo());
    } else {
      this.initDemo();
    }
  }

  initDemo() {
    try {
      console.log('🎮 Initializing Caravan Game Demo...');
      
      // Initialize the game
      this.game = new Game();
      this.game.startJourney();
      
      // Make globally accessible
      window.caravanGame = this.game;
      window.gameDemo = this;
      
      console.log('✅ Game initialized successfully!');
      console.log('🎒 Inventory system ready');
      console.log('🚐 Caravan mechanics active');
      console.log('⚔️ Character progression enabled');
      console.log('🎵 Audio system loaded');
      
      // Show welcome message
      setTimeout(() => {
        this.showWelcomeMessage();
      }, 1000);
      
    } catch (error) {
      console.error('❌ Failed to initialize game:', error);
      this.showErrorMessage(error);
    }
  }

  showWelcomeMessage() {
    if (this.game && this.game.ui) {
      this.game.ui.notify('🎉 Modernized Caravan Game Loaded! Click the book icon to open inventory.', 'positive');
      
      // Demonstrate features after a delay
      setTimeout(() => {
        this.demonstrateFeatures();
      }, 3000);
    }
  }

  demonstrateFeatures() {
    const features = [
      'Drag & Drop Inventory System',
      'Character Progression with XP',
      'Enhanced UI and Modern Styling',
      'Modular JavaScript Architecture',
      'Improved Event System',
      'Audio Controls',
      'Responsive Design'
    ];

    features.forEach((feature, index) => {
      setTimeout(() => {
        this.game.ui.notify(`✨ Feature: ${feature}`, 'neutral');
      }, index * 1000);
    });
  }

  showErrorMessage(error) {
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: 'Girassol', cursive;
        color: white;
        text-align: center;
      ">
        <div style="
          background: rgba(255,255,255,0.1);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        ">
          <h1>⚠️ Game Loading Error</h1>
          <p>There was an issue initializing the Caravan game:</p>
          <code style="
            display: block;
            background: rgba(0,0,0,0.3);
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            white-space: pre-wrap;
          ">${error.message}</code>
          <button onclick="location.reload()" style="
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          ">Reload Game</button>
        </div>
      </div>
    `;
  }

  // Demo functions for testing
  openInventory() {
    if (this.game && this.game.inventory) {
      this.game.inventory.toggleInventory();
    }
  }

  addTestItems() {
    if (this.game && this.game.character) {
      // Add some test items to demonstrate the system
      console.log('Adding test items to inventory...');
      // Items are already added in the initialization
      this.game.ui.notify('🎁 Test items added to inventory!', 'positive');
    }
  }

  showGameStats() {
    if (this.game) {
      console.log('=== GAME STATISTICS ===');
      console.log('Day:', Math.ceil(this.game.caravan.day));
      console.log('Distance:', Math.floor(this.game.caravan.distance));
      console.log('Crew:', this.game.caravan.csapattag);
      console.log('Character Level:', this.game.character.stats.level);
      console.log('Character XP:', this.game.character.stats.xp);
      console.log('Equipped Items:', Object.keys(this.game.character.equippedItems).filter(k => this.game.character.equippedItems[k]).length);
      console.log('Backpack Items:', this.game.character.backpack.filter(item => item).length);
      console.log('======================');
    }
  }
}

// Initialize the demo
new GameDemo();

// Add global demo functions
window.demoFunctions = {
  openInventory: () => window.gameDemo?.openInventory(),
  addTestItems: () => window.gameDemo?.addTestItems(),
  showStats: () => window.gameDemo?.showGameStats(),
  toggleAudio: () => window.caravanGame?.audioManager?.togglePlayPause(),
  pauseGame: () => window.caravanGame?.pauseJourney(),
  resumeGame: () => window.caravanGame?.resumeJourney()
};
