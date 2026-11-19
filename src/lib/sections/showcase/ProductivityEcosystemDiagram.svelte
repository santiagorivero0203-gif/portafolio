<script lang="ts">
	interface LayerNode {
		id: string;
		tag: string;
		title: string;
		points: string[];
	}

	const layers: LayerNode[] = [
		{
			id: 'supabase',
			tag: 'BACKEND CLOUD',
			title: 'Supabase · PostgreSQL + Cola IA',
			points: [
				'Calendario de evaluaciones y ponderaciones académicas (parciales, quizzes, entregas).',
				'Cola asíncrona de procesamiento con IA para generar guías y tarjetas.',
				'API REST autenticada consumida tanto por la web como por iOS.'
			]
		},
		{
			id: 'web',
			tag: 'APLICACIÓN DE ESTUDIO',
			title: '7 Pilares LaTeX + Pomodoro 25m',
			points: [
				'Teoría con ecuaciones en LaTeX, apuntes en método Cornell y glosario técnico.',
				'Resolución paso a paso, alertas de errores de examen y flashcards activas.',
				'Simulador de preguntas con detección de debilidades (<60%) y subtareas Pomodoro de 25 min.'
			]
		},
		{
			id: 'ios',
			tag: 'WIDGET NATIVO iOS',
			title: 'Scriptable · Pantalla de Inicio',
			points: [
				'Consulta directa a Supabase vía API REST sin abrir el navegador.',
				'Muestra próximas evaluaciones UCV, ponderación y tareas prioritarias del día.',
				'Actualización automática en segundo plano sobre iOS.'
			]
		}
	];

	let activeId = $state<string>(layers[0].id);
	const activeLayer = $derived(layers.find((l) => l.id === activeId) ?? layers[0]);
</script>

<div class="ecosystem-box">
	<div class="diagram-head">
		<span class="mono-label">Arquitectura privada en tres capas</span>
		<span class="diagram-hint">Haz clic en cada capa para ver sus módulos</span>
	</div>

	<div class="mobile-layers-list" role="tablist" aria-label="Capas de la arquitectura">
		{#each layers as layer (layer.id)}
			{@const selected = activeId === layer.id}
			<button
				type="button"
				role="tab"
				class="mobile-layer-pill"
				class:active={selected}
				aria-selected={selected}
				onclick={() => (activeId = layer.id)}
			>
				<span class="m-tag">{layer.tag}</span>
				<span class="m-title">{layer.title}</span>
			</button>
		{/each}
	</div>

	<svg
		viewBox="0 0 760 164"
		class="eco-svg"
		role="img"
		aria-label="Flujo de sincronización entre Supabase, Web de Estudio y Widget iOS Scriptable"
	>
		{#each layers as layer, idx (layer.id)}
			{@const x = 16 + idx * 252}
			{@const selected = activeId === layer.id}
			{#if idx < layers.length - 1}
				<line
					x1={x + 224}
					y1="82"
					x2={x + 252}
					y2="82"
					stroke="rgba(59, 130, 246, 0.55)"
					stroke-width="1.6"
				/>
			{/if}

			<g
				class="eco-node"
				role="button"
				tabindex="0"
				aria-pressed={selected}
				aria-label="{layer.tag}: {layer.title}"
				onclick={() => (activeId = layer.id)}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						activeId = layer.id;
					}
				}}
			>
				<rect
					{x}
					y="20"
					width="224"
					height="124"
					rx="14"
					fill={selected ? '#17233B' : '#0B1120'}
					stroke={selected ? '#3B82F6' : 'rgba(148, 163, 184, 0.22)'}
					stroke-width={selected ? '2' : '1'}
				/>
				<text
					x={x + 18}
					y="48"
					fill="#60A5FA"
					font-family="IBM Plex Mono, monospace"
					font-size="10.5"
				>
					{layer.tag}
				</text>
				<text
					x={x + 18}
					y="78"
					fill="#F8FAFC"
					font-family="Space Grotesk, sans-serif"
					font-size="14"
					font-weight="600"
				>
					{layer.title.split('·')[0].trim()}
				</text>
				<text
					x={x + 18}
					y="99"
					fill="#CBD5E1"
					font-family="DM Sans, sans-serif"
					font-size="12"
				>
					{layer.title.split('·')[1]?.trim() ?? ''}
				</text>
				<text
					x={x + 18}
					y="128"
					fill="#94A3B8"
					font-family="IBM Plex Mono, monospace"
					font-size="10.5"
				>
					Ver detalle →
				</text>
			</g>
		{/each}
	</svg>

	<div class="layer-detail">
		<div class="layer-head">
			<span class="layer-tag">{activeLayer.tag}</span>
			<strong>{activeLayer.title}</strong>
		</div>
		<ul>
			{#each activeLayer.points as point}
				<li>{point}</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	.ecosystem-box {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.diagram-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.diagram-hint {
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.mobile-layers-list {
		display: none;
		flex-direction: column;
		gap: 0.5rem;

		@media (max-width: 640px) {
			display: flex;
		}
	}

	.mobile-layer-pill {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.35rem;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-md);
		background: var(--bg-primary);
		border: 1px solid var(--border-hairline);
		text-align: left;
		transition: border-color 0.2s ease, background-color 0.2s ease;

		.m-tag {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			color: var(--accent-mova-light);
			background: var(--accent-mova-soft);
			padding: 0.15rem 0.45rem;
			border-radius: 6px;
		}

		.m-title {
			font-family: var(--font-display);
			font-size: 0.9rem;
			font-weight: 600;
			color: var(--text-secondary);
		}

		&.active {
			border-color: var(--accent-mova-light);
			background: var(--surface-hover);

			.m-title {
				color: var(--text-main);
			}
		}
	}

	.eco-svg {
		width: 100%;
		height: auto;
		display: block;

		@media (max-width: 640px) {
			display: none;
		}
	}

	.eco-node {
		cursor: pointer;
		outline: none;

		&:focus-visible rect {
			stroke: #60a5fa;
			stroke-width: 2.2;
		}
	}

	.layer-detail {
		padding: 1rem 1.2rem;
		border-radius: var(--radius-md);
		background: var(--bg-primary);
		border: 1px solid var(--border-hairline);
		display: flex;
		flex-direction: column;
		gap: 0.65rem;

		ul {
			padding-left: 1.15rem;
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
			font-size: 0.87rem;
			color: var(--text-secondary);
			line-height: 1.5;
		}
	}

	.layer-head {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		flex-wrap: wrap;

		strong {
			font-family: var(--font-display);
			font-size: 0.96rem;
			color: var(--text-main);
		}
	}

	.layer-tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 0.18rem 0.55rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		color: #bfdbfe;
	}
</style>
