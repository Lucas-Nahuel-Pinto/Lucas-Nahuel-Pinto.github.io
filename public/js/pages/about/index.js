/**
 * About page entry point: wires the background scrub, the depth wheel, the
 * glass option panel and the mobile menu.
 */
import { createVideoScrub } from '/js/lib/video-scrub.js';
import { initContactLinks } from '/js/lib/contact-link.js';
import { createOptionPanel } from '/js/pages/about/option-panel.js';
import { createWheel } from '/js/pages/about/wheel.js';
import { initMobileMenu } from '/js/pages/about/mobile-menu.js';

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
