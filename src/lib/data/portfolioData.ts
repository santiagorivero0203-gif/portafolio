export interface ProjectModule {
	name: string;
	detail: string;
}

export interface Project {
	id: string;
	title: string;
	subtitle: string;
	category:
		| 'IA & Computer Vision'
		| 'Game Dev & Shaders'
		| 'Enterprise SaaS'
		| 'Simulación & Física'
		| 'Productividad & Cloud';
	accessType: 'public' | 'explanatory';
	featuredBadge?: string;
	shortDescription: string;
	fullOverview: string;
	architectureDetails: string;
	role: string;
	technologies: string[];
	keyFeatures: string[];
	thumbnailUrl: string;
	videoPreviewUrl?: string;
	galleryUrls: string[];
	teamPhotos?: { url: string; caption: string }[];
	internalModules?: ProjectModule[];
	liveUrl?: string;
	repoUrl?: string;
	privacyNote?: string;
}

export interface Certificate {
	id: string;
	title: string;
	issuer: string;
	date: string;
	location?: string;
	credentialCode?: string;
	category: string;
	description: string;
	imageUrl: string;
	highlights?: string[];
}

export interface TeamAndResearchItem {
	id: string;
	title: string;
	context: string;
	role: string;
	period: string;
	summary: string;
	collaborators?: string[];
	methods?: string[];
	imageUrl?: string;
	imageCaption: string;
}

export interface RecommendationItem {
	id: string;
	group: 'Cliente / Entorno Comercial' | 'Equipo & Colaboradores' | 'Mentores & Profesores';
	authorName: string;
	authorRole: string;
	organization: string;
	quote: string;
	highlightContext: string;
	verified: boolean;
}

export interface VerifiableProofItem {
	id: string;
	kind: string;
	title: string;
	entity: string;
	evidence: string;
	summary: string;
	actionLabel?: string;
	actionHref?: string;
}

export interface PersonalTouchItem {
	id: string;
	title: string;
	tag: string;
	description: string;
	details: string[];
}

export interface VideoEditReelItem {
	id: string;
	title: string;
	focus: string;
	description: string;
	duration: string;
	videoUrl?: string;
}

export interface StackGroup {
	id: string;
	title: string;
	description: string;
	items: {
		name: string;
		level: string;
	}[];
}

