import type { Lang } from '../lib/i18n';

/**
 * Client-side copy for the walkthrough app (menu + placeholders).
 * The URL route provides the initial language; switching in the menu
 * swaps these strings in place without reloading.
 */
export type WalkthroughStrings = {
  role: string;
  language: string;
  sound: string;
  soundOn: string;
  soundOff: string;
  start: string;
  loading: string;
  skip: string;
  cutsceneSoon: string;
  fpSoon: string;
  panelSoon: string;
  classic: string;
  backToMenu: string;
};

export const STRINGS: Record<Lang, WalkthroughStrings> = {
  es: {
    role: 'QA Engineer',
    language: 'Idioma',
    sound: 'Sonido',
    soundOn: 'Encendido',
    soundOff: 'Apagado',
    start: 'Comenzar',
    loading: 'Cargando introducción…',
    skip: 'Saltar ▸',
    cutsceneSoon: 'Cinemática — próximamente',
    fpSoon: 'Primera persona — próximamente',
    panelSoon: 'Panel AR — próximamente',
    classic: 'Ver proyectos sin 3D ↓',
    backToMenu: '◀ Volver al menú',
  },
  en: {
    role: 'QA Engineer',
    language: 'Language',
    sound: 'Sound',
    soundOn: 'On',
    soundOff: 'Off',
    start: 'Start',
    loading: 'Loading intro…',
    skip: 'Skip ▸',
    cutsceneSoon: 'Cutscene — coming soon',
    fpSoon: 'First person — coming soon',
    panelSoon: 'AR panel — coming soon',
    classic: 'View projects without 3D ↓',
    backToMenu: '◀ Back to menu',
  },
};
