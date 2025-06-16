<script>
  import { createEventDispatcher } from 'svelte';
  import { caravanStats, addMessage } from '../stores/gameStore.js';

  const dispatch = createEventDispatcher();

  function accept() {
    caravanStats.update(stats => {
      const gotFood = Math.floor((Math.random() * 20) + 1);
      stats.étel += gotFood;
      addMessage(`Az öregúr adott neked ${gotFood} ételt!`, 'positive');
      return stats;
    });

    closeGood();
  }

  function decline() {
    addMessage('Nem fogadtad el az öregúr ajánlatát!', 'neutral');
    closeGood();
  }

  function closeGood() {
    dispatch('close');
  }
</script>

<div class="good-overlay">
  <div class="good">
    <h2>Jó találkozás!</h2>
    
    <div class="good-description">
      <p>Egy rejtélyes öregúr felajánlja, hogy segítsen neked.</p>
      <p>Elfogadod az ajánlatát?</p>
      <p>Jelenlegi étel mennyiséged: <strong>{Math.ceil($caravanStats.étel)}</strong></p>
    </div>
    
    <div class="good-buttons">
      <button type="button" class="btn accept-btn" on:click={accept}>
        Elfogadás
      </button>
      <button type="button" class="btn decline-btn" on:click={decline}>
        Elutasítás
      </button>
    </div>
  </div>
</div>

<style>
  .good-overlay {
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

  .good {
    width: 400px;
    background-color: #FFD700;
    border: 5px solid #8B4513;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .good h2 {
    color: #32CD32;
    margin: 0 0 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .good-description {
    background-color: #D2B48C;
    border: 2px solid #8B4513;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .good-description p {
    margin: 8px 0;
    color: #8B4513;
    font-size: 16px;
  }

  .good-description strong {
    color: #32CD32;
  }

  .good-buttons {
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

  .accept-btn {
    background-color: #32CD32;
  }

  .accept-btn:hover {
    background-color: #228B22;
  }

  .decline-btn {
    background-color: #8B4513;
  }

  .decline-btn:hover {
    background-color: #A0522D;
  }
</style>