export const santiagoProfile = {
	fullName: 'Santiago Alfonso Rivero Méndez',
	displayName: 'Santiago Rivero',
	handle: '@SR Developer',
	tiktokHandle: '@santi.arm_dev',
	badgeCode: 'SANTIAGO RIVERO // UCV',
	location: 'Caracas, Venezuela',
	headline: 'Desarrollador de Software & Estudiante de Física (1er Semestre, UCV)',
	statusBadge: 'Estudiante de Física UCV (1er Semestre) · Desarrollador de Software',
	dynamicRoles: [
		'Software Developer & Creative Engineer',
		'Estudiante de Física en la UCV (1er Semestre)',
		'IA, Visión Artificial & Videojuegos 2D',
		'Ecosistema de IA de Google & Sistemas Web'
	],
	heroTitle: 'Ingeniería de software, física y comunicación clara.',
	heroBio:
		'Construyo software aplicado: visión artificial en tiempo real, motores 2D con shaders GLSL y plataformas web en producción. Actualmente inicio el 1er semestre de la Licenciatura en Física en la UCV, combinando pensamiento analítico, ecosistema de IA de Google y comunicación clara.',
	aboutBio: [
		'Actualmente curso el 1er semestre de la Licenciatura en Física en la Universidad Central de Venezuela (UCV — Facultad de Ciencias). Me gradué como Bachiller con altas calificaciones en el Colegio Nuestra Señora de la Consolación (Las Palmas, Caracas).',
		'Aunque estoy dando mis primeros pasos en la universidad, llevo tiempo aplicando lógica matemática, vectores, programación gráfica e inteligencia artificial para construir software real: desde traducir lengua de señas en vivo a 60 FPS con MOVA hasta controlar inventario por consignación.',
		'Creo que el código sólido necesita saberse comunicar. Mi formación en Oratoria y Comunicación Persuasiva en la UCV, junto al uso profesional del ecosistema de IA de Google, impulsan la forma en que diseño, lidero y defiendo cada proyecto.'
	],
	kuriosNarrative:
		'El 21 de marzo de 2026 obtuvimos el 1er lugar en la categoría U-Code de la Kurios Competition 2026 (Torneo Nacional de Robótica y Tecnología) con The Last Endo. Coordiné la arquitectura del juego bajo presión y presenté la defensa técnica frente al jurado.',
	videoEditingSummary:
		'Edición básica de video en CapCut orientada a demos de software, presentaciones de proyectos y clips cortos (@santi.arm_dev): cortes limpios, ritmo claro y explicación visual directa.',
	email: 'santiago.rivero0203@gmail.com',
	altEmail: 'santiagoo.rivero0203@gmail.com',
	socials: {
		github: 'https://github.com/santiagorivero0203-gif',
		portfolioRepo: 'https://github.com/santiagorivero0203-gif/portafolio',
		linkedin: undefined as string | undefined,
		tiktok: 'https://www.tiktok.com/@santi.arm_dev'
	},
	stats: [
		{
			id: 'projects-stat',
			value: '6',
			label: 'Proyectos documentados',
			detail: 'IA, SaaS B2B, Videojuegos 2D y Simulaciones'
		},
		{
			id: 'kurios-stat',
			value: '1er lugar',
			label: 'Kurios Competition 2026',
			detail: 'Categoría U-Code · 21 de marzo de 2026'
		},
		{
			id: 'ucv-stat',
			value: '1er Sem.',
			label: 'Física en la UCV',
			detail: 'Facultad de Ciencias · Inicio de carrera'
		}
	],
	educationAndMilestones: [
		{
			id: 'ucv-physics',
			period: '1er Semestre',
			title: 'Licenciatura en Física (En curso)',
			institution: 'Universidad Central de Venezuela (UCV) — Facultad de Ciencias',
			description:
				'Estudiante de primer semestre iniciando la formación universitaria en física y matemáticas, con enfoque en simulación computacional y software científico.'
		},
		{
			id: 'oratoria-ucv',
			period: '7 nov 2026',
			title: 'Oratoria y Comunicación Persuasiva',
			institution: 'CEP · FACES — Universidad Central de Venezuela (UCV)',
			description:
				'Curso teórico-práctico en la Ciudad Universitaria de Caracas (Registro N° 000427) enfocado en estructuración de discurso, argumentación técnica y manejo escénico.'
		},
		{
			id: 'kurios-2026',
			period: '21 mar 2026',
			title: '1er Lugar — Kurios Competition 2026 (Categoría U-Code)',
			institution: 'Kurios Education · BNC (Espacio Caracas, C.C. Líder)',
			description:
				'Lead Software Developer y portavoz del videojuego 2D "The Last Endo" en el Torneo Nacional de Robótica y Tecnología 2026, integrando arquitectura de software y defensa oral ante jurado.'
		},
		{
			id: 'bachiller',
			period: 'Graduado',
			title: 'Bachiller de la República',
			institution: 'Colegio Nuestra Señora de la Consolación (Las Palmas, Caracas)',
			description:
				'Bachiller graduado con altas calificaciones, consolidando una base sólida en matemáticas, ciencias y programación antes de ingresar a la UCV.'
		}
	]
};

