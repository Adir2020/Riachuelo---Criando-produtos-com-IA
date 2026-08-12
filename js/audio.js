/**
 * QA Quest - Gerador de Efeitos Sonoros com Web Audio API
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.1, gainValue = 0.1) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context Playback error", e);
    }
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0.08);
  }

  playCorrect() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    // Arpeggio alegre (C5, E5, G5)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.15, 0.12);
      }, idx * 80);
    });
  }

  playWrong() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    // Tom grave descendente
    this.playTone(180, 'sawtooth', 0.25, 0.12);
  }

  playLevelUp() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    // Fanfarra de Level Up (C4, E4, G4, C5)
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'square', 0.2, 0.1);
      }, idx * 100);
    });
  }

  playBadge() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.18, 0.12);
      }, idx * 90);
    });
  }
}

const sounds = new SoundEngine();
