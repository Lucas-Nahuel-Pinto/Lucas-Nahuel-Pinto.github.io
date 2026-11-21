/**
 * Glass option panel: opens from the right with the copy of the chosen wheel
 * option. While it is open, choosing another option swaps the copy with a
 * short fade instead of re-sliding the panel.
 */
import { contactMailto } from '/js/lib/contact-link.js';
import { getLang, t } from '/js/lib/i18n.js';

const PANEL_COPY = {
  es: {
    '#contacto': {
      title: 'Contactar',
      color: '#ffffff',
      text: 'Elegí el canal que más te convenga.'
    },
    '#experiencia': {
      title: 'Experiencia',
      color: '#facc15',
      text:
        'Cinco años en QA, del manual a la automatización agéntica. En una consultora para una aseguradora de salud probé una plataforma de pacientes: autorizaciones de tratamientos, elegibilidad a descuentos, verificación de seguros, reclamos y facturación. Hoy en Upex construyo desde cero un Test Management System con IA, automatizado con un arnés de OpenCode.',
      textFull: [
        {
          role: 'Consultora – Cliente del sector de seguros de salud | QA Engineer | 4 años',
          bullets: [
            {
              text: 'Participé en el testing de una plataforma integral para la gestión de pacientes y procesos administrativos de una aseguradora de salud.',
              label: 'Plataforma de pacientes',
              icon: 'patients'
            },
            {
              text: 'Trabajé principalmente en los módulos de autorización prioritaria de tratamientos y medicamentos, y de asistencia al usuario para la evaluación de elegibilidad a descuentos.',
              label: 'Autorizaciones',
              icon: 'shield'
            },
            {
              text: 'También participé en pruebas de funcionalidades relacionadas con verificación de seguros, reclamos, facturación y reportes financieros.',
              label: 'Reclamos y facturación',
              icon: 'invoice'
            }
          ]
        },
        {
          role: 'Upex | Agentic QA Engineer | 1 año',
          bullets: [
            {
              text: 'Trabajé en el desarrollo desde cero de un Test Management System basado en inteligencia artificial, con funcionalidades y workflows orientados al testing agéntico.',
              label: 'TMS con IA',
              icon: 'aiChip'
            },
            {
              text: 'Participé en todas las etapas del ciclo de QA, desde el refinamiento de historias de usuario y la planificación hasta la automatización, regresión y release.',
              label: 'Ciclo de QA',
              icon: 'cycle'
            },
            {
              text: 'Utilicé un arnés de OpenCode personalizado, compuesto por un agente principal de QA y subagentes especializados en diferentes tareas del proceso con skills especificas para cada etapa del flujo de trabajo.',
              label: 'Arnés de OpenCode',
              icon: 'harness'
            }
          ]
        }
      ]
    },
    '#resueltos': {
      title: 'Logros',
      color: '#2bff88',
      text:
        'Resultados que se miden con datos: regresiones que bajaron de horas a minutos, bugs críticos cazados antes de llegar al usuario y cobertura estable que sostiene el ritmo de entregas. Cada logro nace de un problema real, se resuelve con criterio y se valida con métricas, no con impresiones.',
      textFull:
        'Resultados que se miden con datos: regresiones que bajaron de horas a minutos, bugs críticos cazados antes de llegar al usuario y cobertura estable que sostiene el ritmo de entregas. Cada logro nace de un problema real, se resuelve con criterio y se valida con métricas, no con impresiones. Trabajo con evidencia: casos priorizados por riesgo, defectos con pasos exactos y reproducible, y reportes que separan el ruido de lo que de verdad bloquea el release. Si algo se rompe, primero va el diagnóstico —qué cambió, en qué entorno, con qué datos— y después la solución; si algo funciona, queda automatizado para no depender de nadie.'
    },
    '#herramientas': {
      title: 'Herramientas',
      color: '#38bdf8',
      text:
        'El stack que uso a diario: Playwright y Selenium para automatización, Postman y consola para APIs, Git con CI para integrar cambios, y Jira para seguir el trabajo de cerca. Evalúo herramientas nuevas con ojo crítico y descarto las que no suman valor real al equipo.',
      textFull:
        'El stack que uso a diario: Playwright y Selenium para automatización, Postman y consola para APIs, Git con CI para integrar cambios, y Jira para seguir el trabajo de cerca. Evalúo herramientas nuevas con ojo crítico y descarto las que no suman valor real al equipo. Prefiero pocas herramientas dominadas a muchas a medias: Playwright sostiene la suite de regresión, Postman permite explorar una API antes de escribir un solo test, el CI con ramas cortas avisa en minutos si algo se rompió, y Jira hace visible el estado del trabajo sin preguntar. Cuando aparece una herramienta nueva que promete, la pruebo en un caso real antes de adoptarla.'
    },
    '#proyectos': {
      title: 'Mis Proyectos',
      color: '#ff3355',
      text:
        'Trabajos personales y experimentos donde pruebo ideas de punta a punta: automatización de flujos completos, integraciones con APIs y pequeñas aplicaciones resueltas con recursos propios. Un espacio para explorar sin límites y llevar lo aprendido en el día a día a proyectos propios.',
      textFull:
        'Trabajos personales y experimentos donde pruebo ideas de punta a punta: automatización de flujos completos, integraciones con APIs y pequeñas aplicaciones resueltas con recursos propios. Un espacio para explorar sin límites y llevar lo aprendido en el día a día a proyectos propios. Ahí conviven un gestor de QA con agente principal y subagentes —el mismo tipo de arnés que uso en el trabajo—, experimentos de automatización con Playwright sobre sitios reales y herramientas chicas resueltas en una tarde cuando cansa repetir una tarea a mano.'
    }
  },
  en: {
    '#contacto': {
      title: 'Contact',
      color: '#ffffff',
      text: 'Pick the channel that works best for you.'
    },
    '#experiencia': {
      title: 'Experience',
      color: '#facc15',
      text:
        'Five years in QA, from manual testing to agentic automation. At a consulting firm for a health insurer I tested a patient platform: treatment authorizations, discount eligibility, insurance verification, claims and billing. Now at Upex I build an AI Test Management System from scratch with an OpenCode harness.',
      textFull: [
        {
          role: 'Consulting firm – Health insurance client | QA Engineer | 4 years',
          bullets: [
            {
              text: 'Tested an integral platform for patient and administrative-process management at a health insurer.',
              label: 'Patient platform',
              icon: 'patients'
            },
            {
              text: 'Worked mainly on the priority treatment and medication authorization module, and on user assistance for discount eligibility assessment.',
              label: 'Authorizations',
              icon: 'shield'
            },
            {
              text: 'Also tested functionalities related to insurance verification, claims, billing and financial reports.',
              label: 'Claims & billing',
              icon: 'invoice'
            }
          ]
        },
        {
          role: 'Upex | Agentic QA Engineer | 1 year',
          bullets: [
            {
              text: 'Built an AI-based Test Management System from scratch, with features and workflows aimed at agentic testing.',
              label: 'AI Test Management System',
              icon: 'aiChip'
            },
            {
              text: 'Worked across every stage of the QA cycle, from user-story refinement and planning through automation, regression and release.',
              label: 'QA cycle',
              icon: 'cycle'
            },
            {
              text: 'Used a custom OpenCode harness made of a main QA agent plus specialized subagents for different tasks of the process, with specific skills for each stage of the workflow.',
              label: 'OpenCode harness',
              icon: 'harness'
            }
          ]
        }
      ]
    },
    '#resueltos': {
      title: 'Achievements',
      color: '#2bff88',
      text:
        'Results measured with data: regressions cut from hours to minutes, critical bugs caught before they reach users, and stable coverage that keeps deliveries moving. Every achievement starts from a real problem, is solved with judgment, and is validated with metrics, not impressions.',
      textFull:
        'Results measured with data: regressions cut from hours to minutes, critical bugs caught before they reach users, and stable coverage that keeps deliveries moving. Every achievement starts from a real problem, is solved with judgment, and is validated with metrics, not impressions. I work from evidence: cases prioritized by risk, defects with exact steps and a clear repro, and reports that separate the noise from what truly blocks the release. When something breaks, the diagnosis comes first —what changed, in which environment, with which data— and the fix after; when something works, it gets automated so it no longer depends on anyone.'
    },
    '#herramientas': {
      title: 'Tools',
      color: '#38bdf8',
      text:
        'The stack I use daily: Playwright and Selenium for automation, Postman and the console for APIs, Git with CI to integrate changes, and Jira to track work closely. I evaluate new tools with a critical eye and discard the ones that do not bring real value to the team.',
      textFull:
        'The stack I use daily: Playwright and Selenium for automation, Postman and the console for APIs, Git with CI to integrate changes, and Jira to track work closely. I evaluate new tools with a critical eye and discard the ones that do not bring real value to the team. I prefer a few tools I master over many I only half-know: Playwright backs the regression suite, Postman lets me explore an API before writing a single test, short-lived branches with CI flag breakage in minutes, and Jira makes the state of work visible without asking. When a promising new tool shows up, I try it on a real case before adopting it.'
    },
    '#proyectos': {
      title: 'My Projects',
      color: '#ff3355',
      text:
        'Personal work and experiments where I test ideas end to end: full-flow automation, API integrations, and small applications built with my own resources. A space to explore without limits and turn everyday learning into projects of my own.',
      textFull:
        'Personal work and experiments where I test ideas end to end: full-flow automation, API integrations, and small applications built with my own resources. A space to explore without limits and turn everyday learning into projects of my own. It holds a QA manager with a main agent and subagents —the same kind of harness I use at work—, Playwright automation experiments on real websites, and small tools built in an afternoon when repeating a task by hand gets old.'
    }
  }
};

