import type { Lang } from '../lib/i18n';

/**
 * Client-side copy for the walkthrough app (menu, project grid, detail).
 * The URL route provides the initial language; switching in the menu
 * swaps these strings in place without reloading.
 *
 * Project copy is NOT here: it lives in `src/lib/projects.ts` and reaches
 * the client through the payload built in `panel.ts`.
 */
export type WalkthroughStrings = {
  role: string;
  language: string;
  sound: string;
  soundOn: string;
  soundOff: string;
  start: string;
  projects: string;
  projectsIntro: string;
  choose: string;
  project: string;
  cardOpen: string;
  openCase: string;
  backToProjects: string;
  viewCode: string;
  liveDemo: string;
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
    projects: 'Proyectos',
    projectsIntro: 'Tres proyectos con evidencia ejecutable: abrí uno y mirá el caso completo.',
    choose: 'Elegí un proyecto',
    project: 'Proyecto',
    cardOpen: 'Ver detalle',
    openCase: 'Abrir caso completo',
    backToProjects: '◀ Volver a proyectos',
    viewCode: 'Ver código',
    liveDemo: 'Ver demo',
    classic: 'Ver proyectos sin 3D',
    backToMenu: '◀ Volver al menú',
  },
  en: {
    role: 'QA Engineer',
    language: 'Language',
    sound: 'Sound',
    soundOn: 'On',
    soundOff: 'Off',
    start: 'Start',
    projects: 'Projects',
    projectsIntro: 'Three projects with runnable evidence: open one and read the full case.',
    choose: 'Choose a project',
    project: 'Project',
    cardOpen: 'View details',
    openCase: 'Open full case study',
    backToProjects: '◀ Back to projects',
    viewCode: 'View code',
    liveDemo: 'View demo',
    classic: 'View projects without 3D',
    backToMenu: '◀ Back to menu',
  },
};
