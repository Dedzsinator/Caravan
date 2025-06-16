<script>
  import { caravanStats, character, gameState, addMessage } from '../stores/gameStore.js';
  import { ITEMS } from '../lib/items.js';

  let debugVisible = true;

  function addTestItems() {
    character.update(char => {
      Object.values(ITEMS).forEach((item, index) => {
        if (index < char.backpack.length && !char.backpack[index]) {
          char.backpack[index] = item;
        }
      });
      return char;
    });
    addMessage('Test items added to backpack!', 'positive');
  }

  function triggerRandomEvent() {
    // This will be handled by the Game component
    addMessage('Random event triggered!', 'neutral');
    if (window.caravanGame && window.caravanGame.triggerEvent) {
      window.caravanGame.triggerEvent();
    }
  }

  function logGameState() {
    console.log('=== GAME STATE ===');
    console.log('Caravan Stats:', $caravanStats);
    console.log('Character Stats:', $character.stats);
    console.log('Equipped Items:', $character.equippedItems);
    console.log('Backpack:', $character.backpack.filter(item => item !== null));
    console.log('UI State:', $gameState);
    console.log('=================');
  }

  function toggleInventory() {
    gameState.update(state => ({ ...state, inventoryOpen: !state.inventoryOpen }));
  }

  function addGold() {
    caravanStats.update(stats => {
      stats.gold += 100;
      return stats;
    });
    addMessage('Added 100 gold!', 'positive');
  }

  function addFood() {
    caravanStats.update(stats => {
      stats.étel += 50;
      return stats;
    });
    addMessage('Added 50 food!', 'positive');
  }

  function hidePanel() {
    debugVisible = false;
  }
</script>

{#if debugVisible}
  <div class="debug-panel">
    <h4>🔧 Debug Panel</h4>
    
    <div class="debug-section">
      <h5>Inventory</h5>
      <button on:click={addTestItems}>Add Test Items</button>
      <button on:click={toggleInventory}>Toggle Inventory</button>
    </div>
    
    <div class="debug-section">
      <h5>Resources</h5>
      <button on:click={addGold}>+100 Gold</button>
      <button on:click={addFood}>+50 Food</button>
    </div>
    
    <div class="debug-section">
      <h5>Events</h5>
      <button on:click={triggerRandomEvent}>Trigger Event</button>
    </div>
    
    <div class="debug-section">
      <h5>Debug</h5>
      <button on:click={logGameState}>Log State</button>
      <button on:click={hidePanel}>Hide Panel</button>
    </div>
  </div>
{/if}

<style>
  .debug-panel {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    z-index: 9999;
    max-width: 200px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }

  .debug-panel h4 {
    margin: 0 0 10px 0;
    color: #32CD32;
    text-align: center;
    font-size: 14px;
  }

  .debug-section {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #333;
  }

  .debug-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .debug-section h5 {
    margin: 0 0 5px 0;
    color: #FFD700;
    font-size: 11px;
  }

  .debug-panel button {
    display: block;
    width: 100%;
    margin: 2px 0;
    padding: 4px 6px;
    background: #333;
    color: white;
    border: 1px solid #555;
    border-radius: 3px;
    cursor: pointer;
    font-size: 10px;
    transition: background 0.2s ease;
  }

  .debug-panel button:hover {
    background: #555;
  }

  .debug-panel button:active {
    background: #777;
  }
</style>
