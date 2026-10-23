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
  private fadeHandle: number | null = null;

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
    const audio = this.audio;
    this.cancelFade();
    audio.currentTime = 0;
    audio.muted = this.muted;
    // Fade in so the voice never starts abruptly.
    audio.volume = 0;
    void audio
      .play()
      .then(() => this.fadeIn(audio))
      .catch((err) => {
        console.warn('[walkthrough] voice playback blocked:', err);
      });
  }

  stop(): void {
    this.cancelFade();
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  private cancelFade(): void {
    if (this.fadeHandle !== null) {
      cancelAnimationFrame(this.fadeHandle);
      this.fadeHandle = null;
    }
  }

  /** Fast-attack volume ramp (350ms): smooth enough to avoid any pop,
   * quick enough that the first word of the voice is never swallowed. */
  private fadeIn(audio: HTMLAudioElement, durationMs = 350): void {
    this.cancelFade();
    const start = performance.now();
    const step = (now: number): void => {
      if (this.audio !== audio || audio.paused) {
        this.fadeHandle = null;
        return;
      }
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - t) * (1 - t);
      audio.volume = 0.15 + 0.85 * eased;
      this.fadeHandle = t < 1 ? requestAnimationFrame(step) : null;
    };
    this.fadeHandle = requestAnimationFrame(step);
  }

  /** Short, deep UI tick for menu interactions (respects mute).
   *
   * A piano-key press, not a metal panel: a warm low fundamental with a long
   * natural decay (the note), a quiet octave partial (key definition), and a
   * soft low-passed thump (the hammer) — nothing resonant, nothing ringing. */
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

      // · Body: the note — deep bass sine with a long, smooth decay
      const body = ctx.createOscillator();
      body.type = 'sine';
      body.frequency.setValueAtTime(frequency * 0.35, now);
      const bodyFilter = ctx.createBiquadFilter();
      bodyFilter.type = 'lowpass';
      bodyFilter.frequency.value = 1600;
      const bodyGain = ctx.createGain();
      bodyGain.gain.setValueAtTime(0.0001, now);
      bodyGain.gain.linearRampToValueAtTime(0.11, now + 0.007);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      body.connect(bodyFilter).connect(bodyGain).connect(out);
      body.start(now);
      body.stop(now + 0.75);

      // · Partial: octave above the body, quiet and short — which key
      const partial = ctx.createOscillator();
      partial.type = 'sine';
      partial.frequency.setValueAtTime(frequency * 0.7, now);
      const partialGain = ctx.createGain();
      partialGain.gain.setValueAtTime(0.0001, now);
      partialGain.gain.linearRampToValueAtTime(0.025, now + 0.005);
      partialGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      partial.connect(partialGain).connect(out);
      partial.start(now);
      partial.stop(now + 0.4);

      // · Hammer: soft low thump of the key mechanism
      const hammer = ctx.createBufferSource();
      hammer.buffer = this.noiseBuffer(ctx);
      const hammerFilter = ctx.createBiquadFilter();
      hammerFilter.type = 'lowpass';
      hammerFilter.frequency.value = 500;
      const hammerGain = ctx.createGain();
      hammerGain.gain.setValueAtTime(0.04, now);
      hammerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      hammer.connect(hammerFilter).connect(hammerGain).connect(out);
      hammer.start(now);
      hammer.stop(now + 0.05);
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
