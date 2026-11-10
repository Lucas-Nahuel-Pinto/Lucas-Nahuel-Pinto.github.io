/**
 * Glass option panel: opens from the right with the copy of the chosen wheel
 * option. While it is open, choosing another option swaps the copy with a
 * short fade instead of re-sliding the panel.
 */
import { contactMailto } from '/js/lib/contact-link.js';

const PANEL_COPY = {
  '#contacto': {
    title: 'Contactar',
    color: '#ffffff',
    text: 'Elegí el canal que más te convenga.'
  },
  '#experiencia': {
    title: 'Experiencia',
    color: '#facc15',
    text:
      'Recorrido profesional en control de calidad: empecé probando aplicaciones a mano y escalé hacia la automatización. Diseño y mantengo suites de regresión, cubro flujos críticos y acompaño cada release desde la planificación de casos hasta la verificación en producción, trabajando codo a codo con desarrollo y producto.'
  },
  '#resueltos': {
    title: 'Logros',
    color: '#2bff88',
    text:
      'Resultados que se miden con datos: regresiones que bajaron de horas a minutos, bugs críticos cazados antes de llegar al usuario y cobertura estable que sostiene el ritmo de entregas. Cada logro nace de un problema real, se resuelve con criterio y se valida con métricas, no con impresiones.'
  },
  '#herramientas': {
    title: 'Herramientas',
    color: '#38bdf8',
    text:
      'El stack que uso a diario: Playwright y Selenium para automatización, Postman y consola para APIs, Git con CI para integrar cambios, y Jira para seguir el trabajo de cerca. Evalúo herramientas nuevas con ojo crítico y descarto las que no suman valor real al equipo.'
  },
  '#proyectos': {
    title: 'Mis Proyectos',
    color: '#ff3355',
    text:
      'Trabajos personales y experimentos donde pruebo ideas de punta a punta: automatización de flujos completos, integraciones con APIs y pequeñas aplicaciones resueltas con recursos propios. Un espacio para explorar sin límites y llevar lo aprendido en el día a día a proyectos propios.'
  }
};

const CONTACT_LINKEDIN = 'https://www.linkedin.com/in/pinto-lucas-nahuel/';

export function createOptionPanel() {
  const panel = document.getElementById('option-panel');
  const body = document.getElementById('option-panel-body');
  const title = document.getElementById('option-panel-title');
  const text = document.getElementById('option-panel-text');
  const actions = document.getElementById('option-panel-actions');
  const mailLink = document.getElementById('option-panel-mail');
  const linkedinLink = document.getElementById('option-panel-linkedin');
  const closeButton = document.getElementById('option-panel-close');

  let isOpen = false;
  let returnFocus = null;
  let swapTimer = null;

  function fill(key) {
    const copy = PANEL_COPY[key];
    if (!copy) return false;
    title.textContent = copy.title;
    title.style.color = copy.color;
    text.textContent = copy.text;

    const isContact = key === '#contacto';
    actions.style.display = isContact ? 'flex' : 'none';
    text.style.display = isContact ? 'none' : 'block';
    return true;
  }

  function open(key, opener) {
    if (opener !== undefined) returnFocus = opener;

    if (isOpen) {
      // Another option while open: quick content fade, no re-slide.
      body.style.opacity = '0';
      if (swapTimer) window.clearTimeout(swapTimer);
      swapTimer = window.setTimeout(() => {
        fill(key);
        body.style.opacity = '1';
      }, 120);
      return;
    }

    if (!fill(key)) return;
    isOpen = true;
    panel.removeAttribute('inert');
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('inert', '');
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
  }

  closeButton.addEventListener('click', close);

  // Contact actions: assembled mailto (anti-scraping) or LinkedIn profile.
  mailLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'mailto:' + contactMailto();
  });
  linkedinLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.open(CONTACT_LINKEDIN, '_blank', 'noopener,noreferrer');
  });

  // Click outside closes it; the wheel and its hints manage it themselves.
  document.addEventListener('click', (event) => {
    if (!isOpen) return;
    if (panel.contains(event.target)) return;
    if (event.target.closest && event.target.closest('.wheel-item, .wheel-hint, #wheel')) return;
    close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  return {
    open,
    close,
    isOpen: () => isOpen
  };
}
