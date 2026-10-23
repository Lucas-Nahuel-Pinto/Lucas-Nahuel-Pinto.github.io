/**
 * Fase 2 — animatic timeline.
 *
 * The 7-shot storyboard of the design spec (§4, Scene 2: ~43 s, no hard
 * cuts). These timings are ADJUSTABLE: once the user approves them during
 * the animatic review, this table becomes the animation script that the
 * Blender phase (Fase 3) follows shot for shot.
 */

export type Shot = {
  /** Shot number, 1-based. */
  n: number;
  /** Inclusive start, seconds. */
  start: number;
  /** Exclusive end, seconds. */
  end: number;
  /** Review copy, ES. */
  es: string;
  /** Review copy, EN. */
  en: string;
  /** Camera / animation note for the review (ES, tool-side only). */
  note: string;
};

export const SHOTS: Shot[] = [
  {
    n: 1,
    start: 0,
    end: 3,
    es: 'Negros → oficina vacía, luz de ventana (establecimiento).',
    en: 'Black → empty office, window light (establishing).',
    note: 'Plano fijo; salida del negro durante el primer segundo.',
  },
  {
    n: 2,
    start: 3,
    end: 23,
    es: 'Primer plano del fantasma hablando: audio ES/EN + subtítulos + doodles 2D al lado.',
    en: 'Ghost close-up speaking: ES/EN voice + subtitles + 2D doodles alongside.',
    note: 'Doodles (pop por frase): 🪪 credencial "soy Lucas" · 🌐 mini-navegador "portfolio" · 🔎 lupa "herramientas" · ➡️ flecha "vení". Manos flotantes gesticulan; vibración corporal por cadencia.',
  },
  {
    n: 3,
    start: 23,
    end: 27,
    es: '"Vení, acompañame" → vuelo al avatar central con estela luminosa.',
    en: '"Come with me" → flight to the central avatar with a luminous trail.',
    note: 'Cámara siguiendo el vuelo; estela luminosa; manos hacen el gesto "vení".',
  },
  {
    n: 4,
    start: 27,
    end: 31,
    es: 'Posesión: destello → sobresalto → recuperación → pulgar; cámara acerca a la cara (con gafas).',
    en: 'Possession: flash → jolt → recovery → thumbs-up; camera pushes in on the face (with glasses).',
    note: 'Destello de 1 frame; Cycles es opcional en este plano; cámara en dolly hacia la cara.',
  },
  {
    n: 5,
    start: 31,
    end: 34,
    es: 'Cartel HUD sutil "LUCAS PINTO — QA ENGINEER"; 🐿️ izquierda, avatar+gafas centro, 🦊 derecha.',
    en: 'Subtle HUD sign "LUCAS PINTO — QA ENGINEER"; 🐿️ left, avatar+glasses center, 🦊 right.',
    note: 'Los tres con gafas de sol (= dispositivo AR); cartel en overlay, identidad HUD.',
  },
  {
    n: 6,
    start: 34,
    end: 40,
    es: 'Giro orbital de 180° rodeando al personaje sin soltarlo del encuadre, termina detrás.',
    en: '180° orbital around the character keeping the frame, ends behind.',
    note: 'Cámara = objeto animado; encuadre constante a la altura de hombros.',
  },
  {
    n: 7,
    start: 40,
    end: 43,
    es: 'Zoom a la nuca → match-cut → POV primera persona con panel AR encendiéndose.',
    en: 'Push-in to the nape → match-cut → first-person POV with AR panel booting.',
    note: 'Fin exacto del video: el match-cut es el enganche con la Escena 3 (Fase 4).',
  },
];

export type Cue = {
  /** Inclusive start, seconds. */
  start: number;
  /** Exclusive end, seconds. */
  end: number;
  /** Subtitle line, ES. */
  es: string;
  /** Subtitle line, EN. */
  en: string;
};

/**
 * Subtitle cues synced to the voice track.
 *
 * TODO(user): replace with the exact ElevenLabs script cues once the full
 * dialogue is pasted — the only verbatim line available right now is the
 * one quoted in the design spec (§4, shot 3).
 */
export const CUES: Cue[] = [
  { start: 23, end: 27, es: 'Vení, acompañame.', en: 'Come with me.' },
];
