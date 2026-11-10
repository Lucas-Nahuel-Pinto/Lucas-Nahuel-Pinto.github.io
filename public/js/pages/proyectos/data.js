/** Copy shown in the carousel slides and in the detail section. */
export const PROJECTS = [
  {
    slug: 'qa-flow-checklists',
    title: 'QA Flow Checklists',
    accent: '#facc15',
    tagline: '221 decisiones de QA, de shift-left a regression.',
    icon: 'clipboard',
    idea:
      'La idea nació cuando el flujo de QA empezó a crecer más rápido que la forma de documentarlo: cada fase del sprint improvisaba su rutina. Convertí eso en cinco checklists navegables, autocontenidos, que convierten cada fase en preguntas concretas que cualquier QA puede seguir sin contexto previo.',
    problems:
      'El refinamiento dependía de la memoria de quien estaba de guardia; el testing variaba según la carga del día; la regression terminaba siendo un smoke a última hora. Sin punto único de verdad, la calidad dependía de quién hacía el trabajo, no del proceso.',
    metric: { value: '221', label: 'items en 5 checklists' }
  },
  {
    slug: 'jira-traceability',
    title: 'Jira Traceability Manager',
    accent: '#2bff88',
    tagline: 'De 2-3 horas de auditoría manual a 30 segundos.',
    icon: 'kanban',
    idea:
      'La idea: auditar la trazabilidad entre historias, tests y releases a mano era un examen manual de horas que solo se hacía en la semana del release. Automatice esa auditoría con un dashboard de 5 vistas sobre un pipeline de una sola orden.',
    problems:
      'Los huecos entre Story, ATP, ATR y TC se descubrían recién en la semana del release; la auditoría manual tomaba 2-3 horas por sprint.',
    metric: { value: '2-3h → 30s', label: 'auditoria de trazabilidad por sprint' }
  },
  {
    slug: 'harness-manager',
    title: 'Harness Manager',
    accent: '#ff3355',
    tagline: 'Cualquier arnés, desde el navegador.',
    icon: 'code',
    idea:
      'Gestionar un arnés de agentes significaba editar archivos a mano: MCPs que nadie apagaba, modelos heredados por costumbre y scripts que solo el autor sabía correr. Construi un dashboard online que lee el arnés por un canal cifrado y administra cada accion con diff, confirmacion y escritura atomica.',
    problems:
      'Los MCPs quedaban sin control, los modelos se heredaban por costumbre y los scripts eran opacos: sin panorama de lo instalado, la operacion del arnés dependia del autor.',
    metric: { value: '6 tabs', label: 'para cualquier arnés de agentes' }
  }
];
