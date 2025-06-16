<script>
  import { createEventDispatcher } from 'svelte';
  import { caravanStats, gameState, addMessage } from '../stores/gameStore.js';

  const dispatch = createEventDispatcher();

  let enemyFirepower = 0;
  let enemyGold = 0;

  gameState.subscribe(state => {
    if (state.showAttack && state.currentEvent) {
      enemyFirepower = state.currentEvent.enemyFirepower || 0;
      enemyGold = state.currentEvent.enemyGold || 0;
    }
  });

  function fight() {
    caravanStats.update(stats => {
      const playerAdvantage = stats.tűzerő - enemyFirepower;
      const damage = Math.ceil(Math.max(0, 
        enemyFirepower * (0.5 + Math.random() * 0.5) - playerAdvantage * 0.2
      ));

      if (damage < stats.csapattag) {
        stats.csapattag -= damage;
        stats.gold += enemyGold;
        addMessage(`Győztél! ${damage} embered halt meg. Találtál ${enemyGold} aranyat`, 'positive');
      } else {
        stats.csapattag = 0;
        addMessage('Mindenki meghalt a csatában! Vesztettél!', 'negative');
      }

      return stats;
    });

    closeAttack();
  }

  function runaway() {
    caravanStats.update(stats => {
      const damage = Math.ceil(Math.max(0, enemyFirepower * Math.random() * 0.3));

      if (damage < stats.csapattag) {
        stats.csapattag -= damage;
        addMessage(`Sikeresen elmenekültél! ${damage} ember halt meg a menekülés során.`, 'negative');
      } else {
        stats.csapattag = 0;
        addMessage('Mindenki meghalt a menekülés során!', 'negative');
      }

      return stats;
    });

    closeAttack();
  }

  function closeAttack() {
    dispatch('close');
  }
</script>

<div class="attack-overlay">
  <div class="attack">
    <h2>Támadás!</h2>
    
    <div class="attack-description">
      <p>Ellenség tűzereje: <strong>{enemyFirepower}</strong></p>
      <p>Saját tűzerőd: <strong>{$caravanStats.tűzerő}</strong></p>
      <p>Lehetséges zsákmány: <strong>{enemyGold} arany</strong></p>
    </div>
    
    <div class="attack-buttons">
      <button type="button" class="btn fight-btn" on:click={fight}>
        Harc!
      </button>
      <button type="button" class="btn runaway-btn" on:click={runaway}>
        Visszavonulás
      </button>
    </div>
  </div>
</div>

<style>
  .attack-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .attack {
    width: 400px;
    background-color: #FFD700;
    border: 5px solid #8B4513;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .attack h2 {
    color: #DC143C;
    margin: 0 0 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .attack-description {
    background-color: #D2B48C;
    border: 2px solid #8B4513;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .attack-description p {
    margin: 8px 0;
    color: #8B4513;
    font-size: 16px;
  }

  .attack-description strong {
    color: #DC143C;
  }

  .attack-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .btn {
    border: 2px solid #654321;
    border-radius: 8px;
    color: #FFD700;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    flex: 1;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }

  .fight-btn {
    background-color: #DC143C;
  }

  .fight-btn:hover {
    background-color: #B22222;
  }

  .runaway-btn {
    background-color: #8B4513;
  }

  .runaway-btn:hover {
    background-color: #A0522D;
  }
</style>
