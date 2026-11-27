/**
 * Whole-page dive: scales #page-zoom — background, navbar, chart and
 * board overlays as ONE camera move — toward a focal element with a CSS
 * transform. The loading veil lives OUTSIDE the wrapper, so it always
 * covers at normal scale while the page dives underneath.
 *
 * Used by the intro's exit toward About; a pageshow from the back/forward
 * cache resets a dive that was frozen mid-flight.
 */

// How far the page closes in on the focal point at full dive.
const ZOOM_SCALE = 1.6;

let wrapper = null;
// Monotonic token: bumping it invalidates any in-flight dive so a frozen
// animation-frame callback resumed from the back/forward cache can never
// re-apply the zoom AFTER a reset (the Firefox "zoom stays on back" bug).
let diveId = 0;
let cancelDive = null;

function scene() {
  if (!wrapper) wrapper = document.getElementById('page-zoom');
  return wrapper;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Dive the whole scene toward `origin` over `duration` ms.
 * Resolves when the dive completes (or immediately with false when the
 * wrapper/origin is unavailable — callers fall back to the plain veil).
 */
export function zoomPageOut({ origin, duration = 600, scale = ZOOM_SCALE } = {}) {
  const target = scene();
  if (!target || !origin) return Promise.resolve(false);

  const tRect = target.getBoundingClientRect();
  const oRect = origin.getBoundingClientRect();
  if (!tRect.width || !oRect.width) return Promise.resolve(false);

  // Focal point = center of the origin element, in wrapper coordinates.
  target.style.transformOrigin =
    (((oRect.left + oRect.width / 2) - tRect.left) / tRect.width) * 100 + '% ' +
    (((oRect.top + oRect.height / 2) - tRect.top) / tRect.height) * 100 + '%';
  target.style.willChange = 'transform';

  const startedAt = performance.now();
  const id = ++diveId;
  return new Promise((resolve) => {
    cancelDive = () => resolve(false);
    function frame(now) {
      // The dive was invalidated (page restored/reset while frozen): bail
      // without touching the DOM or the cached scale would come back.
      if (id !== diveId) return;
      const t = Math.min(1, (now - startedAt) / duration);
      target.style.transform = 'scale(' + (1 + (scale - 1) * easeInOutCubic(t)) + ')';
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        cancelDive = null;
        resolve(true);
      }
    }
    requestAnimationFrame(frame);
  });
}

/** Undo a dive (page restored from the back/forward cache mid-exit). */
export function resetPageZoom() {
  // Invalidate first: any animation-frame callback still pending from the
  // frozen dive runs AFTER pageshow and must not re-apply the zoom.
  diveId++;
  if (cancelDive) {
    cancelDive();
    cancelDive = null;
  }
  const target = scene();
  if (!target) return;
  target.style.transform = '';
  target.style.transformOrigin = '';
  target.style.willChange = '';
}

// Before Firefox freezes the page into the back/forward cache, drop the
// dive so the SNAPSHOT itself is already unzoomed — the restored frame
// can never show the zoomed page, not even for one paint.
window.addEventListener('pagehide', (event) => {
  if (event.persisted) resetPageZoom();
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) resetPageZoom();
});
