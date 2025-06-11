// Debug utilities for the Caravan game
export class DebugUtils {
  static logGameState(game) {
    console.log('=== GAME STATE ===');
    console.log('Caravan Stats:', game.caravan.stats);
    console.log('Character Stats:', game.character.stats);
    console.log('Equipped Items:', game.character.equippedItems);
    console.log('Backpack:', game.character.backpack);
    console.log('Game Active:', game.gameActive);
    console.log('=================');
  }

  static logInventoryState(inventory) {
    console.log('=== INVENTORY STATE ===');
    console.log('Inventory Open:', inventory.inventoryOpen);
    console.log('Character:', inventory.character);
    console.log('Backpack Items:', inventory.character.backpack.length);
    console.log('Equipped Items Count:', Object.values(inventory.character.equippedItems).filter(item => item !== null).length);
    console.log('======================');
  }

  static addDebugControls() {
    // Add debug panel to the game
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      max-width: 200px;
    `;
    
    debugPanel.innerHTML = `
      <h4>Debug Panel</h4>
      <button onclick="DebugUtils.logGameState(window.caravanGame)">Log Game State</button>
      <button onclick="DebugUtils.logInventoryState(window.caravanGame.inventory)">Log Inventory</button>
      <button onclick="window.caravanGame.inventory.toggleInventory()">Toggle Inventory</button>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Make DebugUtils globally accessible
    window.DebugUtils = DebugUtils;
  }
}

// Auto-add debug controls in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => DebugUtils.addDebugControls(), 1000);
  });
}
