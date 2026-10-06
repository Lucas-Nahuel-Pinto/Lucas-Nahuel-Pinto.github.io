export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

export const DEFAULT_LANG: Lang = 'es';

type Strings = {
  siteTitle: string;
  siteDescription: string;
  navHome: string;
  navWork: string;
  navAbout: string;
  themeToggle: string;
  langSwitch: string;
  footerNote: string;
  viewCode: string;
  liveDemo: string;
  problem: string;
  solution: string;
  results: string;
};

export const UI: Record<Lang, Strings> = {
  es: {
    siteTitle: 'Lucas Pinto — QA Engineer',
    siteDescription:
      'Portfolio de QA: checklists de flujo, trazabilidad Jira y configuración de agentes. Casos de estudio con demos y código abierto.',
    navHome: 'Inicio',
    navWork: 'Proyectos',
    navAbout: 'Sobre mí',
    themeToggle: 'Cambiar tema',
    langSwitch: 'English',
    footerNote: 'Hecho con Astro · código abierto en GitHub',
    viewCode: 'Ver código',
    liveDemo: 'Demo en vivo',
    problem: 'Problema',
    solution: 'Solución',
    results: 'Resultados',
  },
  en: {
    siteTitle: 'Lucas Pinto — QA Engineer',
    siteDescription:
      'QA portfolio: workflow checklists, Jira traceability and agent harness configuration. Case studies with demos and open source code.',
    navHome: 'Home',
    navWork: 'Projects',
    navAbout: 'About',
    themeToggle: 'Toggle theme',
    langSwitch: 'Español',
    footerNote: 'Built with Astro · source code on GitHub',
    viewCode: 'View code',
    liveDemo: 'Live demo',
    problem: 'Problem',
    solution: 'Solution',
    results: 'Results',
  },
};

/** Swap the locale segment of a path, preserving the rest (//es/about -> //en/about). */
export function localizePath(path: string, target: Lang): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && isLang(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return `/${segments.join('/')}`;
}

export function pathFor(lang: Lang, path = ''): string {
  const clean = path.replace(/^\//, '');
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}
