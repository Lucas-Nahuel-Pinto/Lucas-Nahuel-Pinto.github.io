/** Mobile hamburger: toggles the full-screen overlay and morphs the bars. */
export function initMobileMenu() {
  const overlay = document.getElementById('mobile-menu');
  const bars = [
    document.getElementById('burger-1'),
    document.getElementById('burger-2'),
    document.getElementById('burger-3')
  ];
  const toggle = document.getElementById('menu-toggle');

  const OPEN_BAR_CLASSES = [
    ['rotate-45', 'translate-y-[7px]'],
    ['opacity-0'],
    ['-rotate-45', '-translate-y-[7px]']
  ];
  const CLOSED_BAR_CLASSES = [
    ['rotate-0', 'translate-y-0'],
    ['opacity-100'],
    ['rotate-0', 'translate-y-0']
  ];

  let isOpen = false;

  function setMenu(open) {
    isOpen = open;
    toggle.setAttribute('aria-label', open ? 'Close Menu' : 'Open Menu');

    if (open) {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      overlay.classList.remove('opacity-100', 'pointer-events-auto');
      overlay.classList.add('opacity-0', 'pointer-events-none');
    }

    const [add, remove] = open ? [OPEN_BAR_CLASSES, CLOSED_BAR_CLASSES] : [CLOSED_BAR_CLASSES, OPEN_BAR_CLASSES];
    bars.forEach((bar, index) => {
      bar.classList.remove(...remove[index]);
      bar.classList.add(...add[index]);
    });
  }

  toggle.addEventListener('click', () => setMenu(!isOpen));

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
}
