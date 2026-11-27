/**
 * About page entry point: wires the background scrub, the depth wheel, the
 * glass option panel and the mobile menu.
 */
import { createVideoScrub } from '/js/lib/video-scrub.js';
import { initContactLinks } from '/js/lib/contact-link.js';
import { initLangSwitch } from '/js/lib/i18n.js';
import { initPageLoader } from '/js/lib/loader.js';
import { initPageTransitions } from '/js/lib/transitions.js';
import { initThemeSwitch } from '/js/lib/theme.js';
import { createOptionPanel } from '/js/pages/about/option-panel.js';
import { createWheel } from '/js/pages/about/wheel.js';
import { initMobileMenu } from '/js/pages/about/mobile-menu.js';

initPageLoader();
initPageTransitions();
initLangSwitch();
initThemeSwitch();

const video = document.getElementById('scrub-video');
createVideoScrub({ video, sensitivity: 0.8 });

const wheelEl = document.getElementById('wheel');
const wheelItems = Array.prototype.slice.call(wheelEl.querySelectorAll('.wheel-item'));
const panel = createOptionPanel();

const wheel = createWheel({
  wheel: wheelEl,
  items: wheelItems,
  onSelect(active) {
    // Auto-open the glass panel for the newly active option, no click needed.
    panel.open(active.getAttribute('href'), active);
  }
});

// Deep link (intro.html's Logros board → about.html#resueltos): center the
// wheel on the hashed option and arrive with the panel already deployed.
// This runs when the loader resolves — before the veil's first painted
// frame — and html.is-deeplink kills the panel/wheel transitions for the
// first frames, so the veil reveals the final state instead of the
// deployment itself. Load-time only — later hash edits are inert.
initPageLoader().then(() => {
  if (!window.location.hash) return;
  const index = wheelItems.findIndex(
    (item) => item.getAttribute('href') === window.location.hash
  );
  if (index < 0) return;
  document.documentElement.classList.add('is-deeplink');
  wheel.goTo(index);
  const target = wheelItems[index];
  panel.open(target.getAttribute('href'), target, { expanded: true, instant: true });
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('is-deeplink');
    })
  );
});

// Arrow / PageUp-PageDown work from anywhere on the page.
document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const tag = (event.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || event.target.isContentEditable) return;

  if (event.key === 'ArrowDown' || event.key === 'PageDown') {
    event.preventDefault();
    wheel.step(1);
  } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault();
    wheel.step(-1);
  }
});

// Scroll hints: one click = one wheel step.
document.querySelector('.wheel-hint--up').addEventListener('click', () => wheel.step(-1));
document.querySelector('.wheel-hint--down').addEventListener('click', () => wheel.step(1));

// Choosing an option opens its panel.
wheelItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    panel.open(item.getAttribute('href'), item);
  });
});

initMobileMenu();
initContactLinks();
