<script>
  import { onMount } from 'svelte';
  import Game from './components/Game.svelte';
  import Header from './components/Header.svelte';
  import DebugPanel from './components/DebugPanel.svelte';
  import { gameStore } from './stores/gameStore.js';

  let showDebugPanel = false;

  onMount(() => {
    // Initialize debug panel in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      showDebugPanel = true;
    }
  });
</script>

<main>
  <Header />
  <Game />
  {#if showDebugPanel}
    <DebugPanel />
  {/if}
</main>

<style>
  :global(body) {
    padding: 0;
    margin: 0;
    border: 0;
    height: 100%;
    overflow: hidden;
    font-family: 'Girassol', cursive;
    background-color: #5F9FFF;
  }

  :global(*) {
    box-sizing: border-box;
  }

  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
