<script>
  import { messages, caravanStats } from '../stores/gameStore.js';

  function formatMessage(message) {
    return `${Math.ceil($caravanStats.day)}. Nap: ${message.text}`;
  }
</script>

<div class="updates-area">
  {#each $messages as message (message.id)}
    <div class="update update-{message.type}">
      {formatMessage(message)}
    </div>
  {/each}
  
  {#if $messages.length === 0}
    <div class="update update-neutral">
      Üdvözöl a Caravan játék! Az eseményeid itt jelennek meg.
    </div>
  {/if}
</div>

<style>
  .updates-area {
    border: 3px solid #8B4513;
    background-color: #FFD700;
    border-radius: 10px;
    padding: 15px;
    width: 380px;
    height: 400px;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }

  .update {
    margin-bottom: 5px;
    font-weight: bold;
    padding: 2px 0;
    border-bottom: 1px solid rgba(139, 69, 19, 0.1);
  }

  .update-positive {
    color: #228B22;
  }

  .update-negative {
    color: #DC143C;
  }

  .update-neutral {
    color: #696969;
  }

  .update-gold {
    color: #DAA520;
  }

  /* Custom scrollbar */
  .updates-area::-webkit-scrollbar {
    width: 8px;
  }

  .updates-area::-webkit-scrollbar-track {
    background: #D2B48C;
    border-radius: 4px;
  }

  .updates-area::-webkit-scrollbar-thumb {
    background: #8B4513;
    border-radius: 4px;
  }

  .updates-area::-webkit-scrollbar-thumb:hover {
    background: #654321;
  }
</style>
