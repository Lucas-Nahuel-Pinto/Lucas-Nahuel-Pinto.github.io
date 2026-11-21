/**
 * Projects carousel: slides, detail section, chips, dots, arrows, keyboard,
 * hash deep links and swipe. The detail copy follows the ES/EN switch:
 * langchange re-renders the visible section.
 */
import { getLang, t } from '/js/lib/i18n.js';

export function createCarousel({ projects, carouselId = 'proyectos-carousel' }) {
  const carousel = document.getElementById(carouselId);
  const slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide'));
  const infoContent = document.getElementById('info-content');
  const chipsWrap = document.getElementById('info-chips');
  const dotsWrap = document.getElementById('car-dots');

  let current = 0;

  function indexOfSlug(slug) {
    const index = projects.findIndex((project) => project.slug === slug);
    return index === -1 ? 0 : index;
  }

  /** Language-aware copy: titles are product names and stay put. The
      tagline is optional — QA dropped its subtitle, so the detail section
      renders without one when the field is missing. */
  function localized(project) {
    const en = getLang() === 'en' && project.en;
    return {
      tagline: en ? project.en.tagline : project.tagline,
      idea: en ? project.en.idea : project.idea,
      problems: en ? project.en.problems : project.problems,
      metricLabel: en ? project.en.metricLabel : project.metric.label
    };
  }

  function renderInfo(project) {
    const copy = localized(project);
    const tagline = copy.tagline ? '<p class="info-tagline">' + copy.tagline + '</p>' : '';
    infoContent.innerHTML =
      '<h1 style="color:' + project.accent + ';">' + project.title + '</h1>' +
      tagline +
      '<div class="info-block">' +
        '<h3>' + t('ideaHeading') + '</h3><p>' + copy.idea + '</p>' +
      '</div>' +
      '<div class="info-block">' +
        '<h3>' + t('problemsHeading') + '</h3><p>' + copy.problems + '</p>' +
      '</div>' +
      '<div class="info-metric">' +
        '<span class="metric-value">' + project.metric.value + '</span>' +
        '<span class="metric-label">' + copy.metricLabel + '</span>' +
      '</div>';
  }

  function renderChips() {
    chipsWrap.innerHTML = '';
    projects.forEach((project, index) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (index === current ? ' is-active' : '');
      chip.textContent = project.title;
      chip.addEventListener('click', () => goTo(index));
      chipsWrap.appendChild(chip);
    });
  }

  function syncDots() {
    Array.prototype.forEach.call(dotsWrap.children, (dot, index) => {
      dot.classList.toggle('is-active', index === current);
      // Refresh the label too: it carries the language-aware "Go to …".
      dot.setAttribute('aria-label', t('goTo') + ' ' + projects[index].title);
    });
  }

  function render() {
    const project = projects[current];
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === current);
    });
    renderInfo(project);
    renderChips();
    syncDots();
  }

  function goTo(index) {
    current = (index + projects.length) % projects.length;
    render();
    const hash = '#' + projects[current].slug;
    if (window.location.hash !== hash) history.replaceState(null, '', hash);
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    projects.forEach((project, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'car-dot' + (index === current ? ' is-active' : '');
      dot.setAttribute('aria-label', t('goTo') + ' ' + project.title);
      dot.addEventListener('click', () => goTo(index));
      dotsWrap.appendChild(dot);
    });
  }

  function initNavigation() {
    document.getElementById('car-prev').addEventListener('click', () => goTo(current - 1));
    document.getElementById('car-next').addEventListener('click', () => goTo(current + 1));

    document.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(current + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(current - 1);
      }
    });

    window.addEventListener('hashchange', () => {
      goTo(indexOfSlug(window.location.hash.replace('#', '')));
    });
  }

  function initSwipe() {
    let startY = null;

    carousel.addEventListener(
      'touchstart',
      (event) => {
        startY = event.touches[0].clientY;
      },
      { passive: true }
    );

    carousel.addEventListener(
      'touchmove',
      (event) => {
        if (startY === null) return;
        event.preventDefault();
        const dy = startY - event.touches[0].clientY;
        if (Math.abs(dy) > 50) {
          goTo(current + (dy > 0 ? 1 : -1));
          startY = null;
        }
      },
      { passive: false }
    );

    carousel.addEventListener('touchend', () => {
      startY = null;
    });
  }

  /**
   * One wheel tick over the slide drops the whole page to the detail
   * section below (and back up from its top edge); the chevron does the
   * same for clicks, taps and Enter/Space. Native scrolling stays
   * untouched once the detail section is well in view. A short lock
   * absorbs the rest of the trackpad/mouse momentum while gliding.
   */
  function initScrollHint() {
    const hint = document.getElementById('car-scroll');
    const info = document.getElementById('proyectos-info');
    const loader = document.getElementById('page-loader');
    if (!hint || !info) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animating = false;

    function infoTop() {
      return Math.round(info.getBoundingClientRect().top + window.scrollY);
    }

    function snap(top) {
      if (animating) return;
      animating = true;
      window.scrollTo({ top: top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      // No cross-browser "smooth scroll finished" signal we can rely on
      // here; 900ms covers a full-viewport jump in Firefox and Chromium.
      window.setTimeout(() => {
        animating = false;
      }, 900);
    }

    hint.addEventListener('click', () => snap(infoTop()));

    window.addEventListener(
      'wheel',
      (event) => {
        if (event.ctrlKey) return; // pinch zoom: browser's gesture
        if (loader && !loader.classList.contains('is-done')) return;
        if (animating) {
          event.preventDefault(); // absorb momentum while gliding
          return;
        }
        const y = window.scrollY;
        const t = infoTop();
        if (event.deltaY > 0 && y < t - 40) {
          event.preventDefault();
          snap(t);
        } else if (event.deltaY < 0 && y > 40 && y < t + 40) {
          event.preventDefault();
          snap(0);
        }
      },
      { passive: false }
    );
  }

  buildDots();
  initNavigation();
  initSwipe();
  initScrollHint();
  current = indexOfSlug(window.location.hash.replace('#', ''));
  render();

  // ES/EN flip while on the page: re-render the visible detail section
  // (slide taglines are static [data-i18n] markup and swap on their own).
  window.addEventListener('langchange', render);

  return {
    goTo,
    currentIndex: () => current,
    activeSlug: () => projects[current].slug
  };
}