const CONTACT_LINKEDIN = 'https://www.linkedin.com/in/pinto-lucas-nahuel/';

// HUD line-art drawings for the flip-card fronts: [tag, attrs] pairs built
// with createElementNS (the panel's no-innerHTML rule). One per Experience
// card, language-independent — the label travels with the copy instead.
const CARD_ICONS = {
  patients: [
    ['rect', { x: '4', y: '8', width: '40', height: '26', rx: '3' }],
    ['path', { d: 'M10 21h6l3-6 4 12 3-6h7' }],
    ['path', { d: 'M24 34v6' }],
    ['path', { d: 'M16 40h16' }]
  ],
  shield: [
    ['path', { d: 'M24 6l14 5v11c0 9.5-5.7 15.7-14 20-8.3-4.3-14-10.5-14-20V11l14-5z' }],
    ['path', { d: 'M17.5 24.5l4.5 4.5 8.5-9.5' }]
  ],
  invoice: [
    ['path', { d: 'M12 6h24v36l-6-4-6 4-6-4-6 4V6z' }],
    ['path', { d: 'M24 15v14' }],
    [
      'path',
      {
        d: 'M27.5 18.5c0-1.7-1.6-2.8-3.5-2.8s-3.5 1.1-3.5 2.8 1.6 2.5 3.5 2.8 3.5 1.1 3.5 2.8-1.6 2.8-3.5 2.8-3.5-1.1-3.5-2.8'
      }
    ]
  ],
  aiChip: [
    ['rect', { x: '14', y: '14', width: '20', height: '20', rx: '3' }],
    ['circle', { cx: '21', cy: '21', r: '1.8' }],
    ['circle', { cx: '27', cy: '27', r: '1.8' }],
    ['path', { d: 'M21 21l6 6' }],
    ['path', { d: 'M20 14V7' }],
    ['path', { d: 'M28 14V7' }],
    ['path', { d: 'M20 34v7' }],
    ['path', { d: 'M28 34v7' }],
    ['path', { d: 'M14 20H7' }],
    ['path', { d: 'M14 28H7' }],
    ['path', { d: 'M34 20h7' }],
    ['path', { d: 'M34 28h7' }]
  ],
  cycle: [
    ['path', { d: 'M24 8A16 16 0 1 0 40 24' }],
    ['path', { d: 'M36 28l4-4 4 4' }],
    ['path', { d: 'M17.5 24.5l4.5 4.5 9-10' }]
  ],
  harness: [
    ['circle', { cx: '24', cy: '24', r: '7' }],
    ['circle', { cx: '24', cy: '24', r: '2' }],
    ['circle', { cx: '8', cy: '8', r: '3.5' }],
    ['circle', { cx: '40', cy: '8', r: '3.5' }],
    ['circle', { cx: '8', cy: '40', r: '3.5' }],
    ['circle', { cx: '40', cy: '40', r: '3.5' }],
    ['path', { d: 'M11 11l6 6' }],
    ['path', { d: 'M37 11l-6 6' }],
    ['path', { d: 'M11 37l6-6' }],
    ['path', { d: 'M37 37l-6-6' }]
  ]
};