export const featuredProjects: Project[] = [
	{
		id: 'mova',
		title: 'MOVA',
		subtitle: 'Interpretación de lengua de señas en tiempo real con visión artificial',
		category: 'IA & Computer Vision',
		accessType: 'public',
		featuredBadge: 'IA · Visión Artificial',
		shortDescription:
			'Aplicación multiplataforma que procesa video desde la cámara del dispositivo para rastrear 21 nodos por mano y traducir señas en tiempo real sin servidores externos.',
		fullOverview:
			'MOVA procesa el flujo de cámara directamente en el dispositivo (Edge AI) para interpretar lengua de señas con baja latencia. El objetivo fue lograr detección estable aunque el usuario se acerque, se aleje o cambie el ángulo frente a la cámara.',
		architectureDetails:
			'Extrae 21 puntos tridimensionales por mano en cada fotograma usando MediaPipe HandLandmarker sobre WebAssembly y WebGL. La normalización geométrica corre en un módulo propio de álgebra vectorial (VectorMath.js) que calcula ángulos relativos e invariancia de escala antes de clasificar el gesto, empaquetado para móvil mediante CapacitorJS.',
		role: 'Creador y Desarrollador Principal',
		technologies: [
			'MediaPipe HandLandmarker (WASM/WebGL)',
			'VectorMath.js',
			'TypeScript',
			'CapacitorJS',
			'Diseño Editorial MOVA'
		],
		keyFeatures: [
			'Tracking biomecánico de 21 nodos por mano a 60 FPS directamente en navegador y dispositivo móvil.',
			'Motor de álgebra vectorial con cálculo de ángulos articulares e invariancia de escala respecto a la cámara.',
			'Interfaz minimalista de contraste controlado centrada en lectura rápida.',
			'Empaquetado híbrido nativo mediante CapacitorJS.'
		],
		thumbnailUrl: '/images/projects/mova/cover.webp',
		videoPreviewUrl: '/videos/projects/mova/preview.mp4',
		galleryUrls: ['/images/projects/mova/01.webp', '/images/projects/mova/02.webp']
	},
	{
		id: 'the-last-endo',
		title: 'The Last Endo',
		subtitle: 'Videojuego 2D — 1er Lugar Kurios Competition 2026 (Categoría U-Code)',
		category: 'Game Dev & Shaders',
		accessType: 'public',
		featuredBadge: '1er Lugar Kurios 2026',
		shortDescription:
			'Videojuego 2D ganador del 1er lugar en la categoría U-Code del Torneo Nacional de Robótica y Tecnología Kurios 2026 (21 de marzo de 2026), donde lideré la programación y el pitch.',
		fullOverview:
			'Desarrollado para competir en la categoría U-Code de la Kurios Competition 2026 (Espacio Caracas, C.C. Líder). El reto no fue solo programar mecánicas sólidas, sino coordinar al equipo bajo límite de tiempo y defender la arquitectura ante el jurado evaluador.',
		architectureDetails:
			'Máquina de estados finitos para el control del jugador, bucle principal con detección precisa de colisiones, sistema de progresión y pulido de respuesta (game feel), articulando la entrega continua entre código, arte y diseño de niveles.',
		role: 'Lead Software Developer & Pitch Speaker',
		technologies: [
			'Arquitectura 2D',
			'Máquinas de Estado',
			'Colisiones & Game Feel',
			'Liderazgo Técnico & Pitch'
		],
		keyFeatures: [
			'1er Lugar en la categoría U-Code de la Kurios Competition 2026 (21 de marzo de 2026).',
			'Coordinación técnica del flujo entre programación, arte y diseño de niveles bajo presión.',
			'Defensa oral estructurada de la propuesta técnica frente al panel de jueces.',
			'Registro fotográfico del equipo durante la competencia y la premiación.'
		],
		thumbnailUrl: '/images/projects/the-last-endo/cover.webp',
		galleryUrls: ['/images/projects/the-last-endo/01.webp', '/images/projects/the-last-endo/02.webp'],
		teamPhotos: [
			{
				url: '/images/teams/kurios-2026-01.webp',
				caption: 'Equipo de The Last Endo en Kurios Competition 2026 (Categoría U-Code)'
			}
		]
	},
	{
		id: 'invoficlib-girastock',
		title: 'Invoficlib Project (GiraStock)',
		subtitle: 'Sistema comercial de inventario y consignación para Editorial Girasol',
		category: 'Enterprise SaaS',
		accessType: 'public',
		featuredBadge: 'Producción Comercial',
		shortDescription:
			'Plataforma web construida a medida para Editorial Girasol para controlar existencias en almacén, distribución de títulos y mercancía en régimen de consignación.',
		fullOverview:
			'Editorial Girasol necesitaba diferenciar en todo momento los libros físicos en depósito de los ejemplares distribuidos en consignación a librerías y clientes. Invoficlib (GiraStock) centraliza ese flujo operativo para reducir errores de conteo y agilizar cierres.',
		architectureDetails:
			'Modelo de estados transaccionales que separa inventario en depósito de stock consignado por cliente, automatizando cortes de cuenta, devoluciones, conciliaciones y búsqueda instantánea para operadores administrativos.',
		role: 'Arquitecto Frontend & Full-Stack',
		technologies: [
			'TypeScript',
			'Base de Datos Cloud',
			'Gestión de Estados de Inventario',
			'UX Administrativa'
		],
		keyFeatures: [
			'Trazabilidad separada entre inventario en almacén y ejemplares entregados en consignación.',
			'Módulo de liquidación de cortes de cuenta, ventas netas, devoluciones y reposiciones.',
			'Panel operativo con métricas actualizadas y búsqueda rápida.',
			'Diseñado junto a operadores administrativos reales de Editorial Girasol.'
		],
		thumbnailUrl: '/images/projects/invoficlib-girastock/cover.webp',
		galleryUrls: [
			'/images/projects/invoficlib-girastock/01.webp',
			'/images/projects/invoficlib-girastock/02.webp'
		]
	},
	{
		id: 'be-a-legend',
		title: 'Be A Legend',
		subtitle: 'Action-RPG 2D con shaders GLSL sobre WebGL2 y pipeline Aseprite',
		category: 'Game Dev & Shaders',
		accessType: 'public',
		featuredBadge: 'WebGL2 & GLSL',
		shortDescription:
			'Videojuego 2D de acción y rol con motor modular en TypeScript, iluminación dinámica escrita en GLSL sobre WebGL2 y sprites trabajados cuadro a cuadro en Aseprite.',
		fullOverview:
			'Be A Legend combina pixel art artesanal con un pipeline propio de renderizado en GPU, permitiendo efectos atmosféricos, luces dinámicas e impactos sin sacrificar rendimiento ni control sobre el frame.',
		architectureDetails:
			'Renderizador WebGL2 en TypeScript con programas GLSL personalizados de vértices y fragmentos, integrado con hojas de sprites exportadas desde Aseprite, hitboxes por frame y un sistema de combate modular desacoplado.',
		role: 'Creador, Programador Gráfico & Gameplay',
		technologies: [
			'WebGL2',
			'GLSL Shaders',
			'TypeScript',
			'Aseprite Pipeline',
			'Combate Modular'
		],
		keyFeatures: [
			'Renderizado 2D acelerado por GPU con shaders de iluminación y distorsión en GLSL.',
			'Combate modular desacoplado para estados, combos, hitboxes por frame e IA enemiga.',
			'Integración directa de spritesheets y animaciones desde Aseprite.',
			'Aplicación práctica de trigonometría, vectores y cinemática al gameplay.'
		],
		thumbnailUrl: '/images/projects/be-a-legend/cover.webp',
		galleryUrls: ['/images/projects/be-a-legend/01.webp']
	},
	{
		id: 'simulacion-simadi',
		title: 'Simulación SIMADI',
		subtitle: 'Modelado algorítmico y simulación discreta de reglas operativas',
		category: 'Simulación & Física',
		accessType: 'explanatory',
		featuredBadge: 'Inmersión Interna',
		shortDescription:
			'Simulador computacional que traduce reglas operativas, restricciones de asignación y dinámica de oferta y demanda de un esquema cambiario en una interfaz analítica.',
		fullOverview:
			'Este proyecto aplica modelado cuantitativo y lógica discreta a la simulación de un sistema económico reglado. Permite variar condiciones iniciales para observar estabilidad, cuellos de botella y trayectorias por ciclo.',
		architectureDetails:
			'Motor por ciclos discretos que combina reglas deterministas y perturbaciones acotadas sobre oferta, demanda y tasas de referencia, registrando variables de estado en cada iteración para graficar su evolución.',
		role: 'Arquitecto del Modelo & Desarrollador',
		technologies: [
			'Modelado Algorítmico',
			'Simulación Discreta',
			'Lógica Matemática',
			'Visualización de Datos'
		],
		keyFeatures: [
			'Traducción de restricciones normativas y matemáticas en reglas de transición verificables.',
			'Flujo algorítmico inspeccionable por etapas dentro de esta vista interna.',
			'Análisis comparativo de sensibilidad al variar parámetros de oferta, demanda y liquidez.',
			'Puente práctico entre pensamiento analítico, simulación y software interactivo.'
		],
		internalModules: [
			{
				name: 'Parámetros y Restricciones Iniciales',
				detail: 'Define bandas de tasa, volúmenes de oferta/demanda disponibles y topes operativos por participante.'
			},
			{
				name: 'Motor de Cruce por Ciclo',
				detail: 'Evalúa condiciones de equilibrio parcial, asigna órdenes válidas y actualiza el remanente por iteración.'
			},
			{
				name: 'Trazabilidad y Salida Gráfica',
				detail: 'Registra serie temporal de tasa resultante, demanda insatisfecha y métricas por corrida.'
			}
		],
		thumbnailUrl: '/images/projects/simulacion-simadi/cover.webp',
		galleryUrls: [
			'/images/projects/simulacion-simadi/01.webp',
			'/images/projects/simulacion-simadi/02.webp'
		],
		privacyNote:
			'Proyecto de modelado interno y carácter académico. Su lógica algorítmica y flujo de ejecución se documentan dentro de esta vista sin enlaces externos.'
	},
	{
		id: 'app-productividad',
		title: 'App de Productividad y Ecosistema Académico Personal',
		subtitle: 'Gestión universitaria UCV, LaTeX, IA, Pomodoro y widgets iOS',
		category: 'Productividad & Cloud',
		accessType: 'explanatory',
		featuredBadge: 'Uso Privado · iOS + Supabase',
		shortDescription:
			'Sistema privado construido para organizar mi inicio en Física en la UCV: sincroniza Supabase en tiempo real, guías de estudio en LaTeX, bloques Pomodoro y widgets en la pantalla de inicio de iPhone.',
		fullOverview:
			'Diseñado para uso diario desde el primer semestre en la Facultad de Ciencias de la UCV. Centraliza ponderaciones de materias, calendario de evaluaciones, descomposición de guías de estudio con IA y consulta rápida desde iOS sin abrir el navegador.',
		architectureDetails:
			'Backend sobre Supabase (PostgreSQL + API REST) conectado a la aplicación web de estudio y a un widget nativo en iOS vía Scriptable. Procesa contenidos mediante una cola de IA para generar material estructurado en 7 pilares con notación LaTeX.',
		role: 'Arquitecto y Desarrollador Único',
		technologies: [
			'Supabase (PostgreSQL)',
			'iOS Scriptable Widgets',
			'Renderizado LaTeX',
			'Desglose IA & Pomodoro',
			'TypeScript'
		],
		keyFeatures: [
			'Base en Supabase con calendario de evaluaciones, ponderación académica (parciales, quizzes, entregas) y cola IA.',
			'Deconstrucción de estudio en 7 pilares: teoría en LaTeX, método Cornell, glosario, ejercicios paso a paso, alertas de examen, flashcards y diagnóstico de brechas (<60%).',
			'División de tareas complejas en subtareas concretas con estimación en bloques Pomodoro de 25 minutos.',
			'Sincronización directa por API con Widget iOS (Scriptable) para ver pendientes y próximos exámenes en la pantalla de bloqueo/inicio.'
		],
		internalModules: [
			{
				name: 'Núcleo Cloud en Supabase',
				detail: 'PostgreSQL + API REST para asignaturas, ponderaciones, entregas pendientes y cola de procesamiento IA.'
			},
			{
				name: 'Deconstrucción en 7 Pilares & LaTeX',
				detail: 'Teoría matemática en LaTeX, método Cornell, glosario, resolución guiada, alertas, flashcards y detección de debilidades por debajo del 60%.'
			},
			{
				name: 'Planificador Pomodoro & Widget iOS',
				detail: 'Subdivisión en bloques de 25 min y consumo directo en iPhone mediante script de Scriptable.'
			}
		],
		thumbnailUrl: '/images/projects/app-productividad/cover.webp',
		galleryUrls: [
			'/images/projects/app-productividad/01.webp',
			'/images/projects/app-productividad/02.webp'
		],
		privacyNote:
			'Herramienta de uso personal conectada a mi entorno privado de estudio e infraestructura en tiempo real. Se presenta su arquitectura y flujo interno por privacidad de datos.'
	}
];

