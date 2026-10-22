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

  /** Short UI blip for menu interactions (respects mute). */
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

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.1);
    } catch {
      /* audio effects are decorative — never break the UI */
    }
  }

  dispose(): void {
    this.stop();
    this.audio = null;
    void this.blipContext?.close().catch(() => {});
    this.blipContext = null;
  }
}
