/**
 * Full-screen loading veil.
 *
 * The veil markup ships visible in the HTML (first paint, no flash). This
 * module waits for the page's critical assets — window load, fonts, the
 * body's CSS background image and every <video>'s metadata (never its full
 * data) — then fades the veil out. A hard timeout guarantees the user is
 * never trapped behind it.
 *
 * The page-transition layer imports showLoader()/hideLoader() to cover
 * same-origin navigations with the same veil.
 */

const MIN_VISIBLE_MS = 400;
const MAX_WAIT_MS = 8000;

let loaderEl = null;
let readyPromise = null;

function veil() {
  if (!loaderEl) loaderEl = document.getElementById('page-loader');
  return loaderEl;
}

/** Resolves when the window load event fires (or already has). */
function whenLoaded() {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
}

/** Resolves when document.fonts.ready settles (or the API is missing). */
function whenFontsReady() {
  if (!document.fonts || !document.fonts.ready) return Promise.resolve();
  return document.fonts.ready.catch(() => {});
}

/** Preloads the CSS background image(s) (backgrounds do not block load). */
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * Preloads the page's CSS background images: the body's and the intro's
 * #page-zoom wrapper (intro's artwork lives there). The computed style is
 * only read AFTER window load — Firefox can run module scripts before the
 * stylesheets finish (bug 1404468), and reading too early would miss the
 * url and stop waiting for the artwork.
 */
function whenBackgroundReady() {
  return whenLoaded().then(() => {
    const roots = [document.body, document.getElementById('page-zoom')].filter(Boolean);
    const urls = [];
    roots.forEach((el) => {
      const match = /url\((['"]?)(.+?)\1\)/.exec(getComputedStyle(el).backgroundImage || '');
      if (match && urls.indexOf(match[2]) === -1) urls.push(match[2]);
    });
    return Promise.all(urls.map(preloadImage));
  });
}

/** Waits for a video's metadata (readyState >= 1), never its full data. */
function whenVideoMetadata(video) {
  if (video.readyState >= 1 || Number.isFinite(video.duration)) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => {
      video.removeEventListener('loadedmetadata', done);
      video.removeEventListener('error', done);
      resolve();
    };
    video.addEventListener('loadedmetadata', done);
    video.addEventListener('error', done);
  });
}

function whenCriticalAssetsReady() {
  return Promise.all([
    whenLoaded(),
    whenFontsReady(),
    whenBackgroundReady(),
    ...Array.prototype.map.call(document.querySelectorAll('video'), whenVideoMetadata)
  ]);
}

/** Covers the screen again (used by the transition layer before navigating). */
export function showLoader() {
  const el = veil();
  if (el) el.classList.remove('is-done');
}

/** Hides the veil once the page is ready. */
export function hideLoader() {
  const el = veil();
  if (el) el.classList.add('is-done');
}

/**
 * Starts the initial load sequence. Idempotent: later calls return the
 * same promise, which resolves when the veil has been hidden.
 */
export function initPageLoader() {
  if (readyPromise) return readyPromise;
  const startedAt = performance.now();

  const timeout = new Promise((resolve) => window.setTimeout(resolve, MAX_WAIT_MS));

  readyPromise = Promise.race([whenCriticalAssetsReady(), timeout])
    .then(() => {
      // Keep the veil visible long enough for an even, deliberate feel.
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      return new Promise((resolve) => window.setTimeout(resolve, remaining));
    })
    .then(hideLoader);

  // Back/forward cache: the page returns with its old veil state frozen —
  // a page left mid-transition comes back covered, so reset it here.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) hideLoader();
  });

  return readyPromise;
}