export const certificatesData: Certificate[] = [
	{
		id: 'kurios-2026-ucode',
		title: '1er Lugar — Kurios Competition 2026 (Categoría U-Code)',
		issuer: 'Kurios Education · BNC',
		date: '21 de marzo de 2026',
		location: 'Espacio Caracas, C.C. Líder',
		credentialCode: 'Torneo Nacional de Robótica y Tecnología 2026',
		category: 'Competencia Tecnológica & Liderazgo',
		description:
			'Reconocimiento al 1er lugar en el Torneo Nacional de Robótica y Tecnología Kurios Competition 2026 en la categoría U-Code, obtenido liderando el desarrollo y la defensa oral del videojuego 2D "The Last Endo".',
		imageUrl: '/images/certificates/kurios-2026-primer-lugar.webp',
		highlights: [
			'Lead Software Developer y portavoz principal del equipo en The Last Endo',
			'Firmado por Mariana González y José Balza (Directores, Kurios Education)',
			'Realizado el 21 de marzo de 2026 en Espacio Caracas, C.C. Líder'
		]
	},
	{
		id: 'oratoria-persuasion',
		title: 'Oratoria y Comunicación Persuasiva',
		issuer: 'CEP · FACES · Universidad Central de Venezuela (UCV)',
		date: '7 de noviembre de 2026',
		location: 'Ciudad Universitaria de Caracas',
		credentialCode: 'Registro N° 000427 · 8 horas académicas teórico-prácticas',
		category: 'Comunicación, Pitch & Liderazgo',
		description:
			'Certificado otorgado por el Centro de Extensión Profesional de la Facultad de Ciencias Económicas y Sociales (FACES-UCV) por completar el curso de Oratoria y Comunicación Persuasiva.',
		imageUrl: '/images/certificates/oratoria-persuasion.webp',
		highlights: [
			'Estructuración persuasiva de discursos y defensas técnicas ante jurados',
			'Avalado por el Dr. Alfredo Ordoñez (Director CEP-FACES-UCV) y Rubén Jiménez (Facilitador)',
			'Registro verificable N° 000427 dictado en la Ciudad Universitaria de Caracas'
		]
	},
	{
		id: 'python-intl',
		title: 'Certificado de Python Avalado Internacionalmente',
		issuer: 'Aval Internacional Verificado',
		date: '2025 - 2026',
		category: 'Ingeniería de Software & Algoritmos',
		description:
			'Acredita dominio de Python, lógica algorítmica, estructuras de datos, programación modular, automatización y fundamentos para ciencia de datos e inteligencia artificial.',
		imageUrl: '/images/certificates/python-international.webp',
		highlights: [
			'Estructuras de datos, programación modular y lógica algorítmica',
			'Automatización y fundamentos para ciencia de datos e IA',
			'Base aplicada en simulaciones computacionales y herramientas de análisis'
		]
	}
];

