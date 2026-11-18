/**
 * Dark/light theme switch — the HUD's top ring sector (the .theme-switch
 * class is kept on the sector button so this selector still finds it).
 *
 * Dark is the default: <html data-theme="dark"> ships in the markup and a
 * tiny head script applies the stored preference before the first paint,
 * so a page never flashes the wrong artwork. This module owns the
 * button label, persists the choice in localStorage and preloads the
 * OTHER artwork after window load (never before — it would delay the
 * load event the loading veil waits on), so toggling swaps instantly with
 * no empty frame.
 *
 * Artwork sources: pages can point elements at per-theme images with
 * data-theme-src-dark / data-theme-src-light (about's overlay <img>) —
 * those swap here on every theme change. Pages whose artwork is a CSS
 * background (intro's #page-zoom) are served from BACKGROUNDS instead.
 *
 * The icon shows the MODE THE CLICK SWITCHES TO: sun while dark
 * (click → light), moon while light (click → dark) — the same target
 * the aria-label announces.
 */

const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'dark';

const BACKGROUNDS = {
  dark: '/mainPage-bg-night.jpg',
  light: '/mainPage-bg-day.jpg'
};

// aria-label announces the ACTION (the mode the click switches to).
const LABELS = {
  es: { dark: 'Cambiar a modo oscuro', light: 'Cambiar a modo claro' },
  en: { dark: 'Switch to dark mode', light: 'Switch to light mode' }
};

let current = DEFAULT_THEME;
const preloads = {};

function readDomTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : DEFAULT_THEME;
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    /* private mode / storage disabled: the switch still works for the session */
  }
}

/** Resolves once the theme's artwork is decoded (cached after first use). */
function preload(theme) {
  if (!preloads[theme]) {
    const urls = sourcesFor(theme);
    preloads[theme] = Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          })
      )
    );
  }
  return preloads[theme];
}

/** Artwork URLs the theme needs on THIS page. */
function sourcesFor(theme) {
  const urls = [];
  const push = (url) => {
    if (url && urls.indexOf(url) === -1) urls.push(url);
  };
  // CSS-background artwork (intro's #page-zoom wrapper)
  if (document.getElementById('page-zoom')) push(BACKGROUNDS[theme]);
  // Element artwork (about's overlay <img>)
  document.querySelectorAll('[data-theme-src-dark]').forEach((el) => {
    push(el.getAttribute(theme === 'light' ? 'data-theme-src-light' : 'data-theme-src-dark'));
  });
  return urls;
}

/** Points every [data-theme-src-*] element at the current theme's artwork. */
function syncArtwork(theme) {
  document.querySelectorAll('[data-theme-src-dark]').forEach((el) => {
    const url = el.getAttribute(theme === 'light' ? 'data-theme-src-light' : 'data-theme-src-dark');
    if (url && el.getAttribute('src') !== url) el.src = url;
  });
}

function syncButton(theme) {
  const button = document.querySelector('.theme-switch');
  if (!button) return;
  const target = theme === 'dark' ? 'light' : 'dark';
  const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  button.setAttribute('aria-label', LABELS[lang][target]);
}

export function applyTheme(theme) {
  current = theme;
  storeTheme(theme);
  document.documentElement.dataset.theme = theme;
  syncArtwork(theme);
  syncButton(theme);
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function getTheme() {
  return current;
}

export function initThemeSwitch() {
  const button = document.querySelector('.theme-switch');
  if (!button) return;

  // The head script already set the attribute; adopt it as the truth.
  current = readDomTheme();
  syncArtwork(current);
  syncButton(current);

  button.addEventListener('click', async () => {
    const next = current === 'dark' ? 'light' : 'dark';
    // Never swap to a URL that is not fetched yet: an unloaded
    // background-image paints the fallback color instead (a flash).
    await preload(next);
    if (next === current) return;
    applyTheme(next);
  });

  // The loader preloads the ACTIVE artwork; fetch the other one only
  // after load so the extra request cannot delay the veil.
  const warmOpposite = () => preload(current === 'dark' ? 'light' : 'dark');
  if (document.readyState === 'complete') warmOpposite();
  else window.addEventListener('load', warmOpposite, { once: true });

  // Keep the action label in the user's language when ES/EN flips.
  window.addEventListener('langchange', () => syncButton(current));
}
