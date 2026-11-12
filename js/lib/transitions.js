/**
 * Page transitions: cover same-origin navigations with the loading veil
 * so the user never watches a half-loaded page assemble itself.
 *
 * A click on an internal link fades the veil in over the current page,
 * then navigates; the next page paints with the veil already up and
 * loader.js takes over. A page may register a custom exit animation
 * (setPageExitAnimation) — the intro scales its whole scene toward the
 * pie via js/lib/page-zoom.js — which owns the exit timing and may use
 * the veil itself; return null from it to fall back to the default veil
 * exit.
 *
 * External links, mailto/tel, in-page hashes and modified clicks
 * (new tab, etc.) are left to the browser untouched.
 */
import { showLoader } from '/js/lib/loader.js';

// Matches the #page-loader fade duration (inline veil CSS in <head>).
export const VEIL_FADE_MS = 450;

let exitAnimation = null;
let exiting = false;

export function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/**
 * Register this page's custom exit animation. Receives the target URL and
 * returns a promise that resolves when navigation should happen, or
 * null/undefined to fall back to the default veil exit.
 */
export function setPageExitAnimation(fn) {
  exitAnimation = fn;
}

/** Default exit: veil in, then navigate once it fully covers the page. */
export function defaultExit() {
  showLoader();
  return wait(VEIL_FADE_MS);
}

function runExit(url) {
  if (exiting) return; // one navigation per page lifetime
  exiting = true;

  let run;
  try {
    run = (exitAnimation && exitAnimation(url)) || defaultExit();
  } catch (error) {
    run = defaultExit();
  }

  Promise.resolve(run)
    .catch(() => {})
    .then(() => {
      location.href = url.href;
    });
}

/** Resolves href to a same-page URL, or null when the browser should own it. */
function resolveInternalUrl(href) {
  const trimmed = (href || '').trim();
  if (!trimmed || trimmed.charAt(0) === '#') return null;
  if (/^(mailto:|tel:|javascript:)/i.test(trimmed)) return null;

  let url;
  try {
    url = new URL(trimmed, location.href);
  } catch (error) {
    return null;
  }
  if (url.origin !== location.origin) return null;

  // Same document + hash: an in-page jump the browser handles natively.
  if (url.pathname === location.pathname && url.search === location.search && url.hash) {
    return null;
  }

  return url;
}

/**
 * Navigate with the same exit flow as link clicks. For JS-driven
 * navigation (the 3D pie's sector picks), so canvas clicks get the same
 * veil/zoom treatment as every other internal link.
 */
export function navigateWithTransition(href) {
  const url = resolveInternalUrl(href);
  if (!url) {
    location.href = href; // external / in-page hash: browser's job
    return;
  }
  runExit(url);
}

export function initPageTransitions() {
  // Back/forward cache: a page restored mid-exit comes back with the
  // navigation guard frozen ON and the scene mid-dive — reset both so the
  // page is fully usable again (page-zoom.js resets the transform).
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) exiting = false;
  });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    if (anchor.target && anchor.target.toLowerCase() !== '_self') return;
    if (anchor.hasAttribute('download')) return;

    const url = resolveInternalUrl(anchor.getAttribute('href'));
    if (!url) return;

    event.preventDefault();
    runExit(url);
  });
}
