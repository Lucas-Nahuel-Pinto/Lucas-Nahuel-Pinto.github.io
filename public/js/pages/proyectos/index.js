/**
 * Projects page entry point: carousel plus the QA hero video scrub, which is
 * only meaningful while the first slide is active.
 */
import { PROJECTS } from '/js/pages/proyectos/data.js';
import { createCarousel } from '/js/pages/proyectos/carousel.js';
import { createVideoScrub } from '/js/lib/video-scrub.js';
import { initLangSwitch } from '/js/lib/i18n.js';
import { initPageLoader } from '/js/lib/loader.js';
import { initPageTransitions } from '/js/lib/transitions.js';
import { initThemeSwitch } from '/js/lib/theme.js';

initPageLoader();
initPageTransitions();
initLangSwitch();
initThemeSwitch();

const carousel = createCarousel({ projects: PROJECTS });

createVideoScrub({
  video: document.getElementById('slide-scrub-video'),
  sensitivity: 0.8,
  isEnabled: () => carousel.activeSlug() === 'qa-flow-checklists'
});
