export type Lang = 'es' | 'en';

export interface Metric {
  value: string;
  label: string;
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface CaseCopy {
  title: string;
  pitch: string;
  tags: string[];
  pain: { title: string; body: string; metric: Metric };
  usage: { title: string; intro: string; items: { q: string; a: string }[] };
  demo: {
    title: string;
    intro: string;
    gallery: GalleryItem[];
    note?: string;
    embed?: { src: string; title: string };
    link?: { href: string; label: string };
  };
  kit: {
    title: string;
    intro: string;
    commands?: { cmd: string; desc: string }[];
    points: string[];
  };
  skills: { title: string; cards: { name: string; desc: string }[] };
  closing: { title: string; body: string; metrics: Metric[] };
}

export interface Stripe {
  problem: string;
  solution: string;
  result: string;
  metric: Metric;
}

export interface Project {
  slug: string;
  repo?: { url: string; label: string };
  live?: { href: string; label: string };
  content: Record<Lang, { stripe: Stripe; caseStudy: CaseCopy }>;
}

export const PROJECTS: Project[] = [
  {
    slug: 'qa-flow-checklists',
    repo: {
      url: 'https://github.com/Lucas-Nahuel-Pinto/qa-flow-checklists',
      label: 'qa-flow-checklists',
    },
    live: { href: '/checklists/', label: 'Abrir checklists' },
    content: {
      es: {
        stripe: {
          problem:
            'Cada fase del sprint improvisaba su propia rutina de QA: el refinamiento dependía de la memoria de quien estaba de guardia y el regression final era un smoke a última hora.',
          solution:
            'Cinco checklists navegables, autocontenidos, que convierten cada fase en preguntas concretas que cualquier QA puede seguir sin contexto previo.',
          result:
            '221 decisiones de QA estandarizadas, de shift-left a regression: el proceso deja de depender de quién está de turno.',
          metric: { value: '221', label: 'ítems en 5 checklists' },
        },
        caseStudy: {
          title: 'QA Flow Checklists',
          pitch:
            'Estandaricé mi flujo QA completo en cinco checklists navegables: 221 decisiones que van del pre-sprint al regression, siempre a un clic.',
          tags: ['Proceso QA', 'Shift-left', 'Estandarización'],
          pain: {
            title: 'El dolor en mi flujo QA',
            body: 'Sin checklist compartido, la calidad dependía de quién hacía el trabajo, no del proceso. El refinamiento se saltaba reglas que "todos conocían", el sprint testing variaba según la carga del día, y el regression terminaba siendo la memoria de una sola persona. Cuando esa persona no estaba, el hallazgo tampoco.',
            metric: { value: '5 rutinas distintas', label: 'por sprint, sin punto único de verdad' },
          },
          usage: {
            title: 'Cómo lo usa un QA',
            intro:
              'Cada checklist responde una pregunta concreta del flujo. Elijo la fase en la que estoy y la checklist me dice qué verificar antes de avanzar.',
            items: [
              {
                q: '¿Esta historia está lista para entrar al sprint?',
                a: 'Shift-Left Testing Checklist — 41 ítems de refinamiento: ACs testables, reglas de negocio, datos y riesgos antes de estimar.',
              },
              {
                q: '¿Estoy cubriendo todo el sprint Testing sin saltos?',
                a: 'Sprint Testing Checklist — 84 ítems: planificación, ejecución, evidencia y reporting de cada ticket en QA.',
              },
              {
                q: '¿Qué documento le dejo al equipo y con qué ROI?',
                a: 'Test Documentation Checklist — 36 ítems sobre TMS: derivar del ATS, priorizar por ROI y mantener trazabilidad.',
              },
              {
                q: '¿Qué exijo antes de firmar un test automatizado?',
                a: 'Test Automation Checklist — 30 ítems de KATA: ATCs atómicos, fixtures, selectores y sin duplicados.',
              },
              {
                q: '¿Puedo dar GO para release?',
                a: 'Regression Testing Checklist — 30 ítems de CI/CD: clasificar fallas y decidir con datos, no con coraje.',
              },
            ],
          },
          demo: {
            title: 'Demo navegable',
            intro:
              'Las cinco checklists son HTML autocontenido: se abren solas, funcionan offline y se pueden compartir por link o imprimir para auditorías.',
            gallery: [],
            link: { href: '/checklists/', label: 'Abrir el índice de checklists' },
            note: 'Verificable en vivo: cada ítm abre su checklist standalone.',
          },
          kit: {
            title: 'En mi kit de trabajo',
            intro:
              'Las checklists no son documentación decorativa: son las puertas de calidad de mi flujo. Las aplico en este orden, en cada ticket.',
            points: [
              'Pre-sprint: shift-left checklist como puerta de entrada de la historia al sprint.',
              'En QA: sprint testing checklist como guía de ejecución y evidencia por ticket.',
              'Documentación: test documentation checklist para decidir qué automatizar primero por ROI.',
              'Automatización: test automation checklist como Definition of Done del código de test.',
              'Release: regression checklist como gate de GO / CAUTION / NO-GO.',
            ],
          },
          skills: {
            title: 'Qué demuestra',
            cards: [
              {
                name: 'Estandarización de procesos',
                desc: 'Convierto rutinas dependientes de personas en procesos que cualquier QA nuevo puede seguir desde el día uno.',
              },
              {
                name: 'Shift-left testing',
                desc: 'Muevo la detección de ambigüedad a la historia: ACs testables antes de estimar, no bugs después del desarrollo.',
              },
              {
                name: 'Pensamiento por riesgo',
                desc: 'Cada fase prioriza lo que rompe el release, no una lista genérica de "probar todo".',
              },
            ],
          },
          closing: {
            title: 'Cierre',
            body: 'Cinco checklists, 221 ítems, un lenguaje común para todo el ciclo QA. El repo es público: podés abrirlos, clonarlos y adaptarlos a tu equipo.',
            metrics: [
              { value: '5', label: 'checklists navegables' },
              { value: '221', label: 'ítems totales' },
              { value: 'ES', label: 'original, autocontenido' },
            ],
          },
        },
      },
      en: {
        stripe: {
          problem:
            'Every sprint phase improvised its own QA routine: refinement relied on whoever was on duty, and the final regression was a last-minute smoke.',
          solution:
            'Five navigable, self-contained checklists that turn each phase into concrete questions any QA can follow with zero prior context.',
          result:
            '221 QA decisions standardized from shift-left to regression: quality stops depending on who is on shift.',
          metric: { value: '221', label: 'items across 5 checklists' },
        },
        caseStudy: {
          title: 'QA Flow Checklists',
          pitch:
            'I standardized my full QA flow into five navigable checklists: 221 decisions spanning pre-sprint to regression, always one click away.',
          tags: ['QA process', 'Shift-left', 'Standardization'],
          pain: {
            title: 'The pain in my QA flow',
            body: 'Without a shared checklist, quality depended on who did the work, not on the process. Refinement skipped rules "everyone knew", sprint testing varied with the day\'s load, and regression became one person\'s memory. When that person was away, the findings were away too.',
            metric: { value: '5 different routines', label: 'per sprint, no single source of truth' },
          },
          usage: {
            title: 'How a QA uses it',
            intro:
              'Each checklist answers one concrete question of the flow. I pick the phase I am in, and the checklist tells me what to verify before moving on.',
            items: [
              {
                q: 'Is this story ready to enter the sprint?',
                a: 'Shift-Left Testing Checklist — 41 refinement items: testable ACs, business rules, data and risks before estimating.',
              },
              {
                q: 'Am I covering full sprint testing with no gaps?',
                a: 'Sprint Testing Checklist — 84 items: planning, execution, evidence and reporting for every ticket in QA.',
              },
              {
                q: 'What document do I leave the team, and with what ROI?',
                a: 'Test Documentation Checklist — 36 TMS items: derive from the ATS, prioritize by ROI, keep traceability.',
              },
              {
                q: 'What do I demand before signing off an automated test?',
                a: 'Test Automation Checklist — 30 KATA items: atomic ATCs, fixtures, selectors, no duplication.',
              },
              {
                q: 'Can I call GO for release?',
                a: 'Regression Testing Checklist — 30 CI/CD items: classify failures and decide with data, not courage.',
              },
            ],
          },
          demo: {
            title: 'Navigable demo',
            intro:
              'The five checklists are self-contained HTML: they open on their own, work offline, and can be shared by link or printed for audits.',
            gallery: [],
            link: { href: '/checklists/', label: 'Open the checklists index' },
            note: 'Live proof: every item opens its standalone checklist.',
          },
          kit: {
            title: 'In my working kit',
            intro:
              'The checklists are not decorative documentation: they are the quality gates of my flow. I apply them in this order, on every ticket.',
            points: [
              'Pre-sprint: shift-left checklist as the story\'s entry gate to the sprint.',
              'In QA: sprint testing checklist as the execution and evidence guide per ticket.',
              'Documentation: test documentation checklist to decide what to automate first by ROI.',
              'Automation: test automation checklist as the Definition of Done for test code.',
              'Release: regression checklist as the GO / CAUTION / NO-GO gate.',
            ],
          },
          skills: {
            title: 'What it demonstrates',
            cards: [
              {
                name: 'Process standardization',
                desc: 'I turn person-dependent routines into a process any new QA can follow from day one.',
              },
              {
                name: 'Shift-left testing',
                desc: 'I move ambiguity detection into the story: testable ACs before estimating, not bugs after development.',
              },
              {
                name: 'Risk-based thinking',
                desc: 'Every phase prioritizes what breaks the release, not a generic "test everything" list.',
              },
            ],
          },
          closing: {
            title: 'Closing',
            body: 'Five checklists, 221 items, one common language for the whole QA cycle. The repo is public: open them, clone them, adapt them to your team.',
            metrics: [
              { value: '5', label: 'navigable checklists' },
              { value: '221', label: 'total items' },
              { value: 'ES', label: 'original, self-contained' },
            ],
          },
        },
      },
    },
  },
  {
    slug: 'jira-traceability',
    repo: {
      url: 'https://github.com/Lucas-Nahuel-Pinto/jira-traceability-manager',
      label: 'jira-traceability-manager',
    },
    content: {
      es: {
        stripe: {
          problem:
            'Auditar la trazabilidad Story↔ATP↔ATR↔TC a mano era un examen manual de horas: los huecos aparecían recién en la semana del release.',
          solution:
            'Un dashboard de 5 vistas sobre un pipeline de una sola orden: el snapshot se actualiza y las alertas muestran qué está roto hoy.',
          result:
            'De 2-3 horas de auditoría manual a un pull y 30 segundos de lectura, con alertas de huecos siempre visibles.',
          metric: { value: '2-3h → 30s', label: 'auditoría de trazabilidad por sprint' },
        },
        caseStudy: {
          title: 'Jira Traceability Manager',
          pitch:
            'Convierto auditorías manuales de trazabilidad en un dashboard de 5 vistas: qué está cubierto, qué se rompió y qué riesgo hay, en un solo pull.',
          tags: ['Trazabilidad', 'Riesgo', 'Data-driven QA'],
          pain: {
            title: 'El dolor en mi flujo QA',
            body: 'La trazabilidad vivía repartida entre Jira, Xray y hojas de cálculo. Para saber si una historia estaba realmente cubierta había que seguir links a mano, historia por historia. Los huecos —historias huérfanas, épicos vacíos, bugs sin historia— aparecían cuando alguien los necesitaba, no antes.',
            metric: { value: '2-3 horas', label: 'de auditoría manual por sprint' },
          },
          usage: {
            title: 'Cómo lo usa un QA',
            intro: 'Cada vista responde una pregunta de calidad concreta. Ninguna muestra "cómo está construido" el código: solo qué significa para el release.',
            items: [
              {
                q: '¿Qué cubre realmente cada historia?',
                a: 'Árbol — la jerarquía Épico→Historia→ATP→ATR→TC en un vistazo, con los huecos marcados.',
              },
              {
                q: '¿Dónde se rompe la cadena de trazabilidad?',
                a: 'Grafo — el vínculo real entre entidades; los nodos sin conexión salen destacados.',
              },
              {
                q: '¿Qué componentes tienen cobertura hueca?',
                a: 'Matriz — historia × componente: celdas vacías = riesgo de release, no de código.',
              },
              {
                q: '¿Qué está roto HOY?',
                a: 'Alertas — historias huérfanas, épicos vacíos, bugs sin historia y bloqueadores abiertos, siempre a la vista.',
              },
              {
                q: '¿Mejora o empeora cada sprint?',
                a: 'Métricas — cobertura, pendientes y tendencia para decidir con datos, no con sensaciones.',
              },
            ],
          },
          demo: {
            title: 'Demo navegable',
            intro:
              'Capturas del dashboard corriendo con datos sintéticos ACME (épicos, historias, bugs e alertas inventados a propósito). Los datos reales de Jira nunca se publican.',
            gallery: [
              { src: '/images/jira-traceability/arbol.png', caption: 'Árbol — qué cubre cada historia, con huecos marcados.' },
              { src: '/images/jira-traceability/grafo.png', caption: 'Grafo — dónde se rompe la cadena Story→ATP→ATR.' },
              { src: '/images/jira-traceability/matriz.png', caption: 'Matriz — cobertura historia × componente.' },
              { src: '/images/jira-traceability/alertas.png', caption: 'Alertas — huérfanos, vacíos y bloqueadores abiertos.' },
              { src: '/images/jira-traceability/metricas.png', caption: 'Métricas — tendencia de cobertura por sprint.' },
            ],
            note: 'Datos 100% sintéticos (clave ACME/DEMO): ~1k issues con alertas planteadas a propósito.',
          },
          kit: {
            title: 'En mi kit de trabajo',
            intro: 'Una sola orden refresca el snapshot; el dashboard es un archivo estático que puedo abrir, compartir o archivar por sprint.',
            commands: [
              { cmd: 'bun run trace:pull', desc: 'Descarga el snapshot de Jira/Xray' },
              { cmd: 'bun run trace:refresh', desc: 'Pull + rebuild del dashboard' },
              { cmd: 'bun run build', desc: 'Construye la app de 5 pestañas (archivo único)' },
              { cmd: 'bun test', desc: 'Pipeline con tests: validación de esquema y alertas' },
            ],
            points: [
              'Gates de calidad: schema validado con ajv antes de renderizar, alertas como reglas testeadas.',
              'Fail-safe: si el snapshot viene corrupto, el dashboard lo dice en vez de mostrar números falsos.',
              'Revisión por evidencia: cada métrica se audita contra el link original, no contra una hoja de cálculo.',
            ],
          },
          skills: {
            title: 'Qué demuestra',
            cards: [
              {
                name: 'Trazabilidad',
                desc: 'Sigo cada hallazgo hasta su historia y cada historia hasta su evidencia: la cadena completa, no un estado suelto.',
              },
              {
                name: 'Data-driven QA',
                desc: 'Las decisiones de release salen de métricas y alertas reproducibles, no de la memoria del equipo.',
              },
              {
                name: 'Riesgo antes que volumen',
                desc: 'El dashboard prioriza los huecos que rompen el release (huérfanos, vacíos, bloqueadores) sobre el conteo bruto de tests.',
              },
            ],
          },
          closing: {
            title: 'Cierre',
            body: 'De auditoría manual a una orden y 30 segundos. El repo es público (licencia MIT) y el demo corre con datos sintéticos que podés regenerar.',
            metrics: [
              { value: '5', label: 'vistas de calidad' },
              { value: '~1k', label: 'issues en el demo sintético' },
              { value: '30s', label: 'por auditoría completa' },
            ],
          },
        },
      },
      en: {
        stripe: {
          problem:
            'Auditing Story↔ATP↔ATR↔TC traceability by hand was a hours-long manual exam: the gaps only showed up in release week.',
          solution:
            'A 5-view dashboard on a single-command pipeline: the snapshot refreshes and the alerts show what is broken today.',
          result:
            'From 2-3 hours of manual audit to one pull and 30 seconds of reading, with gap alerts always visible.',
          metric: { value: '2-3h → 30s', label: 'traceability audit per sprint' },
        },
        caseStudy: {
          title: 'Jira Traceability Manager',
          pitch:
            'I turn manual traceability audits into a 5-view dashboard: what is covered, what broke and what risk exists, in a single pull.',
          tags: ['Traceability', 'Risk', 'Data-driven QA'],
          pain: {
            title: 'The pain in my QA flow',
            body: 'Traceability lived scattered across Jira, Xray and spreadsheets. Knowing whether a story was truly covered meant following links by hand, story by story. The gaps — orphan stories, empty epics, bugs without a story — showed up when someone needed them, not before.',
            metric: { value: '2-3 hours', label: 'of manual audit per sprint' },
          },
          usage: {
            title: 'How a QA uses it',
            intro: 'Each view answers one concrete quality question. None of them shows how the code is built: only what it means for the release.',
            items: [
              {
                q: 'What does each story actually cover?',
                a: 'Tree — the Epic→Story→ATP→ATR→TC hierarchy at a glance, with gaps flagged.',
              },
              {
                q: 'Where does the traceability chain break?',
                a: 'Graph — the real links between entities; unconnected nodes stand out.',
              },
              {
                q: 'Which components have hollow coverage?',
                a: 'Matrix — story × component: empty cells = release risk, not code risk.',
              },
              {
                q: 'What is broken TODAY?',
                a: 'Alerts — orphan stories, empty epics, bugs without a story and open blockers, always in sight.',
              },
              {
                q: 'Is it improving sprint over sprint?',
                a: 'Metrics — coverage, pending work and trend to decide with data, not feelings.',
              },
            ],
          },
          demo: {
            title: 'Navigable demo',
            intro:
              'Screenshots of the dashboard running on synthetic ACME data (invented epics, stories, bugs and alerts on purpose). Real Jira data is never published.',
            gallery: [
              { src: '/images/jira-traceability/arbol.png', caption: 'Tree — what each story covers, gaps flagged.' },
              { src: '/images/jira-traceability/grafo.png', caption: 'Graph — where the Story→ATP→ATR chain breaks.' },
              { src: '/images/jira-traceability/matriz.png', caption: 'Matrix — story × component coverage.' },
              { src: '/images/jira-traceability/alertas.png', caption: 'Alerts — orphans, empties and open blockers.' },
              { src: '/images/jira-traceability/metricas.png', caption: 'Metrics — coverage trend by sprint.' },
            ],
            note: '100% synthetic data (ACME/DEMO key): ~1k issues with alerts planted on purpose.',
          },
          kit: {
            title: 'In my working kit',
            intro: 'One command refreshes the snapshot; the dashboard is a static file I can open, share or archive per sprint.',
            commands: [
              { cmd: 'bun run trace:pull', desc: 'Download the Jira/Xray snapshot' },
              { cmd: 'bun run trace:refresh', desc: 'Pull + rebuild the dashboard' },
              { cmd: 'bun run build', desc: 'Build the 5-tab app (single file)' },
              { cmd: 'bun test', desc: 'Tested pipeline: schema validation and alerts' },
            ],
            points: [
              'Quality gates: schema validated with ajv before rendering, alerts as tested rules.',
              'Fail-safe: a corrupt snapshot is reported instead of rendering fake numbers.',
              'Evidence-based review: every metric audits back to its original link, not a spreadsheet.',
            ],
          },
          skills: {
            title: 'What it demonstrates',
            cards: [
              {
                name: 'Traceability',
                desc: 'I follow every finding to its story and every story to its evidence: the full chain, not a loose status.',
              },
              {
                name: 'Data-driven QA',
                desc: 'Release decisions come from reproducible metrics and alerts, not the team\'s memory.',
              },
              {
                name: 'Risk over volume',
                desc: 'The dashboard prioritizes the gaps that break the release (orphans, empties, blockers) over raw test counts.',
              },
            ],
          },
          closing: {
            title: 'Closing',
            body: 'From manual audit to one command and 30 seconds. The repo is public (MIT license) and the demo runs on synthetic data you can regenerate.',
            metrics: [
              { value: '5', label: 'quality views' },
              { value: '~1k', label: 'issues in the synthetic demo' },
              { value: '30s', label: 'per full audit' },
            ],
          },
        },
      },
    },
  },
  {
    slug: 'harness-config',
    content: {
      es: {
        stripe: {
          problem:
            'Cada sesión de agentes arrancaba con la configuración a medio armar: MCPs, claves y roles decididos a mano, y una máquina que no igualaba a la otra.',
          solution:
            '"Dos mitades, un comando": un solo comando configura el harness y asigna roles/modelos, con defaults auditables y rollback siempre disponible.',
          result:
            'Sesiones reproducibles de arranque: menos deriva entre máquinas y decisiones de modelo explícitas, no improvisadas.',
          metric: { value: '1 comando', label: 'config + roles, las dos mitades' },
        },
        caseStudy: {
          title: 'Harness Config',
          pitch:
            'Un solo comando para las dos mitades de la sesión de agentes: cómo se configura el harness y quién usa qué modelo/rol. Cero sesiones a medio configurar.',
          tags: ['Agentes', 'DX', 'Gobernanza de modelos'],
          pain: {
            title: 'El dolor en mi flujo QA',
            body: 'La configuración del agente se reinventaba por sesión: MCPs que faltaban, claves copiadas entre terminales y roles asignados "como siempre". Dos máquinas daban resultados distintos con el mismo ticket, y nadie sabía quién decidía el modelo por defecto.',
            metric: { value: '2 configuraciones', label: 'dos lugares, sin fuente única' },
          },
          usage: {
            title: 'Cómo lo usa un QA',
            intro: 'Dos mitades responden dos preguntas distintas de la sesión. El comando las resuelve juntas y deja rastro auditable.',
            items: [
              {
                q: '¿Cómo queda configurada la sesión (MCPs, tooling, proveedores)?',
                a: 'Mitad configuración — el comando aplica el setup del harness en un solo paso, con defaults versionados.',
              },
              {
                q: '¿Qué modelo y rol usa cada agente?',
                a: 'Mitad roles — asignación explícita de rol→modelo, sin adivinar quién corre con qué.',
              },
              {
                q: '¿Qué pasa si un modelo desaparece o cambia?',
                a: 'Selector con fallback — el rol cae a un modelo vigente y el cambio queda visible.',
              },
              {
                q: '¿Cómo vuelvo a un estado sano?',
                a: 'Defaults y ayuda integrados — restaurar o consultar el estado actual es parte del mismo comando.',
              },
            ],
          },
          demo: {
            title: 'Demo navegable',
            intro:
              'La presentación completa del comando, paso a paso, embebida. Las capturas de terminal muestran los flujos de sesión y roles.',
            gallery: [
              { src: '/images/harness-config/session.png', caption: 'Sesión — el comando configura el harness de punta a punta.' },
              { src: '/images/harness-config/roles.png', caption: 'Roles — asignación explícita de rol→modelo con fallback.' },
            ],
            embed: { src: '/presentations/harness-config/', title: 'Harness Config — presentación' },
            note: 'Capturas con valores de entorno redactados.',
          },
          kit: {
            title: 'En mi kit de trabajo',
            intro: 'La chuleta completa vive en la presentación; estas son las órdenes que uso cada día.',
            commands: [
              { cmd: 'bun run harness-config', desc: 'Aplica las dos mitades: config + roles' },
              { cmd: 'bun run harness-config-help', desc: 'Consulta el estado y las opciones' },
              { cmd: 'bun run harness-config-default', desc: 'Restaura los defaults versionados' },
              { cmd: 'bun run harness-config:roles:test', desc: 'Tests del selector de modelos/roles' },
            ],
            points: [
              'Gates de calidad: tests del selector de roles en cada cambio del flujo.',
              'Reversibilidad: todo estado aplicado tiene vuelta a defaults.',
              'Decisiones explícitas: el modelo por defecto se declara, no se hereda por costumbre.',
            ],
          },
          skills: {
            title: 'Qué demuestra',
            cards: [
              {
                name: 'Automatización de entornos',
                desc: 'Convierto setups manuales repetidos en comandos reproducibles con tests.',
              },
              {
                name: 'DX para QA',
                desc: 'Un comando, ayuda integrada y rollback: menos fricción entre escribir tests y correrlos.',
              },
              {
                name: 'Gobernanza de modelos',
                desc: 'Rol→modelo explícito con fallback: sé qué modelo ejecuta cada agente y por qué.',
              },
            ],
          },
          closing: {
            title: 'Cierre',
            body: 'Dos mitades, un comando, cero sesiones a medio armar. El harness vive en el boilerplate del equipo, con la presentación completa embebida aquí.',
            metrics: [
              { value: '2', label: 'mitades: config y roles' },
              { value: '1', label: 'comando para ambas' },
              { value: '0', label: 'sesiones a medio configurar' },
            ],
          },
        },
      },
      en: {
        stripe: {
          problem:
            'Every agent session started half-configured: MCPs, keys and roles assigned by hand, and one machine never matching another.',
          solution:
            '"Two halves, one command": a single command configures the harness and assigns roles/models, with auditable defaults and always-available rollback.',
          result:
            'Reproducible session startup: less drift between machines and explicit, never improvised, model decisions.',
          metric: { value: '1 command', label: 'config + roles, both halves' },
        },
        caseStudy: {
          title: 'Harness Config',
          pitch:
            'One command for both halves of the agent session: how the harness is configured and who uses which model/role. Zero half-configured sessions.',
          tags: ['Agents', 'DX', 'Model governance'],
          pain: {
            title: 'The pain in my QA flow',
            body: 'Agent configuration was reinvented every session: missing MCPs, keys copied across terminals, roles assigned "the usual way". Two machines gave different results on the same ticket, and nobody knew who decided the default model.',
            metric: { value: '2 configurations', label: 'two places, no single source' },
          },
          usage: {
            title: 'How a QA uses it',
            intro: 'The two halves answer two different session questions. The command resolves both together and leaves an auditable trace.',
            items: [
              {
                q: 'How is the session configured (MCPs, tooling, providers)?',
                a: 'Configuration half — the command applies the harness setup in one step, with versioned defaults.',
              },
              {
                q: 'Which model and role does each agent use?',
                a: 'Roles half — explicit role→model assignment, no guessing who runs what.',
              },
              {
                q: 'What happens if a model disappears or changes?',
                a: 'Selector with fallback — the role falls back to a current model and the change stays visible.',
              },
              {
                q: 'How do I get back to a healthy state?',
                a: 'Built-in defaults and help — restoring or inspecting state is part of the same command.',
              },
            ],
          },
          demo: {
            title: 'Navigable demo',
            intro:
              'The full walkthrough of the command, step by step, embedded. Terminal captures show the session and roles flows.',
            gallery: [
              { src: '/images/harness-config/session.png', caption: 'Session — the command configures the harness end to end.' },
              { src: '/images/harness-config/roles.png', caption: 'Roles — explicit role→model assignment with fallback.' },
            ],
            embed: { src: '/presentations/harness-config/', title: 'Harness Config — presentation' },
            note: 'Captures with environment values redacted.',
          },
          kit: {
            title: 'In my working kit',
            intro: 'The full cheat sheet lives in the presentation; these are the orders I run daily.',
            commands: [
              { cmd: 'bun run harness-config', desc: 'Applies both halves: config + roles' },
              { cmd: 'bun run harness-config-help', desc: 'Inspect current state and options' },
              { cmd: 'bun run harness-config-default', desc: 'Restore versioned defaults' },
              { cmd: 'bun run harness-config:roles:test', desc: 'Tests for the model/role selector' },
            ],
            points: [
              'Quality gates: role-selector tests on every flow change.',
              'Reversibility: every applied state rolls back to defaults.',
              'Explicit decisions: the default model is declared, never inherited by habit.',
            ],
          },
          skills: {
            title: 'What it demonstrates',
            cards: [
              {
                name: 'Environment automation',
                desc: 'I turn repeated manual setups into reproducible commands with tests.',
              },
              {
                name: 'QA-facing DX',
                desc: 'One command, built-in help and rollback: less friction between writing tests and running them.',
              },
              {
                name: 'Model governance',
                desc: 'Explicit role→model with fallback: I know which model runs each agent and why.',
              },
            ],
          },
          closing: {
            title: 'Closing',
            body: 'Two halves, one command, zero half-configured sessions. The harness lives in the team boilerplate, with the full presentation embedded here.',
            metrics: [
              { value: '2', label: 'halves: config and roles' },
              { value: '1', label: 'command for both' },
              { value: '0', label: 'half-configured sessions' },
            ],
          },
        },
      },
    },
  },
  {
    slug: 'harness-manager',
    repo: {
      url: 'https://github.com/Lucas-Nahuel-Pinto/harness-manager',
      label: 'harness-manager',
    },
    live: {
      href: 'https://harness-manager.lucas-pinto.workers.dev',
      label: 'Abrir el sitio en vivo',
    },
    content: {
      es: {
        stripe: {
          problem:
            'Gestionar un arnés de agentes significaba editar archivos a mano: MCPs que nadie apagaba, modelos heredados por costumbre y scripts que solo el autor sabía correr, sin panorama de lo instalado.',
          solution:
            'Un dashboard 100% online sobre un agente local sin ventana: el sitio lee el arnés por un canal cifrado y cada acción pasa por diff, confirmación y escritura atómica.',
          result:
            'Cualquier arnés se administra desde el navegador: 6 pestañas de panorama, cero puertos abiertos y los valores de .env nunca se leen.',
          metric: { value: '6 pestañas', label: 'para cualquier arnés de agentes' },
        },
        caseStudy: {
          title: 'Harness Manager',
          pitch:
            'Un panel panorámico para cualquier arnés de agentes: veo skills, comandos, agentes, MCPs y scripts desde el navegador, y ejecuto cambios seguros sin instalar una UI local.',
          tags: ['Agentes', 'Seguridad', 'Dashboard'],
          pain: {
            title: 'El dolor en mi flujo QA',
            body: 'Cada máquina tenía su arnés a su manera: skills sin registrar, MCPs de los que nadie sabía si estaban activos, agentes con modelos heredados y scripts que solo el autor sabía correr. Para saber qué había instalado había que leer archivos de configuración a mano, máquina por máquina, y cualquier cambio era un edit sin red de seguridad.',
            metric: { value: 'Cero panorama', label: 'de qué hay instalado en cada arnés' },
          },
          usage: {
            title: 'Cómo lo usa un QA',
            intro:
              'Cada pestaña responde una pregunta concreta del arnés. El sitio nunca toca archivos: el agente local aplica únicamente los cambios que yo confirmo.',
            items: [
              {
                q: '¿Qué tiene instalado mi arnés hoy?',
                a: 'Resumen — KPIs de skills, comandos, agentes, MCPs, env, scripts y registros, con health cards H-J con drill-down.',
              },
              {
                q: '¿Qué skills y comandos hay, y están registrados?',
                a: 'Skills + Comandos — tabla ordenable con tier, referencias, evaluaciones y estado de registro.',
              },
              {
                q: '¿Qué modelo corre cada agente?',
                a: 'Agents & Modelos — picker del catálogo de modelos con diff y confirmación antes de aplicar.',
              },
              {
                q: '¿Qué MCPs están activos y qué variables usan?',
                a: 'MCPs + Env — toggle de MCPs sobre la config y matriz de presencia .env.example vs .env, sin leer valores.',
              },
              {
                q: '¿Puedo correr los scripts del arnés desde acá?',
                a: 'Scripts + Registros — runner con whitelist de nombres del package.json y panel de salida.',
              },
              {
                q: '¿Cómo se conectan entre sí las piezas?',
                a: 'Grafo — grafo relacional skill→refs→scripts, agent→skills, MCP→env con iluminación por selección.',
              },
            ],
          },
          demo: {
            title: 'Demo navegable',
            intro:
              'El diagrama interactivo completo del sistema, embebido: las dos zonas (tu PC y la nube), el agente sin puertos entrantes, el relay cifrado y el modelo de acciones con diff + confirmación.',
            gallery: [],
            embed: {
              src: '/diagrams/harness-manager/',
              title: 'Harness Manager — diagrama de arquitectura',
            },
            link: { href: 'https://harness-manager.lucas-pinto.workers.dev', label: 'Abrir el sitio en vivo' },
            note: 'El diagrama es autocontenido. El sitio en vivo espera el agente local para mostrar tu arnés.',
          },
          kit: {
            title: 'En mi kit de trabajo',
            intro:
              'El flujo completo entra en cuatro órdenes, siempre desde el directorio del repo del manager:',
            commands: [
              { cmd: 'bun run agent [código]', desc: 'Agente headless: se empareja con el sitio por el relay' },
              { cmd: 'bun run pull', desc: 'Escanea el arnés y valida el snapshot (CLI de diagnóstico)' },
              { cmd: 'bun run build:online', desc: 'Build de la UI para el origen alojado' },
              { cmd: 'bun run repo:check', desc: 'Gate completo: formato, lint, tipos y tests' },
            ],
            points: [
              'Acciones con red de seguridad: diff a la vista, confirmación explícita, escritura atómica y rescan automático.',
              'Conexión saliente únicamente: el agente abre una sola conexión al relay; sin puertos entrantes ni cambios de firewall.',
              'Secretos fuera del snapshot: .env se lee por presencia, nunca por valor, y los frames viajan cifrados de extremo a extremo.',
            ],
          },
          skills: {
            title: 'Qué demuestra',
            cards: [
              {
                name: 'Arquitectura con seguridad de diseño',
                desc: 'El relay es un ciego que solo reenvía: claves, códigos y rutas nunca salen del canal cifrado.',
              },
              {
                name: 'Automatización de harness',
                desc: 'Convierto la gestión manual de cualquier arnés en un panel reproducible, con tests de por medio.',
              },
              {
                name: 'DX con confirmación',
                desc: 'Ningún cambio escribe a ciegas: toda acción muestra su diff y espera mi OK antes de tocar un archivo.',
              },
            ],
          },
          closing: {
            title: 'Cierre',
            body: 'Seis pestañas, un agente sin ventana y un relay que no ve nada: cualquier arnés se administra desde el navegador sin bajar la guardia.',
            metrics: [
              { value: '6', label: 'pestañas de panorama' },
              { value: '0', label: 'puertos abiertos en tu PC' },
              { value: '100%', label: 'acciones con diff + confirmación' },
            ],
          },
        },
      },
      en: {
        stripe: {
          problem:
            'Managing an agent harness meant editing files by hand: MCPs nobody ever disabled, models inherited by habit, and scripts only the author knew how to run, with no view of what was installed.',
          solution:
            'A 100% online dashboard on top of a windowless local agent: the site reads the harness over an encrypted channel, and every action goes through diff, confirmation and atomic write.',
          result:
            'Any harness gets administered from the browser: 6 panorama tabs, zero open ports, and .env values are never read.',
          metric: { value: '6 tabs', label: 'for any agent harness' },
        },
        caseStudy: {
          title: 'Harness Manager',
          pitch:
            'A panoramic dashboard for any agent harness: I see skills, commands, agents, MCPs and scripts from the browser, and run safe changes without installing a local UI.',
          tags: ['Agents', 'Security', 'Dashboard'],
          pain: {
            title: 'The pain in my QA flow',
            body: 'Every machine had its harness its own way: unregistered skills, MCPs nobody knew were active, agents with inherited models, and scripts only the author could run. Knowing what was installed meant reading config files by hand, machine by machine, and every change was an edit with no safety net.',
            metric: { value: 'Zero panorama', label: 'of what is installed in each harness' },
          },
          usage: {
            title: 'How a QA uses it',
            intro:
              'Each tab answers one concrete harness question. The site never touches files: the local agent applies only the changes I confirm.',
            items: [
              {
                q: 'What does my harness have installed today?',
                a: 'Summary — KPIs for skills, commands, agents, MCPs, env, scripts and registries, with clickable H-J health cards.',
              },
              {
                q: 'Which skills and commands exist, and are they registered?',
                a: 'Skills + Commands — sortable table with tier, references, evals and registration state.',
              },
              {
                q: 'Which model runs each agent?',
                a: 'Agents & Models — model catalog picker with diff and confirmation before applying.',
              },
              {
                q: 'Which MCPs are active and which variables do they use?',
                a: 'MCPs + Env — MCP toggles over config and a .env.example vs .env presence matrix, values never read.',
              },
              {
                q: 'Can I run the harness scripts from here?',
                a: 'Scripts + Registries — runner whitelisted to package.json names, with an output pane.',
              },
              {
                q: 'How do the pieces connect to each other?',
                a: 'Graph — relational graph of skill→refs→scripts, agent→skills, MCP→env with selection illumination.',
              },
            ],
          },
          demo: {
            title: 'Navigable demo',
            intro:
              'The full interactive architecture diagram, embedded: the two zones (your PC and the cloud), the portless agent, the encrypted relay, and the diff + confirmation action model.',
            gallery: [],
            embed: {
              src: '/diagrams/harness-manager/',
              title: 'Harness Manager — architecture diagram',
            },
            link: { href: 'https://harness-manager.lucas-pinto.workers.dev', label: 'Open the live site' },
            note: 'The diagram is self-contained. The live site waits for the local agent to show your harness.',
          },
          kit: {
            title: 'In my working kit',
            intro: 'The whole flow fits in four commands, always from the manager repo directory:',
            commands: [
              { cmd: 'bun run agent [code]', desc: 'Headless agent: pairs with the site through the relay' },
              { cmd: 'bun run pull', desc: 'Scans the harness and validates the snapshot (diagnostic CLI)' },
              { cmd: 'bun run build:online', desc: 'UI build for the hosted origin' },
              { cmd: 'bun run repo:check', desc: 'Full gate: format, lint, types and tests' },
            ],
            points: [
              'Actions with a safety net: diff on screen, explicit confirmation, atomic write and automatic re-scan.',
              'Outbound-only connection: the agent opens a single connection to the relay; no inbound ports, no firewall changes.',
              'Secrets out of the snapshot: .env is read by presence, never by value, and frames travel end-to-end encrypted.',
            ],
          },
          skills: {
            title: 'What it demonstrates',
            cards: [
              {
                name: 'Security-by-design architecture',
                desc: 'The relay is a blind courier that only forwards: keys, codes and paths never leave the encrypted channel.',
              },
              {
                name: 'Harness automation',
                desc: 'I turn manual management of any harness into a reproducible panel, with tests in the middle.',
              },
              {
                name: 'Confirmation-first DX',
                desc: 'No change writes blindly: every action shows its diff and waits for my OK before touching a file.',
              },
            ],
          },
          closing: {
            title: 'Closing',
            body: 'Six tabs, a windowless agent and a blind relay: any harness administered from the browser without lowering the guard.',
            metrics: [
              { value: '6', label: 'panorama tabs' },
              { value: '0', label: 'open ports on your PC' },
              { value: '100%', label: 'actions with diff + confirmation' },
            ],
          },
        },
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
