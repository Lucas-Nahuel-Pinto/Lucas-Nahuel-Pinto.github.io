/**
 * Projects carousel: slides, detail section, chips, dots, arrows, keyboard,
 * hash deep links and swipe.
 */
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

  function renderInfo(project) {
    infoContent.innerHTML =
      '<h1 style="color:' + project.accent + ';">' + project.title + '</h1>' +
      '<p class="info-tagline">' + project.tagline + '</p>' +
      '<div class="info-block">' +
        '<h3>Cómo surgió la idea</h3><p>' + project.idea + '</p>' +
      '</div>' +
      '<div class="info-block">' +
        '<h3>Qué problemas resuelve</h3><p>' + project.problems + '</p>' +
      '</div>' +
      '<div class="info-metric">' +
        '<span class="metric-value">' + project.metric.value + '</span>' +
        '<span class="metric-label">' + project.metric.label + '</span>' +
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
      dot.setAttribute('aria-label', 'Ir a ' + project.title);
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

  buildDots();
  initNavigation();
  initSwipe();
  current = indexOfSlug(window.location.hash.replace('#', ''));
  render();

  return {
    goTo,
    currentIndex: () => current,
    activeSlug: () => projects[current].slug
  };
}
