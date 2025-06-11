export class AudioManager {
  constructor() {
    this.audio = null;
    this.isInitialized = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('load', () => this.initAudioPlayer());
  }

  initAudioPlayer() {
    if (this.isInitialized) return;

    this.audio = new Audio();
    this.audio.src = "./audio/caravan/caravan.mp3";
    this.audio.loop = true;
    this.audio.volume = 0.5;

    const playbtn = document.getElementById("playpausebtn");
    const volumeSlider = document.getElementById("volume");

    if (playbtn) {
      playbtn.addEventListener("click", () => this.togglePlayPause());
    }

    if (volumeSlider) {
      volumeSlider.value = 50;
      volumeSlider.addEventListener('input', (e) => {
        if (this.audio) {
          this.audio.volume = e.target.value / 100;
        }
      });
    }

    // Auto-play might be blocked by browser, handle gracefully
    this.audio.play().catch(error => {
      console.log("Audio autoplay blocked:", error);
    });

    this.isInitialized = true;
  }

  togglePlayPause() {
    if (!this.audio) return;

    const playbtn = document.getElementById("playpausebtn");
    
    if (this.audio.paused) {
      this.audio.play().catch(error => {
        console.log("Audio play failed:", error);
      });
      if (playbtn) {
        playbtn.style.background = "url('./img/caravan/volume.png') no-repeat";
        playbtn.style.backgroundSize = "cover";
      }
    } else {
      this.audio.pause();
      if (playbtn) {
        playbtn.style.background = "url('./img/caravan/mute_volume.png') no-repeat";
        playbtn.style.backgroundSize = "cover";
      }
    }
  }

  setVolume(volume) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  mute() {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
    }
  }
}
