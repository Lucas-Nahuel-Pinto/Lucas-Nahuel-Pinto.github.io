/**
 * Infinite-loop depth wheel: five anchors rendered as three visible slots.
 * Only the center item is interactive; moving the wheel re-assigns
 * data-slot values so CSS drives the depth/blur/scale.
 */

const STEP_THROTTLE_MS = 300;
const SCROLL_THRESHOLD = 40;
const TOUCH_THRESHOLD = 44;

export function createWheel({ wheel, items, onSelect }) {
  let center = 0;
  let lastStep = 0;
  let accumulator = 0;
  let touchY = null;

  function render() {
    const total = items.length;
    items.forEach((el, index) => {
      let distance = index - center;
      if (distance > total / 2) distance -= total;
      if (distance < -total / 2) distance += total;

      el.setAttribute('data-slot', String(distance));
      if (distance === 0) {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('inert', '');
        el.setAttribute('aria-hidden', 'true');
        el.setAttribute('tabindex', '-1');
      }
    });
  }

  function activeItem() {
    return items.find((el) => el.getAttribute('data-slot') === '0') || null;
  }

  function step(direction) {
    const now = Date.now();
    if (now - lastStep < STEP_THROTTLE_MS) return;
    lastStep = now;

    center = (center + direction + items.length) % items.length;
    render();

    const active = activeItem();
    if (active && onSelect) onSelect(active);
  }

  wheel.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      let dy = event.deltaY;
      if (event.deltaMode === 1) dy *= 16;
      else if (event.deltaMode === 2) dy *= wheel.clientHeight;

      accumulator += dy;
      if (Math.abs(accumulator) >= SCROLL_THRESHOLD) {
        step(accumulator > 0 ? 1 : -1);
        accumulator = 0;
      }
    },
    { passive: false }
  );

  wheel.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && document.activeElement === wheel) {
      event.preventDefault();
      const active = activeItem();
      if (active) active.click();
    }
  });

  wheel.addEventListener(
    'touchstart',
    (event) => {
      touchY = event.touches[0].clientY;
    },
    { passive: true }
  );

  wheel.addEventListener(
    'touchmove',
    (event) => {
      if (touchY === null) return;
      event.preventDefault();
      const dy = touchY - event.touches[0].clientY;
      if (Math.abs(dy) > TOUCH_THRESHOLD) {
        step(dy > 0 ? 1 : -1);
        touchY = event.touches[0].clientY;
      }
    },
    { passive: false }
  );

  wheel.addEventListener('touchend', () => {
    touchY = null;
  });

  render();

  return { step, render, activeItem };
}
