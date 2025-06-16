<script>
  import { caravanStats } from '../stores/gameStore.js';

  $: progressPercent = ($caravanStats.distance / 5000) * 100; // FINAL_DISTANCE = 5000
  $: caravanPosition = Math.min(progressPercent * 3.8, 380);
</script>

<div class="progress-area">
  <img 
    class="caravan" 
    src="/img/caravan/caravan.png" 
    alt="Caravan"
    style="left: {caravanPosition}px"
  />
  <img class="trees" src="/img/caravan/road.png" alt="Road Background" />
  
  <div class="progress-info">
    <div class="distance-info">
      {Math.floor($caravanStats.distance)} / 5000 km
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progressPercent}%"></div>
    </div>
  </div>
</div>

<style>
  .progress-area {
    position: relative;
    width: 450px;
    height: 200px;
    margin-left: auto;
    border: 3px solid #8B4513;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(to bottom, #87CEEB, #98FB98);
  }

  .trees {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .caravan {
    position: absolute;
    bottom: 50px;
    width: 60px;
    height: 40px;
    z-index: 2;
    transition: left 0.5s ease;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
  }

  .progress-info {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 3;
  }

  .distance-info {
    background: rgba(139, 69, 19, 0.9);
    color: #FFD700;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
    font-size: 14px;
  }

  .progress-bar {
    height: 8px;
    background-color: rgba(139, 69, 19, 0.7);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #32CD32, #228B22);
    transition: width 0.5s ease;
  }
</style>
