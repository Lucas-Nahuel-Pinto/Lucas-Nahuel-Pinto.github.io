/**
 * UI sound effects for the walkthrough, synthesized with WebAudio so no
 * asset files are needed. There is no voice track: the intro cinematic was
 * dropped, so the overlay never waits on the network to make a sound.
 */
export class AudioManager {
  private muted: boolean;
  private context: AudioContext | null = null;
  private noiseCache: AudioBuffer | null = null;

  constructor(muted: boolean) {
    this.muted = muted;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
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
      this.context ??= new Ctx();
      const ctx = this.context;
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
    void this.context?.close().catch(() => {});
    this.context = null;
    this.noiseCache = null;
  }
}
