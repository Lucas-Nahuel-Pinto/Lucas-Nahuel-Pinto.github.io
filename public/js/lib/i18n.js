/**
 * ES/EN language switch.
 *
 * Any element carrying [data-i18n] swaps its text and any element with
 * [data-i18n-aria] swaps its aria-label, using the dictionaries below.
 * JS-owned strings (labels set from code) read the same dictionary through
 * t(key). The choice is persisted in localStorage and broadcast through a
 * `langchange` CustomEvent so pages can react to it.
 */

const STORAGE_KEY = 'portfolio-lang';
const DEFAULT_LANG = 'es';

const DICTIONARIES = {
  es: {
    language: 'Idioma',
    about: 'Sobre mí',
    loading: 'Cargando',
    backIntro: 'Volver a la intro',
    closePanel: 'Cerrar panel',
    sendMail: 'Enviar mail',
    goLinkedIn: 'Ir a LinkedIn',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    prevSection: 'Sección anterior',
    nextSection: 'Sección siguiente',
    sectionsMenu: 'Menú de secciones',
    projects: 'Proyectos',
    contact: 'Contactar',
    experience: 'Experiencia',
    achievements: 'Logros',
    tools: 'Herramientas',
    myProjects: 'Mis Proyectos',
    taglineJira: 'De 2-3 horas de auditoría manual a 30 segundos.',
    taglineHarness: 'Cualquier arnés, desde el navegador.',
    prevProject: 'Proyecto anterior',
    nextProject: 'Proyecto siguiente',
    ideaHeading: 'Cómo surgió la idea',
    problemsHeading: 'Qué problemas resuelve',
    goTo: 'Ir a',
    scrollToDetails: 'Bajar a los detalles',
    selectProject: 'Seleccionar proyecto',
    goToAchievements: 'Ir a Logros',
    goToJira: 'Ir a Jira Traceability Manager',
    goToQa: 'Ir a QA Checklist',
    goToHarness: 'Ir a Harness Manager',
    portfolioSections: 'Secciones del portfolio'
  },
  en: {
    language: 'Language',
    about: 'About Me',
    loading: 'Loading',
    backIntro: 'Back to the intro',
    closePanel: 'Close panel',
    sendMail: 'Send email',
    goLinkedIn: 'Open LinkedIn',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    prevSection: 'Previous section',
    nextSection: 'Next section',
    sectionsMenu: 'Sections menu',
    projects: 'Projects',
    contact: 'Contact',
    experience: 'Experience',
    achievements: 'Achievements',
    tools: 'Tools',
    myProjects: 'My Projects',
    taglineJira: 'From 2-3 hours of manual audit to 30 seconds.',
    taglineHarness: 'Any harness, from the browser.',
    prevProject: 'Previous project',
    nextProject: 'Next project',
    ideaHeading: 'How the idea started',
    problemsHeading: 'What problems it solves',
    goTo: 'Go to',
    scrollToDetails: 'Scroll to the details',
    selectProject: 'Select project',
    goToAchievements: 'Go to Achievements',
    goToJira: 'Go to Jira Traceability Manager',
    goToQa: 'Go to QA Checklist',
    goToHarness: 'Go to Harness Manager',
    portfolioSections: 'Portfolio sections'
  }
};

let current = DEFAULT_LANG;

function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  } catch (error) {
    return DEFAULT_LANG;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    /* private mode / storage disabled: the switch still works for the session */
  }
}

function translateNodes(lang) {
  const strings = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANG];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = strings[el.getAttribute('data-i18n')];
    if (value) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const value = strings[el.getAttribute('data-i18n-aria')];
    if (value) el.setAttribute('aria-label', value);
  });
}

function syncSwitchButtons(lang) {
  document.querySelectorAll('.lang-switch button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === lang));
  });
}

export function applyLang(lang) {
  current = lang;
  storeLang(lang);
  document.documentElement.lang = lang;
  translateNodes(lang);
  syncSwitchButtons(lang);
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function getLang() {
  return current;
}

/** Dictionary lookup for strings set from JS (menu labels, panel copy). */
export function t(key) {
  const strings = DICTIONARIES[current] || DICTIONARIES[DEFAULT_LANG];
  return strings[key] || DICTIONARIES[DEFAULT_LANG][key] || key;
}

export function initLangSwitch() {
  document.querySelectorAll('.lang-switch button').forEach((button) => {
    button.addEventListener('click', () => applyLang(button.getAttribute('data-lang')));
  });

  applyLang(readStoredLang());
}