export const teamAndResearchData: TeamAndResearchItem[] = [
	{
		id: 'kurios-2026-team',
		title: 'Equipo The Last Endo — Kurios Competition 2026',
		context: '1er Lugar · Categoría U-Code',
		role: 'Lead Software Developer & Pitch Speaker',
		period: '21 de marzo de 2026',
		summary:
			'Coordinación técnica del desarrollo del videojuego 2D bajo exigencia competitiva y exposición oral ante el panel evaluador en Espacio Caracas, C.C. Líder.',
		methods: [
			'Arquitectura modular e integración continua entre código, arte y niveles',
			'Defensa técnica estructurada con técnicas de oratoria y persuasión'
		],
		imageUrl: '/images/teams/kurios-2026-01.webp',
		imageCaption: 'Equipo de The Last Endo en Kurios Competition 2026 — Categoría U-Code'
	},
	{
		id: 'mova-vision-project',
		title: 'MOVA — Visión Artificial y Accesibilidad',
		context: 'IA en Tiempo Real & Ingeniería de Producto',
		role: 'Creador y Desarrollador Principal',
		period: 'Proyecto Activo',
		summary:
			'Aplicación multiplataforma diseñada para interpretar lengua de señas en tiempo real directamente desde la cámara del dispositivo, combinando MediaPipe (WASM/WebGL) con un motor propio de álgebra vectorial (VectorMath.js).',
		methods: [
			'Tracking biomecánico de 21 nodos por mano a 60 FPS sin depender de servidores externos',
			'Normalización geométrica invariante a escala y empaquetado móvil híbrido con CapacitorJS'
		],
		imageUrl: '/images/projects/mova/cover.webp',
		imageCaption: 'MOVA — Interpretación de lengua de señas con visión artificial en tiempo real'
	}
];

