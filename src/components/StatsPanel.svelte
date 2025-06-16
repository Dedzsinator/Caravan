<script>
  import { caravanStats, gameState } from '../stores/gameStore.js';

  function toggleInventory() {
    gameState.update(state => ({
      ...state,
      inventoryOpen: !state.inventoryOpen
    }));
  }
</script>

<div class="stats-area">
  <div class="stat">
    Nap
    <img src="/img/caravan/day.png" alt="Day" />
    <span class="stat-value">{Math.ceil($caravanStats.day)}</span>
  </div>
  
  <div class="stat">
    Távolság
    <img src="/img/caravan/wheel.png" alt="Distance" />
    <span class="stat-value">{Math.floor($caravanStats.distance)}</span>
  </div>
  
  <div class="stat">
    Csapattagok
    <img src="/img/caravan/crew.png" alt="Crew" />
    <span class="stat-value">{$caravanStats.csapattag}</span>
  </div>
  
  <div class="stat">
    Ökrök
    <img src="/img/caravan/ox.png" alt="Oxen" />
    <span class="stat-value">{$caravanStats.ökör}</span>
  </div>
  
  <div class="stat">
    Étel
    <img src="/img/caravan/food.png" alt="Food" />
    <span class="stat-value">{Math.ceil($caravanStats.étel)}</span>
  </div>
  
  <div class="stat">
    Folyadék
    <img src="/img/caravan/liquid.png" alt="Liquid" />
    <span class="stat-value">{Math.ceil($caravanStats.folyadék)}</span>
  </div>
  
  <div class="stat">
    Pénz
    <img src="/img/caravan/coin.png" alt="Money" />
    <span class="stat-value">{$caravanStats.gold}</span>
  </div>
  
  <div class="stat">
    Tűzerő
    <img src="/img/caravan/guns.png" alt="Firepower" />
    <span class="stat-value">{$caravanStats.tűzerő}</span>
  </div>
  
  <div class="stat">
    Súly
    <img src="/img/caravan/heavy.png" alt="Weight" />
    <span class="stat-value">{Math.ceil($caravanStats.weight)}/{$caravanStats.capacity}</span>
  </div>
  
  <button 
    class="inventory-button" 
    class:open={$gameState.inventoryOpen}
    on:click={toggleInventory}
    title="Open Inventory"
  >
    🎒 Inventory
  </button>
</div>

<style>
  .stats-area {
    border: 3px solid #8B4513;
    background-color: #FFD700;
    border-radius: 10px;
    padding: 15px;
    width: 320px;
    height: fit-content;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }

  .stat {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    padding: 5px;
    background-color: #8B4513;
    border-radius: 5px;
    color: #FFD700;
    font-weight: bold;
    font-size: 14px;
  }

  .stat img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    margin-left: 8px;
  }

  .stat-value {
    margin-left: auto;
  }

  .inventory-button {
    width: 50px;
    height: 50px;
    background: url('/img/caravan/book1.png') no-repeat center;
    background-size: cover;
    border: 2px solid #8B4513;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    transition: transform 0.2s ease;
  }

  .inventory-button:hover {
    transform: scale(1.05);
  }

  .inventory-button.open {
    background-image: url('/img/caravan/book2.png');
  }
</style>
