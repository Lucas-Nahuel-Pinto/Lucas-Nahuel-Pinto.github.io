/**
 * Fase 2 — animatic timeline.
 *
 * The 7-shot storyboard of the design spec (§4, Scene 2) plus the subtitle
 * cues of the real voice takes. Two measured facts reshaped the raw spec
 * table:
 *
 *   - The voice takes are SHORTER than the spec assumed: ES 22.32 s,
 *     EN 20.40 s (the spec planned ~43 s).
 *   - Both takes run to the last word and then hold ~3 s of silence, so
 *     the speech-anchored shots (1–3) are derived from the measured cue
 *     times and shots 4–7 share whatever tail remains (spec ratio 4:3:6:3).
 *
 * These windows are ADJUSTABLE: once the user approves them during the
 * animatic review, this table becomes the animation script that the
 * Blender phase (Fase 3) follows shot for shot.
 */
import type { Lang } from '../lib/i18n';

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

/** Shot content (spec §4); windows come from buildTimeline(). */
export const SHOTS: Omit<Shot, 'start' | 'end'>[] = [
  {
    n: 1,
    es: 'Negros → oficina con luz de ventana; al fondo se ven los demás personajes parados a lo lejos (establecimiento).',
    en: 'Black → office with window light; the other characters standing far in the background (establishing).',
    note: 'Plano fijo; salida del negro. La oficina NO está vacía: los demás personajes se ven parados a lo lejos — el destino se ve desde el inicio, en línea con el vuelo casi recto de los planos 2-3. La voz arranca en t=0 — decidir en review si se pega 1,5 s de Negro bajo la frase 1 (J-cut) o se recorta el negro.',
  },
  {
    n: 2,
    es: 'Primer plano del fantasma hablando: audio ES/EN + subtítulos + doodles 2D al lado.',
    en: 'Ghost close-up speaking: ES/EN voice + subtitles + 2D doodles alongside.',
    note: 'Doodles (pop por frase): 🪪 credencial "soy Lucas" · 🌐 mini-navegador "portfolio" · 🔎 lupa "herramientas" · ➡️ flecha "vení/Acompañame". Manos flotantes gesticulan; vibración corporal por cadencia.',
  },
  {
    n: 3,
    es: '"Vení, acompañame" → vuelo al avatar central con estela luminosa.',
    en: '"Come with me" → flight to the central avatar with a luminous trail.',
    note: 'Anclado a la última frase del audio ("Vení. Acompányame que te muestro." / "Let\'s go!"). El fantasma vuela en trayectoria CASI RECTA hacia el avatar para poseerlo (sin serpentear); cámara siguiendo el vuelo; estela luminosa.',
  },
  {
    n: 4,
    es: 'Posesión: destello → sobresalto → recuperación → pulgar; cámara acerca a la cara (con gafas).',
    en: 'Possession: flash → jolt → recovery → thumbs-up; camera pushes in on the face (with glasses).',
    note: '≈5 s para verlo bien: destello (1 frame) → el cuerpo se sobresalta → se recupera → pulgar; dolly hacia la cara. Cycles opcional en este plano.',
  },
  {
    n: 5,
    es: 'Cartel HUD sutil "LUCAS PINTO — QA ENGINEER"; 🐿️ izquierda, avatar+gafas centro, 🦊 derecha.',
    en: 'Subtle HUD sign "LUCAS PINTO — QA ENGINEER"; 🐿️ left, avatar+glasses center, 🦊 right.',
    note: '≈3,5 s para leer el cartel. Los tres con gafas de sol (= dispositivo AR); cartel en overlay, identidad HUD.',
  },
  {
    n: 6,
    es: 'Giro orbital de 180° rodeando al personaje sin soltarlo del encuadre, termina detrás.',
    en: '180° orbital around the character keeping the frame, ends behind.',
    note: '≈7 s — órbita continua y pareja (nada brusco). Cámara = objeto animado; encuadre constante a la altura de hombros.',
  },
  {
    n: 7,
    es: 'HOLD sobre la nuca → zoom rápido a la nuca → match-cut → POV primera persona con panel AR encendiéndose.',
    en: 'Hold on the nape → quick push-in → match-cut → first-person POV with AR panel booting.',
    note: '≈6 s: la cámara queda apuntando a la nuca → HOLD quieto (~2 s) → zoom a la nuca como último trayecto, RÁPIDO y contundente (≤2 s) → match-cut engancha con la Escena 3 (Fase 4).',
  },
];