export const verifiableProofData: VerifiableProofItem[] = [
	{
		id: 'proof-kurios',
		kind: 'Competencia Tecnológica',
		title: '1er Lugar Kurios Competition 2026 (U-Code)',
		entity: 'Kurios Education · BNC',
		evidence: '21 de marzo de 2026 · Espacio Caracas, C.C. Líder',
		summary:
			'Premio obtenido con The Last Endo tras coordinar el desarrollo del código y defender la solución frente al jurado evaluador.',
		actionLabel: 'Ver caso The Last Endo',
		actionHref: '/proyectos/the-last-endo'
	},
	{
		id: 'proof-mova',
		kind: 'IA & Visión Artificial',
		title: 'MOVA — Interpretación de Lengua de Señas',
		entity: 'Proyecto Propio · Edge AI Multiplataforma',
		evidence: 'MediaPipe HandLandmarker (WASM/WebGL) + VectorMath.js a 60 FPS',
		summary:
			'Sistema en tiempo real capaz de rastrear 21 nodos por mano y normalizar ángulos articulares directamente en navegador y dispositivo móvil.',
		actionLabel: 'Ver caso MOVA',
		actionHref: '/proyectos/mova'
	},
	{
		id: 'proof-girasol',
		kind: 'Implementación B2B',
		title: 'Sistema Invoficlib (GiraStock)',
		entity: 'Editorial Girasol',
		evidence: 'Software comercial en operación',
		summary:
			'Plataforma desarrollada a medida para separar inventario en almacén de libros entregados en consignación y automatizar cortes de cuenta.',
		actionLabel: 'Explorar arquitectura',
		actionHref: '/proyectos/invoficlib-girastock'
	},
	{
		id: 'proof-cep-ucv',
		kind: 'Credencial Académica',
		title: 'Oratoria y Comunicación Persuasiva',
		entity: 'CEP · FACES · Universidad Central de Venezuela',
		evidence: 'Registro N° 000427 · 7 de noviembre de 2026',
		summary:
			'Certificación teórico-práctica en comunicación efectiva y argumentación dictada en la Ciudad Universitaria de Caracas.'
	}
];

