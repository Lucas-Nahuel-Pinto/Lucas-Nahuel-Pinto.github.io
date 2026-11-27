/** Copy shown in the carousel slides and in the detail section.
    Spanish ships as the flat fields; `en` mirrors them for the EN switch
    (titles are product names and stay identical in both languages). */
export const PROJECTS = [
  {
    slug: 'qa-flow-checker',
    title: 'QA Flow Checker',
    accent: '#facc15',
    icon: 'clipboard',
    idea:
      'La idea nació cuando el flujo de QA empezó a crecer más rápido que la forma de documentarlo: cada fase del sprint improvisaba su rutina. Convertí eso en cinco checklists navegables, autocontenidos, que convierten cada fase en preguntas concretas que cualquier QA puede seguir sin contexto previo.',
    problems:
      'El refinamiento dependía de la memoria de quien estaba de guardia; el testing variaba según la carga del día; la regression terminaba siendo un smoke a última hora. Sin punto único de verdad, la calidad dependía de quién hacía el trabajo, no del proceso.',
    metric: { value: '221', label: 'items en 5 checklists' },
    en: {
      idea:
        'The idea was born when the QA flow started growing faster than the way it was documented: every sprint phase improvised its own routine. I turned that into five navigable, self-contained checklists that turn each phase into concrete questions any QA can follow without prior context.',
      problems:
        'Refinement depended on the memory of whoever was on duty; testing varied with the day’s load; regression ended up being a rushed smoke test at the last hour. Without a single source of truth, quality depended on who did the work, not on the process.',
      metricLabel: 'items across 5 checklists'
    }
  },
  {
    slug: 'jira-trace-mapper',
    title: 'Jira Trace Mapper',
    accent: '#2bff88',
    tagline: 'De 2-3 horas de auditoría manual a 30 segundos.',
    icon: 'kanban',
    idea:
      'La idea: auditar la trazabilidad entre historias, tests y releases a mano era un examen manual de horas que solo se hacía en la semana del release. Automatice esa auditoría con un dashboard de 5 vistas sobre un pipeline de una sola orden.',
    problems:
      'Los huecos entre Story, ATP, ATR y TC se descubrían recién en la semana del release; la auditoría manual tomaba 2-3 horas por sprint.',
    metric: { value: '2-3h → 30s', label: 'auditoria de trazabilidad por sprint' },
    en: {
      tagline: 'From 2-3 hours of manual audit to 30 seconds.',
      idea:
        'The idea: auditing traceability between stories, tests and releases by hand was a hours-long manual exercise only done in release week. I automated that audit with a 5-view dashboard over a single-command pipeline.',
      problems:
        'Gaps between Story, ATP, ATR and TC only surfaced in release week; the manual audit took 2-3 hours per sprint.',
      metricLabel: 'traceability audit per sprint'
    }
  },
  {
    slug: 'agents-manager',
    title: 'Agents Manager',
    accent: '#ff3355',
    tagline: 'Cualquier arnés, desde el navegador.',
    icon: 'code',
    idea:
      'Gestionar un arnés de agentes significaba editar archivos a mano: MCPs que nadie apagaba, modelos heredados por costumbre y scripts que solo el autor sabía correr. Construi un dashboard online que lee el arnés por un canal cifrado y administra cada accion con diff, confirmacion y escritura atomica.',
    problems:
      'Los MCPs quedaban sin control, los modelos se heredaban por costumbre y los scripts eran opacos: sin panorama de lo instalado, la operacion del arnés dependia del autor.',
    metric: { value: '6 tabs', label: 'para cualquier arnés de agentes' },
    en: {
      tagline: 'Any harness, from the browser.',
      idea:
        'Managing an agent harness meant editing files by hand: MCPs nobody ever turned off, models inherited out of habit, and scripts only the author knew how to run. I built an online dashboard that reads the harness over an encrypted channel and administers every action with diff, confirmation and atomic writes.',
      problems:
        'MCPs went uncontrolled, models were inherited out of habit, and scripts were opaque: with no view of what was installed, operating the harness depended on its author.',
      metricLabel: 'for any agent harness'
    }
  }
];
