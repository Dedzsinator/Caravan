<script>
  import { createEventDispatcher } from 'svelte';
  import { caravanStats, character, gameState, addMessage, addItemToBackpack } from '../stores/gameStore.js';
  import { ITEMS } from '../lib/items.js';

  const dispatch = createEventDispatcher();

  let currentEvent = null;

  gameState.subscribe(state => {
    if (state.showChoice && state.currentEvent) {
      currentEvent = state.currentEvent;
    }
  });

  function makeChoice(choice) {
    const effect = choice.effect;
    
    switch (effect.type) {
      case 'STAT-CHANGE':
        caravanStats.update(stats => {
          if (effect.value + stats[effect.stat] >= 0) {
            stats[effect.stat] += effect.value;
            addMessage(`${choice.text}: ${effect.stat} ${effect.value > 0 ? '+' : ''}${effect.value}`, 
                      effect.value > 0 ? 'positive' : 'negative');
          }
          return stats;
        });
        break;
        
      case 'ITEM-REWARD':
        const item = ITEMS[effect.item];
        if (item) {
          character.update(char => {
            const emptySlot = char.backpack.findIndex(slot => slot === null);
            if (emptySlot !== -1) {
              char.backpack[emptySlot] = item;
              addMessage(`${choice.text}: Found ${item.name}!`, 'positive');
            } else {
              addMessage('Your backpack is full! Item lost.', 'negative');
            }
            return char;
          });
        }
        break;
    }

    closeChoice();
  }

  function closeChoice() {
    dispatch('close');
  }
</script>

{#if currentEvent}
  <div class="choice-overlay">
    <div class="choice">
      <h2>Választás</h2>
      
      <div class="choice-description">
        <p>{currentEvent.text}</p>
      </div>
      
      <div class="choice-buttons">
        {#each currentEvent.choices as choice}
          <button 
            type="button" 
            class="btn choice-btn" 
            on:click={() => makeChoice(choice)}
          >
            {choice.text}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .choice-overlay {
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

  .choice {
    width: 450px;
    background-color: #FFD700;
    border: 5px solid #8B4513;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .choice h2 {
    color: #8B4513;
    margin: 0 0 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .choice-description {
    background-color: #D2B48C;
    border: 2px solid #8B4513;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .choice-description p {
    margin: 8px 0;
    color: #8B4513;
    font-size: 16px;
    line-height: 1.4;
  }

  .choice-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    background-color: #8B4513;
    border: 2px solid #654321;
    border-radius: 8px;
    color: #FFD700;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .btn:hover {
    background-color: #A0522D;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }

  .choice-btn:nth-child(odd) {
    background-color: #32CD32;
  }

  .choice-btn:nth-child(odd):hover {
    background-color: #228B22;
  }
</style>