/* Reservado exclusivamente para citas verificadas con autorización explícita */
export const recommendationsData: RecommendationItem[] = [];

export const personalTouchesData: PersonalTouchItem[] = [
	{
		id: 'google-ai-ecosystem',
		title: 'Ecosistema de IA de Google',
		tag: 'Uso Profesional · Productividad & Dev',
		description:
			'Dominio práctico y profesional del ecosistema de inteligencia artificial de Google (Gemini, Google AI Studio y flujos agénticos) aplicado a ingeniería de software, estudio universitario y automatización.',
		details: ['Gemini & AI Studio', 'Flujos agénticos', 'Prototipado ágil']
	},
	{
		id: 'capcut-editing',
		title: 'Edición Básica de Video en CapCut',
		tag: 'Audiovisual · CapCut',
		description:
			'Edición ágil y limpia en CapCut para demos de software, presentaciones de proyectos y piezas cortas de divulgación (@santi.arm_dev).',
		details: ['CapCut', 'Demos técnicas', 'Ritmo y claridad']
	},
	{
		id: 'sport-music',
		title: 'Fútbol Ocasional y Cuatro',
		tag: 'Tiempo Libre · Balance',
		description:
			'Juego fútbol de manera ocasional para despejarme y mantenerme activo. En mis ratos libres también estoy aprendiendo a tocar el Cuatro Venezolano desde nivel principiante.',
		details: ['Fútbol ocasional', 'Cuatro (principiante)', 'Desconexión activa']
	}
];

