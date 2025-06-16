<script>
  import { character, totalStats } from '../stores/gameStore.js';

  $: xpProgress = ($character.stats.xp % 50) / 50 * 100; // XP_FOR_LEVEL = 50
  $: nextLevelXp = 50 - ($character.stats.xp % 50); // XP_FOR_LEVEL = 50
</script>

<div class="character-info">
  <h3>Character Stats</h3>
  
  <div class="character-stats">
    <div class="stat-row">
      <span>Level:</span>
      <span>{$character.stats.level}</span>
    </div>
    
    <div class="stat-row">
      <span>XP:</span>
      <span>{$character.stats.xp}</span>
    </div>
    
    <div class="xp-bar">
      <div class="xp-fill" style="width: {xpProgress}%"></div>
      <span class="xp-text">{nextLevelXp} to next level</span>
    </div>
    
    <div class="stat-row">
      <span>Strength:</span>
      <span>{$totalStats.strength}</span>
    </div>
    
    <div class="stat-row">
      <span>Defense:</span>
      <span>{$totalStats.defense}</span>
    </div>
    
    <div class="stat-row">
      <span>Health:</span>
      <span>{$character.stats.health}/{$totalStats.health}</span>
    </div>
    
    <div class="equipped-count">
      <span>Equipped Items:</span>
      <span>{Object.values($character.equippedItems).filter(item => item !== null).length}/8</span>
    </div>
    
    <div class="backpack-count">
      <span>Backpack Items:</span>
      <span>{$character.backpack.filter(item => item !== null).length}/24</span>
    </div>
  </div>
</div>

<style>
  .character-info {
    border: 3px solid #8B4513;
    background-color: #FFD700;
    border-radius: 10px;
    padding: 15px;
    width: 280px;
    height: fit-content;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }

  .character-info h3 {
    margin: 0 0 15px 0;
    color: #8B4513;
    text-align: center;
  }

  .character-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    background-color: rgba(139, 69, 19, 0.1);
    border-radius: 4px;
    font-weight: bold;
    color: #8B4513;
  }

  .xp-bar {
    position: relative;
    height: 20px;
    background-color: #8B4513;
    border-radius: 10px;
    overflow: hidden;
    margin: 4px 0;
  }

  .xp-fill {
    height: 100%;
    background: linear-gradient(90deg, #32CD32, #228B22);
    transition: width 0.3s ease;
  }

  .xp-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFD700;
    font-size: 10px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }

  .equipped-count,
  .backpack-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    background-color: rgba(139, 69, 19, 0.15);
    border-radius: 4px;
    font-weight: bold;
    color: #654321;
    font-size: 13px;
  }
</style>
