<script>
  import { onMount } from 'svelte';
  
  let audioElement;
  let isPlaying = false;
  let volume = 50;

  onMount(() => {
    audioElement = new Audio('/audio/caravan/caravan.mp3');
    audioElement.loop = true;
    audioElement.volume = volume / 100;
    
    // Auto-play might be blocked by browser
    audioElement.play().catch(error => {
      console.log("Audio autoplay blocked:", error);
    });
    isPlaying = !audioElement.paused;
  });

  function togglePlayPause() {
    if (!audioElement) return;

    if (audioElement.paused) {
      audioElement.play().catch(error => {
        console.log("Audio play failed:", error);
      });
      isPlaying = true;
    } else {
      audioElement.pause();
      isPlaying = false;
    }
  }

  function updateVolume() {
    if (audioElement) {
      audioElement.volume = volume / 100;
    }
  }

  $: if (audioElement) {
    audioElement.volume = volume / 100;
  }
</script>

<div class="top">
  <img class="title" src="/img/caravan/title.png" alt="Caravan Game Title" />
  
  <a href="/index-vanilla.html" class="btn back">Vissza a Vanilla Verzióhoz</a>
  
  <button 
    type="button" 
    class="pause" 
    class:playing={isPlaying}
    on:click={togglePlayPause}
    aria-label="Play/Pause Audio"
  ></button>
  
  <img class="lower" src="/img/caravan/lower_volume.png" alt="Lower Volume" />
  
  <input 
    class="volume" 
    type="range" 
    min="0" 
    max="100" 
    bind:value={volume}
    on:input={updateVolume}
    aria-label="Volume Control"
  />
  
  <img class="higher" src="/img/caravan/increase_volume.png" alt="Increase Volume" />
</div>

<style>
  .top {
    height: 120px;
    position: relative;
    background-color: #4A90E2;
    border-bottom: 3px solid #8B4513;
  }

  .title {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #8B4513;
    border: 2px solid #654321;
    border-radius: 8px;
    color: #FFD700;
    padding: 12px 16px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .back:hover {
    background-color: #A0522D;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }

  .pause {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    border: 2px solid #8B4513;
    border-radius: 8px;
    outline: none;
    background-image: url('/img/caravan/mute_volume.png');
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pause.playing {
    background-image: url('/img/caravan/volume.png');
  }

  .pause:hover {
    transform: scale(1.05);
  }

  .lower, .higher {
    position: absolute;
    top: 70px;
    width: 30px;
    height: 30px;
  }

  .lower {
    right: 150px;
  }

  .higher {
    right: 10px;
  }

  .volume {
    position: absolute;
    right: 50px;
    top: 80px;
    width: 90px;
    height: 15px;
    -webkit-appearance: none;
    background: #8B4513;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .volume::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
  }

  .volume::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
    border: none;
  }
</style>
