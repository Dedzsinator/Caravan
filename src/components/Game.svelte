<script>
  import { onMount, onDestroy } from 'svelte';
  import StatsPanel from './StatsPanel.svelte';
  import UpdatesArea from './UpdatesArea.svelte';
  import CharacterInfo from './CharacterInfo.svelte';
  import Inventory from './Inventory.svelte';
  import Shop from './Shop.svelte';
  import Attack from './Attack.svelte';
  import Good from './Good.svelte';
  import Choice from './Choice.svelte';
  import ProgressArea from './ProgressArea.svelte';
  import { gameState, caravanStats, character, addMessage, gainXp } from '../stores/gameStore.js';
  import { EventManager } from '../lib/events.js';
  import { ITEMS } from '../lib/items.js';

  let gameActive = false;
  let previousTime = null;
  let animationFrame = null;
  
  // Get reactive store values
  $: currentCaravanStats = $caravanStats;
  
  const eventManager = new EventManager();

  onMount(() => {
    initializeGame();
    startJourney();
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });

  function initializeGame() {
    // Initialize caravan with starting stats
    caravanStats.set({
      day: 0,
      distance: 0,
      csapattag: 30,
      étel: 80,
      folyadék: 100,
      ökör: 2,
      gold: 300,
      tűzerő: 2,
      weight: 0,
      capacity: 0
    });

    // Add some starting items to character
    character.update(char => {
      char.backpack[0] = ITEMS.redCloth;
      char.backpack[1] = ITEMS.ironSword;
      char.backpack[2] = ITEMS.bearHead;
      char.backpack[3] = ITEMS.leatherGloves;
      return char;
    });

    addMessage('Egy új kaland veszi kezdetét!', 'positive');
  }

  function startJourney() {
    gameActive = true;
    previousTime = null;
    animationFrame = requestAnimationFrame(step);
  }

  function step(timestamp) {
    if (!previousTime) {
      previousTime = timestamp;
      updateGame();
    }

    const progress = timestamp - previousTime;

    if (progress >= 800) { // GAME_SPEED
      previousTime = timestamp;
      updateGame();
    }

    if (gameActive) {
      animationFrame = requestAnimationFrame(step);
    }
  }

  function updateGame() {
    caravanStats.update(stats => {
      // Update day
      stats.day += 0.2; // DAY_PER_STEP

      // Consume resources
      stats.étel -= stats.csapattag * 0.02; // FOOD_PER_PERSON
      stats.folyadék -= stats.csapattag * 0.01; // WATER_PER_PERSON

      // Ensure values don't go negative
      stats.étel = Math.max(0, stats.étel);
      stats.folyadék = Math.max(0, stats.folyadék);

      // Update weight and capacity
      stats.capacity = stats.ökör * 23 + stats.csapattag * 2; // WEIGHT_PER_OX, WEIGHT_PER_PERSON
      stats.weight = stats.étel * 0.6 + stats.tűzerő * 5; // FOOD_WEIGHT, FIREPOWER_WEIGHT

      // Drop items if overweight
      while (stats.tűzerő > 0 && stats.capacity <= stats.weight) {
        stats.tűzerő--;
        stats.weight -= 5; // FIREPOWER_WEIGHT
        addMessage('Egy fegyvered veszett oda!', 'negative');
      }

      // Update distance
      const diff = stats.capacity - stats.weight + stats.ökör;
      const speed = 3 + (diff / stats.capacity) * 5; // SLOW_SPEED, FULL_SPEED
      stats.distance += speed;

      return stats;
    });

    // Give character XP
    gainXp(Math.floor(Math.random() * 10) + 1); // XP_PER_DAY

    // Check game over conditions (get current values instead of subscribing)
    const currentStats = currentCaravanStats;
    if (currentStats.étel === 0) {
      addMessage('A karavánod éhenhalt!', 'negative');
      gameActive = false;
      return;
    }

    if (currentStats.csapattag <= 0) {
      addMessage('Mindenki meghalt!', 'negative');
      gameActive = false;
      return;
    }

    if (currentStats.ökör <= 0) {
      addMessage('Elfogytak az ökreid, így nem tudsz hazaérni!', 'negative');
      gameActive = false;
      return;
    }

    if (currentStats.distance >= 5000) { // FINAL_DISTANCE
      addMessage('Hazaértél! Gratulálok!', 'positive');
      gameActive = false;
      return;
    }

    // Random events
    if (Math.random() <= 0.15) { // EVENT_PROBABILITY
      handleRandomEvent();
    }
  }

  function handleRandomEvent() {
    const event = eventManager.generateRandomEvent();
    
    switch (event.type) {
      case 'STAT-CHANGE':
        handleStatChangeEvent(event);
        break;
      case 'ITEM-REWARD':
        handleItemRewardEvent(event);
        break;
      case 'SHOP':
        handleShopEvent(event);
        break;
      case 'ATTACK':
        handleAttackEvent(event);
        break;
      case 'GOOD':
        handleGoodEvent(event);
        break;
      case 'CHOICE':
        handleChoiceEvent(event);
        break;
    }
  }

  function handleStatChangeEvent(event) {
    caravanStats.update(stats => {
      if (event.value + stats[event.stat] >= 0) {
        stats[event.stat] += event.value;
        addMessage(event.text + Math.abs(event.value), event.notification);
      }
      return stats;
    });
  }

  function handleItemRewardEvent(event) {
    const item = ITEMS[event.item];
    if (item) {
      character.update(char => {
        const emptySlot = char.backpack.findIndex(slot => slot === null);
        if (emptySlot !== -1) {
          char.backpack[emptySlot] = item;
          addMessage(event.text, event.notification);
          if (event.xp) {
            gainXp(event.xp);
            addMessage(`+${event.xp} XP gained!`, 'positive');
          }
        } else {
          addMessage('Your backpack is full! Item lost.', 'negative');
        }
        return char;
      });
    }
  }

  function handleShopEvent(event) {
    gameActive = false;
    addMessage(event.text, event.notification);
    gameState.update(state => ({ ...state, showShop: true, currentEvent: event }));
  }

  function handleAttackEvent(event) {
    gameActive = false;
    addMessage(event.text, event.notification);
    
    const enemyFirepower = Math.round((0.7 + 0.6 * Math.random()) * 5); // ENEMY_FIREPOWER_AVG
    const enemyGold = Math.round((0.7 + 0.6 * Math.random()) * 50); // ENEMY_GOLD_AVG
    
    gameState.update(state => ({ 
      ...state, 
      showAttack: true, 
      currentEvent: { ...event, enemyFirepower, enemyGold }
    }));
  }

  function handleGoodEvent(event) {
    gameActive = false;
    addMessage(event.text, event.notification);
    gameState.update(state => ({ ...state, showGood: true, currentEvent: event }));
  }

  function handleChoiceEvent(event) {
    gameActive = false;
    addMessage(event.text, event.notification);
    gameState.update(state => ({ ...state, showChoice: true, currentEvent: event }));
  }

  function resumeJourney() {
    gameActive = true;
    gameState.update(state => ({
      ...state,
      showShop: false,
      showAttack: false,
      showGood: false,
      showChoice: false,
      currentEvent: null
    }));
    animationFrame = requestAnimationFrame(step);
  }

  function pauseJourney() {
    gameActive = false;
  }

  // Make functions available globally for debugging
  if (typeof window !== 'undefined') {
    window.caravanGame = {
      pauseJourney,
      resumeJourney,
      addTestItems: () => {
        character.update(char => {
          Object.values(ITEMS).forEach((item, index) => {
            if (index < char.backpack.length && !char.backpack[index]) {
              char.backpack[index] = item;
            }
          });
          return char;
        });
      }
    };
  }
</script>

<div class="game-container">
  <div class="game-main">
    <StatsPanel />
    <UpdatesArea />
    <CharacterInfo />
    <ProgressArea />
  </div>

  <Inventory />
  
  {#if $gameState.showShop}
    <Shop on:close={resumeJourney} />
  {/if}
  
  {#if $gameState.showAttack}
    <Attack on:close={resumeJourney} />
  {/if}
  
  {#if $gameState.showGood}
    <Good on:close={resumeJourney} />
  {/if}
  
  {#if $gameState.showChoice}
    <Choice on:close={resumeJourney} />
  {/if}
</div>

<style>
  .game-container {
    height: calc(100vh - 120px);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    position: relative;
  }

  .game-main {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex: 1;
  }
</style>
