import type { Lang } from '../lib/i18n';

/**
 * Plays the intro voice track (kept OUTSIDE the video file so language and
 * mute can change without reloading anything) plus tiny UI sound effects
 * synthesized with WebAudio (no asset files needed).
 */
export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private lang: Lang;
  private muted: boolean;
  private blipContext: AudioContext | null = null;
  private noiseCache: AudioBuffer | null = null;

  onEnded: (() => void) | null = null;

  constructor(lang: Lang, muted: boolean) {
    this.lang = lang;
    this.muted = muted;
  }

  private voiceSrc(lang: Lang): string {
    return `${import.meta.env.BASE_URL}audio/intro-speech-${lang}.mp3`;
  }

  /**
   * Preloads the voice for the current language.
   * Resolves when the element can play through, or after `timeoutMs` —
   * always resolves so the START button can never stay blocked forever.
   */
  preload(timeoutMs = 10_000): Promise<boolean> {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = this.voiceSrc(this.lang);
    audio.muted = this.muted;
    audio.addEventListener('ended', () => this.onEnded?.());
    this.audio = audio;

    return new Promise((resolve) => {
      let settled = false;
      const done = (ready: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (!ready) {
          console.warn('[walkthrough] voice preload timed out; starting anyway');
        }
        resolve(ready);
      };
      const timer = setTimeout(() => done(false), timeoutMs);
      audio.addEventListener('canplaythrough', () => done(true), { once: true });
      audio.addEventListener('error', () => done(false), { once: true });
      audio.load();
    });
  }

  /** Swap the voice track (menu language change). Stops any playback. */
  setLang(lang: Lang): void {
    if (lang === this.lang) return;
    this.lang = lang;
    this.audio?.pause();
    void this.preload();
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.audio) this.audio.muted = muted;
  }

  play(): void {
    if (!this.audio) return;
    this.audio.currentTime = 0;
    this.audio.muted = this.muted;
    void this.audio.play().catch((err) => {
      console.warn('[walkthrough] voice playback blocked:', err);
    });
  }

  stop(): void {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  /** Short, deep UI tick for menu interactions (respects mute).
   *
   * A sci-fi device panel sound: a long deep sub tail (an octave and a half
   * down), a downward-body upward chirp for the confirm gesture, a fifth
   * overtone, and a longer servo sweep — a console acknowledging you. */
  blip(frequency = 660): void {
    if (this.muted) return;
    try {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      this.blipContext ??= new Ctx();
      const ctx = this.blipContext;
      if (ctx.state === 'suspended') void ctx.resume();

      const now = ctx.currentTime;
      const out = ctx.createGain();
      out.gain.value = 1;
      out.connect(ctx.destination);

      // · Sub: deep device body with a long resonant tail
      const sub = ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(frequency * 0.4 * 1.12, now);
      sub.frequency.exponentialRampToValueAtTime(frequency * 0.4, now + 0.15);
      const subFilter = ctx.createBiquadFilter();
      subFilter.type = 'lowpass';
      subFilter.frequency.value = 900;
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.linearRampToValueAtTime(0.075, now + 0.012);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      sub.connect(subFilter).connect(subGain).connect(out);
      sub.start(now);
      sub.stop(now + 0.65);

      // · Chirp: sine sweeping up — the panel confirm gesture
      const tone = ctx.createOscillator();
      tone.type = 'sine';
      tone.frequency.setValueAtTime(frequency * 0.6, now);
      tone.frequency.exponentialRampToValueAtTime(frequency * 0.85, now + 0.06);
      const toneFilter = ctx.createBiquadFilter();
      toneFilter.type = 'lowpass';
      toneFilter.frequency.value = 4400;
      const toneGain = ctx.createGain();
      toneGain.gain.setValueAtTime(0.0001, now);
      toneGain.gain.linearRampToValueAtTime(0.055, now + 0.006);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      tone.connect(toneFilter).connect(toneGain).connect(out);
      tone.start(now);
      tone.stop(now + 0.33);

      // · Overtone: a fifth above the chirp — console shimmer
      const shine = ctx.createOscillator();
      shine.type = 'triangle';
      shine.frequency.setValueAtTime(frequency * 1.5, now);
      const shineGain = ctx.createGain();
      shineGain.gain.setValueAtTime(0.0001, now);
      shineGain.gain.linearRampToValueAtTime(0.02, now + 0.005);
      shineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      shine.connect(shineGain).connect(out);
      shine.start(now);
      shine.stop(now + 0.27);

      // · Servo: longer band-pass sweep — the panel processing
      const air = ctx.createBufferSource();
      air.buffer = this.noiseBuffer(ctx);
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.value = 2;
      bandpass.frequency.setValueAtTime(3400, now);
      bandpass.frequency.exponentialRampToValueAtTime(650, now + 0.14);
      const airGain = ctx.createGain();
      airGain.gain.setValueAtTime(0.025, now);
      airGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      air.connect(bandpass).connect(airGain).connect(out);
      air.start(now);
      air.stop(now + 0.18);
    } catch {
      /* audio effects are decorative — never break the UI */
    }
  }

  /** Small cached white-noise buffer for the air layer of the UI ticks. */
  private noiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.noiseCache) {
      const buffer = ctx.createBuffer(1, Math.round(ctx.sampleRate * 0.2), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseCache = buffer;
    }
    return this.noiseCache;
  }

  dispose(): void {
    this.stop();
    this.audio = null;
    void this.blipContext?.close().catch(() => {});
    this.blipContext = null;
    this.noiseCache = null;
  }
}