export const videoEditingData: VideoEditReelItem[] = [
	{
		id: 'tech-devlog-cut',
		title: 'Demos de Software en CapCut (@santi.arm_dev)',
		focus: 'Edición básica ágil y explicación directa',
		description:
			'Edición limpia en CapCut orientada a mostrar interfaces, avances de código y demos cortas de forma clara y directa.',
		duration: '00:45',
		videoUrl: '/videos/reels/tech-devlog-cut.mp4'
	},
	{
		id: 'pitch-visual-support',
		title: 'Soporte Visual para Presentaciones y Pitch',
		focus: 'Montaje de gameplay y demos en vivo',
		description:
			'Recortes de gameplay, transiciones sobrias y piezas visuales preparadas en CapCut para respaldar presentaciones técnicas.',
		duration: '01:10',
		videoUrl: '/videos/reels/pitch-visual-support.mp4'
	}
];

export const stackGroupsData: StackGroup[] = [
	{
		id: 'dev-arch',
		title: 'Desarrollo Web & Arquitectura',
		description: 'Interfaces reactivas, sistemas B2B trazables y sincronización cloud.',
		items: [
			{ name: 'Svelte 5 & SvelteKit', level: 'Runes · SSR / Prerender' },
			{ name: 'TypeScript', level: 'Tipado estricto' },
			{ name: 'Supabase & APIs REST', level: 'PostgreSQL · Sync iOS' },
			{ name: 'SCSS Modular & CapacitorJS', level: 'Sistemas de diseño · Móvil' }
		]
	},
	{
		id: 'ai-vision',
		title: 'IA, Ecosistema Google & Visión',
		description: 'Uso profesional de IA de Google e inferencia de visión artificial en navegador.',
		items: [
			{ name: 'Ecosistema de IA de Google', level: 'Uso profesional · Gemini & AI Studio' },
			{ name: 'MediaPipe HandLandmarker', level: 'WASM / WebGL 60 FPS' },
			{ name: 'Álgebra Vectorial (VectorMath.js)', level: 'Invariancia de escala' },
			{ name: 'Flujos Agénticos & Automatización', level: 'Productividad y estudio' }
		]
	},
	{
		id: 'gamedev-shaders',
		title: 'Game Dev & Shaders GLSL',
		description: 'Renderizado en GPU, física interactiva y motores 2D modulares.',
		items: [
			{ name: 'WebGL2 & GLSL Shaders', level: 'Iluminación e impactos' },
			{ name: 'Threlte & Three.js', level: 'Escenas 3D en Svelte 5' },
			{ name: 'Aseprite Pipeline', level: 'Pixel art y hitboxes' },
			{ name: 'Máquinas de Estado', level: 'Combate y gameplay' }
		]
	},
	{
		id: 'physics-comms',
		title: 'Física UCV, Python & Comunicación',
		description: 'Estudiante de 1er semestre en la UCV, oratoria persuasiva y edición básica en CapCut.',
		items: [
			{ name: 'Python (Cert. Internacional)', level: 'Algoritmos y simulación' },
			{ name: 'Física UCV (1er Semestre) & LaTeX', level: 'Formación universitaria inicial' },
			{ name: 'Oratoria y Persuasión (UCV)', level: 'CEP FACES · N° 000427' },
			{ name: 'CapCut (Edición básica)', level: 'Demos y clips cortos' }
		]
	}
];

/* Alias compatibles */
export const profileData = {
	name: santiagoProfile.displayName,
	fullName: santiagoProfile.fullName,
	handle: santiagoProfile.handle,
	headlineRole: santiagoProfile.headline,
	badgeCode: santiagoProfile.badgeCode,
	location: santiagoProfile.location,
	heroPill: santiagoProfile.statusBadge,
	heroTitle: santiagoProfile.heroTitle,
	heroDescription: santiagoProfile.heroBio,
	kuriosNarrative: santiagoProfile.kuriosNarrative,
	videoEditingSkill: santiagoProfile.videoEditingSummary,
	email: santiagoProfile.email
} as const;

export const statCards = santiagoProfile.stats;
export const educationTimeline = santiagoProfile.educationAndMilestones;
export const projectsData = featuredProjects;
