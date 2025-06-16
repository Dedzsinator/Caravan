<script>
  import { createEventDispatcher } from 'svelte';
  
  export let item;
  export let slotType;
  export let slotIndex;
  
  const dispatch = createEventDispatcher();
  
  let showTooltip = false;
  let tooltipX = 0;
  let tooltipY = 0;

  function handleDragStart(event) {
    dispatch('dragstart', event);
  }

  function handleMouseEnter(event) {
    showTooltip = true;
    tooltipX = event.clientX + 10;
    tooltipY = event.clientY - 10;
  }

  function handleMouseLeave() {
    showTooltip = false;
  }

  function handleMouseMove(event) {
    if (showTooltip) {
      tooltipX = event.clientX + 10;
      tooltipY = event.clientY - 10;
    }
  }
</script>

<div 
  class="item-slot"
  draggable="true"
  on:dragstart={handleDragStart}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousemove={handleMouseMove}
  style="background-image: url('{item.image}')"
>
  <div class="item-name">{item.name}</div>
</div>

{#if showTooltip}
  <div 
    class="tooltip" 
    style="left: {tooltipX}px; top: {tooltipY}px;"
  >
    <h3>{item.name}</h3>
    <p>Level: {item.level}</p>
    <p>Type: {item.type}</p>
    {#if item.physDmg > 0}
      <p>Physical Damage: {item.physDmg}</p>
    {/if}
    {#if item.armor > 0}
      <p>Armor: {item.armor}</p>
    {/if}
  </div>
{/if}

<style>
  .item-slot {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: grab;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .item-slot:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }

  .item-slot:active {
    cursor: grabbing;
  }

  .item-name {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 3px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin-bottom: 2px;
  }

  .tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 10px;
    border-radius: 6px;
    font-size: 12px;
    z-index: 1001;
    pointer-events: none;
    max-width: 200px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }

  .tooltip h3 {
    margin: 0 0 5px 0;
    color: #FFD700;
    font-size: 14px;
  }

  .tooltip p {
    margin: 2px 0;
    color: #FFF;
  }
</style>