export type Cue = {
  /** Inclusive start, seconds (measured from the take). */
  start: number;
  /** Exclusive end, seconds (measured from the take). */
  end: number;
  /** Subtitle line — verbatim from the user's ElevenLabs script. */
  text: string;
};

/**
 * Subtitle cues per language. Times measured from the real takes via
 * silence-gap analysis (speech segments ≥0.4 s apart = sentence breaks).
 *
 * ES take: 22.32 s total, speech ends at 19.10 s.
 * EN take: 20.40 s total, speech ends at 17.40 s.
 */
export const CUES: Record<Lang, Cue[]> = {
  es: [
    { start: 0, end: 2.65, text: 'Hola, soy Lucas, QA Engineer.' },
    { start: 3.1, end: 4.3, text: 'Este es mi portfolio.' },
    {
      start: 4.9,
      end: 11.35,
      text: 'Acá muestro las herramientas que desarrollé para visualizar los datos y procesos abstractos de un QA next-level.',
    },
    {
      start: 11.85,
      end: 16.7,
      text: 'Lo cual me sirve para tomar mejores decisiones y hacer un trabajo más completo y eficiente.',
    },
    { start: 17.3, end: 19.1, text: 'Vení. Acompányame que te muestro.' },
  ],
  en: [
    { start: 0, end: 2.8, text: 'Hi, I’m Lucas, a Quality Assurance Engineer.' },
    { start: 3.35, end: 4.55, text: 'This is my portfolio.' },
    {
      start: 5.15,
      end: 11.15,
      text: 'Here, I showcase the tools I’ve developed to visualize data and abstract processes for next-level Engineering.',
    },
    {
      start: 11.7,
      end: 15.3,
      text: '—enabling me to make better decisions and carry out more comprehensive and efficient work.',
    },
    { start: 15.65, end: 17.4, text: 'Let’s go!' },
  ],
};

/** The line that triggers the flight shot (shot 3), per language. */
const FLIGHT_PATTERN: Record<Lang, RegExp> = {
  es: /^ven[íi]/i,
  en: /^let[’']s go/i,
};

/** Establishing shot length before the ghost takes the frame (spec: 3 s of 43). */
const ESTABLISHING = 1.5;

/**
 * Duration of the silent action tail (shots 4–7), in seconds. The voice
 * takes end before these shots, so the cutscene keeps rolling on a virtual
 * clock — values from the user's animatic review (2.4): possession shown
 * properly, HUD legible, smooth 180° orbit, and a hold on the nape before
 * the match-cut.
 */
const TAIL_DURATIONS = [5, 3.5, 7, 6];

export type TimelineWindow = { n: number; start: number; end: number };

/**
 * Builds the 7 shot windows for a language. The timeline is the MASTER
 * clock of the cutscene; the voice track plays inside it and the tail runs
 * past the end of the audio file.
 *
 * - Shot 1: opening establishing beat (ESTABLISHING seconds).
 * - Shot 2: from there to the flight line.
 * - Shot 3: the flight line itself (measured cue window).
 * - Shots 4–7: TAIL_DURATIONS after the last word.
 */
export function buildTimeline(lang: Lang): TimelineWindow[] {
  const cues = CUES[lang];
  const lastCue = cues[cues.length - 1];
  const flightIdx = Math.max(0, cues.findIndex((c) => FLIGHT_PATTERN[lang].test(c.text.trim())));
  const flightCue = cues[flightIdx];

  const shot1End = Math.min(ESTABLISHING, flightCue.start);
  const windows: [number, number][] = [
    [0, shot1End],
    [shot1End, flightCue.start],
    [flightCue.start, lastCue.end],
  ];

  let cursor = lastCue.end;
  for (const span of TAIL_DURATIONS) {
    windows.push([cursor, cursor + span]);
    cursor += span;
  }

  return windows.map(([start, end], index) => ({ n: index + 1, start, end }));
}
