// Web Audio API Synthesizer for game sound effects & background music

let audioCtx: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let bgmIntervalId: number | null = null;
let bgmIsPlaying = false;
let currentMusicVolume = 0.4;
let currentSoundVolume = 0.8;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Background Music Synthesizer (Nursery / Cartoon Marimba Style)
export const bgmPlayer = {
  start: (enabled = true, volume = 0.4) => {
    currentMusicVolume = volume;
    if (!enabled || volume <= 0) {
      bgmPlayer.stop();
      return;
    }
    if (bgmIsPlaying) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (!bgmGainNode) {
        bgmGainNode = ctx.createGain();
        bgmGainNode.connect(ctx.destination);
      }
      bgmGainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);

      // Cheerful pentatonic melody pattern: notes in Hz
      // C4 (261.63), D4 (293.66), E4 (329.63), G4 (392.00), A4 (440.00), C5 (523.25)
      const melody = [
        { note: 261.63, dur: 0.25 },
        { note: 329.63, dur: 0.25 },
        { note: 392.00, dur: 0.35 },
        { note: 523.25, dur: 0.4 },
        { note: 440.00, dur: 0.25 },
        { note: 392.00, dur: 0.25 },
        { note: 329.63, dur: 0.4 },
        { note: 293.66, dur: 0.3 },

        { note: 329.63, dur: 0.25 },
        { note: 392.00, dur: 0.25 },
        { note: 440.00, dur: 0.35 },
        { note: 523.25, dur: 0.4 },
        { note: 392.00, dur: 0.3 },
        { note: 329.63, dur: 0.25 },
        { note: 261.63, dur: 0.6 }
      ];

      let noteIdx = 0;
      const stepTimeMs = 380;

      const playNextMelodyNote = () => {
        if (!bgmIsPlaying || !ctx || !bgmGainNode) return;
        const item = melody[noteIdx % melody.length];
        noteIdx++;

        try {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(item.note, ctx.currentTime);

          // Gentle bell envelope
          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + item.dur);

          osc.connect(noteGain);
          noteGain.connect(bgmGainNode);

          osc.start();
          osc.stop(ctx.currentTime + item.dur);
        } catch {}
      };

      bgmIsPlaying = true;
      playNextMelodyNote();
      bgmIntervalId = window.setInterval(playNextMelodyNote, stepTimeMs);
    } catch {
      bgmIsPlaying = false;
    }
  },

  stop: () => {
    bgmIsPlaying = false;
    if (bgmIntervalId !== null) {
      clearInterval(bgmIntervalId);
      bgmIntervalId = null;
    }
  },

  setVolume: (volume: number, enabled: boolean) => {
    currentMusicVolume = volume;
    if (!enabled || volume <= 0) {
      bgmPlayer.stop();
      return;
    }
    if (bgmGainNode && audioCtx) {
      bgmGainNode.gain.setValueAtTime(volume * 0.15, audioCtx.currentTime);
    }
    if (!bgmIsPlaying && enabled && volume > 0) {
      bgmPlayer.start(enabled, volume);
    }
  },

  isPlaying: () => bgmIsPlaying
};

// Sound Effects Synthesizer with volume controls
export const playSound = {
  setSoundVolume: (vol: number) => {
    currentSoundVolume = Math.max(0, Math.min(1, vol));
  },

  tap: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  },

  cardPlace: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5

      gain.gain.setValueAtTime(0.25 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  },

  cardRemove: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(392.0, ctx.currentTime + 0.09); // G4

      gain.gain.setValueAtTime(0.2 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  },

  hint: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1046, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  },

  correct: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.25 * volume, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + idx * 0.08 + 0.25
        );

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch {}
  },

  wrong: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(196, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.18 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  },

  victory: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0, duration: 0.18 },
        { freqs: [587.33, 739.99, 880.0], time: 0.2, duration: 0.18 },
        { freqs: [659.25, 830.61, 987.77], time: 0.4, duration: 0.18 },
        { freqs: [783.99, 987.77, 1174.66, 1567.98], time: 0.62, duration: 0.8 }
      ];

      chords.forEach(({ freqs, time, duration }) => {
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

          gain.gain.setValueAtTime(0.2 * volume, ctx.currentTime + time);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + time);
          osc.stop(ctx.currentTime + time + duration);
        });
      });
    } catch {}
  },

  star: (enabled = true, volume = currentSoundVolume) => {
    if (!enabled || volume <= 0) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1567.98, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.22 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {}
  }
};
