import { initLangSwitch } from '/js/lib/i18n.js';
import { initPageLoader, showLoader } from '/js/lib/loader.js';
import { initPageTransitions, setPageExitAnimation, VEIL_FADE_MS, wait } from '/js/lib/transitions.js';
import { zoomPageOut } from '/js/lib/page-zoom.js';

initPageLoader();
initPageTransitions();
initLangSwitch();

// ---------- Exit dive (intro -> About) ----------
// Scaling #page-zoom moves the WHOLE scene — background, navbar, chart and
// board overlays — as one camera move toward the pie. The veil lives
// outside the wrapper, so it fades in at normal scale over the dive's
// tail and navigation lands fully covered. Any other exit (or reduced
// motion) keeps the default plain veil.
const ZOOM_MS = 600;

setPageExitAnimation((url) => {
  if (!url.pathname.endsWith('/about.html')) return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  zoomPageOut({ origin: document.getElementById('chart'), duration: ZOOM_MS });

  // Veil covers exactly when the dive ends, then navigate (total = ZOOM_MS).
  return wait(Math.max(0, ZOOM_MS - VEIL_FADE_MS))
    .then(() => showLoader())
    .then(() => wait(VEIL_FADE_MS));
});
