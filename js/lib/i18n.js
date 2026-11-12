/**
 * ES/EN language switch.
 *
 * Any element carrying [data-i18n] swaps its text and any element with
 * [data-i18n-aria] swaps its aria-label, using the dictionaries below.
 * The choice is persisted in localStorage and broadcast through a
 * `langchange` CustomEvent so 3D scenes can react to it.
 */

const STORAGE_KEY = 'portfolio-lang';
const DEFAULT_LANG = 'es';

const DICTIONARIES = {
  es: { language: 'Idioma', about: 'Sobre mí' },
  en: { language: 'Language', about: 'About Me' }
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

export function initLangSwitch() {
  document.querySelectorAll('.lang-switch button').forEach((button) => {
    button.addEventListener('click', () => applyLang(button.getAttribute('data-lang')));
  });

  applyLang(readStoredLang());
}