function buildCardIcon(name) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 48 48');
  svg.setAttribute('class', 'copy-card-icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  (CARD_ICONS[name] || []).forEach(([tag, attrs]) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    svg.appendChild(node);
  });
  return svg;
}

export function createOptionPanel() {
  const panel = document.getElementById('option-panel');
  const body = document.getElementById('option-panel-body');
  const title = document.getElementById('option-panel-title');
  const text = document.getElementById('option-panel-text');
  const actions = document.getElementById('option-panel-actions');
  const mailLink = document.getElementById('option-panel-mail');
  const linkedinLink = document.getElementById('option-panel-linkedin');
  const closeButton = document.getElementById('option-panel-close');
  const expandButton = document.getElementById('option-panel-expand');
  const expandLabel = document.getElementById('option-panel-expand-label');

  let isOpen = false;
  let isExpanded = false;
  let returnFocus = null;
  let swapTimer = null;
  let expandTimer = null;
  let currentKey = null;

  // Camera-pan layout: on expand the wheel tucks into the left column
  // (under the HUD — the wedge stays above it, both in y and in z) and the
  // panel's left edge stops before the wheel's visible bounds (GAP_PANEL) —
  // the two never touch. Measured from the wheel's REST position (applied
  // pan subtracted) so re-measuring while already panned (resize) stays
  // correct; the union includes every slot so stepping the wheel while
  // expanded cannot make a wider chip collide.
  function measurePan() {
    const hud = document.querySelector('.corner-hud');
    const wrap = document.querySelector('.wheel-wrap');
    if (!hud || !wrap) return;

    const parts = wrap.querySelectorAll('.wheel-hint, .wheel-item');
    let min = Infinity;
    let max = -Infinity;
    parts.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      min = Math.min(min, rect.left);
      max = Math.max(max, rect.right);
    });
    if (!isFinite(min)) return;

    const rootStyle = document.documentElement.style;
    const applied = parseFloat(rootStyle.getPropertyValue('--wheel-pan')) || 0;
    const restLeft = min - applied;
    const restWidth = max - min;

    const WHEEL_LEFT = 24;
    const GAP_PANEL = 40;
    const hudRect = hud.getBoundingClientRect();
    const wheelLeft = hudRect.left + WHEEL_LEFT;
    const panelLeft = wheelLeft + restWidth + GAP_PANEL;

    rootStyle.setProperty('--wheel-pan', wheelLeft - restLeft + 'px');
    rootStyle.setProperty('--panel-expanded-w', window.innerWidth - panelLeft + 'px');
  }

  function setExpandLabel() {
    const key = isExpanded ? 'readLess' : 'readMore';
    expandLabel.setAttribute('data-i18n', key);
    expandLabel.textContent = t(key);
  }

  // Copy can be a plain string (teasers, most entries) or a structured
  // list of { role, bullets } (the Experiencia full view), where each
  // bullet is { text, label, icon } rendered as a two-faced flip card.
  // Everything is built with DOM APIs — never HTML parsing — so the panel
  // keeps its no-innerHTML rule.
  function renderCopy(content) {
    // .is-structured lets CSS give the module grid the full panel width
    // while plain paragraphs keep a readable measure.
    text.classList.toggle('is-structured', typeof content !== 'string');
    if (typeof content === 'string') {
      text.textContent = content;
      return;
    }
    const list = document.createElement('ul');
    list.className = 'copy-list';
    content.forEach((entry) => {
      const item = document.createElement('li');
      const role = document.createElement('strong');
      role.textContent = entry.role;
      item.appendChild(role);
      const sub = document.createElement('ul');
      entry.bullets.forEach((bullet) => {
        sub.appendChild(buildFlipCard(bullet));
      });
      item.appendChild(sub);
      list.appendChild(item);
    });
    text.replaceChildren(list);
  }

  // One Experience card: role=button + aria-pressed so click and keyboard
  // announce the toggle. The back face (the copy) stays in the DOM — the
  // visual flip never hides the text from assistive tech.
  function buildFlipCard(bullet) {
    const card = document.createElement('li');
    card.className = 'copy-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', bullet.label);

    const scene = document.createElement('div');
    scene.className = 'copy-card-scene';

    const front = document.createElement('div');
    front.className = 'copy-card-face copy-card-front';
    front.appendChild(buildCardIcon(bullet.icon));
    const label = document.createElement('span');
    label.className = 'copy-card-label';
    label.textContent = bullet.label;
    front.appendChild(label);

    const back = document.createElement('div');
    back.className = 'copy-card-face copy-card-back';
    back.textContent = bullet.text;

    scene.append(front, back);
    card.appendChild(scene);
    return card;
  }

  function flipCard(card) {
    const flipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(flipped));
  }

  // Click flips, but a text selection on the back face must not: the drag
  // that selects fires selectstart, and the flag is re-armed on the next
  // pointerdown so it never leaks into a later plain click.
  let selectingInCard = false;
  text.addEventListener('pointerdown', () => {
    selectingInCard = false;
  });
  text.addEventListener('selectstart', (event) => {
    if (event.target.closest && event.target.closest('.copy-card')) {
      selectingInCard = true;
    }
  });
  text.addEventListener('click', (event) => {
    const card = event.target.closest && event.target.closest('.copy-card');
    const wasSelecting = selectingInCard;
    selectingInCard = false;
    if (!card || wasSelecting) return;
    flipCard(card);
  });
  text.addEventListener('keydown', (event) => {
    const card = event.target.closest && event.target.closest('.copy-card');
    if (!card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipCard(card);
    }
  });

  // The visible copy always matches the level: full text while expanded,
  // teaser while narrow (entries without a full copy always show their one
  // text). delay defers the swap so the words land with the new panel width
  // instead of racing ahead of it.
  function syncText(delay) {
    const strings = PANEL_COPY[getLang()] || PANEL_COPY.es;
    const copy = currentKey && strings[currentKey];
    if (!copy) return;
    if (expandTimer) window.clearTimeout(expandTimer);
    const write = () => {
      renderCopy(isExpanded && copy.textFull ? copy.textFull : copy.text);
    };
    if (delay) expandTimer = window.setTimeout(write, delay);
    else write();
  }

  function setExpanded(next, textDelay) {
    // Mobile: the panel already spans the width — no expansion, no pan.
    if (next && window.innerWidth <= 767) return;
    if (next === isExpanded) return;
    isExpanded = next;
    if (next) {
      measurePan();
    } else {
      document.documentElement.style.removeProperty('--wheel-pan');
      document.documentElement.style.removeProperty('--panel-expanded-w');
    }
    panel.classList.toggle('is-expanded', next);
    expandButton.setAttribute('aria-expanded', String(next));
    setExpandLabel();
    syncText(textDelay || 0);
    // The face veil (CSS: html:has(#option-panel.is-expanded) #face-veil)
    // follows the class — it fades 0 -> 100 over the person, in place.
  }

  function fill(key) {
    const strings = PANEL_COPY[getLang()] || PANEL_COPY.es;
    const copy = strings[key];
    if (!copy) return false;
    currentKey = key;
    title.textContent = copy.title;
    title.style.color = copy.color;

    const isContact = key === '#contacto';
    actions.style.display = isContact ? 'flex' : 'none';
    text.style.display = isContact ? 'none' : 'block';

    // Two-level copy: every text entry now carries teaser + full version,
    // so the toggle exists for all of them. The expansion itself is
    // independent of the toggle (contact opens wide with its links only).
    expandButton.hidden = !copy.textFull;
    setExpandLabel();
    syncText(0);
    return true;
  }

  function open(key, opener, options) {
    if (opener !== undefined) returnFocus = opener;

    if (isOpen) {
      // Another option while open: quick content fade, no re-slide. The
      // expansion level is kept — a collapsed panel swaps in collapsed, an
      // expanded one swaps in expanded (fill renders the right level).
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
    // Opens at rest (collapsed): expanding is the user's choice via the
    // toggle, and once chosen it sticks across wheel selections. A deep
    // link can ask for more: options.expanded arrives with the full copy
    // already deployed (setExpanded no-ops on mobile, no expansion there).
    panel.classList.add('is-open');
    if (options && options.expanded) setExpanded(true, 240);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    setExpanded(false);
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('inert', '');
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
  }

  closeButton.addEventListener('click', close);

  // Expand toggle: the full text waits for the panel to be mostly wide
  // (delay on expand), the teaser swaps back immediately on collapse.
  expandButton.addEventListener('click', () => {
    const strings = PANEL_COPY[getLang()] || PANEL_COPY.es;
    const copy = currentKey && strings[currentKey];
    if (!copy || !copy.textFull) return;
    const next = !isExpanded;
    setExpanded(next, next ? 240 : 0);
  });

  // Keep the geometry honest while expanded: re-measure on resize and drop
  // the pan when the viewport becomes mobile (the panel already spans the
  // width). Growing back into desktop does NOT force the expansion — the
  // level only changes through the toggle or a fresh open.
  window.addEventListener('resize', () => {
    if (!isOpen) return;
    if (window.innerWidth <= 767) {
      if (isExpanded) setExpanded(false);
    } else if (isExpanded) {
      measurePan();
    }
  });

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

  // ES/EN flip while open: re-render the visible copy in the new language.
  window.addEventListener('langchange', () => {
    if (isOpen && currentKey) fill(currentKey);
  });

  return {
    open,
    close,
    isOpen: () => isOpen
  };
}
