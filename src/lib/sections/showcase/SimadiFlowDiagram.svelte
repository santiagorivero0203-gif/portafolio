<script lang="ts">
	interface FlowNode {
		id: string;
		step: string;
		title: string;
		summary: string;
		formula: string;
	}

	const nodes: FlowNode[] = [
		{
			id: 'inputs',
			step: '01',
			title: 'Parámetros iniciales',
			summary: 'Define la banda de tasas inicial, liquidez disponible y volumen de posturas por participante.',
			formula: 'S_0 = { O_0, D_0, T_ref, límites }'
		},
		{
			id: 'rules',
			step: '02',
			title: 'Restricciones del sistema',
			summary: 'Filtra órdenes fuera de rango operativo, verifica topes por ciclo y prioriza condiciones de borde.',
			formula: 'válida(o_i) ⇔ T_min ≤ o_i.tasa ≤ T_max'
		},
		{
			id: 'matching',
			step: '03',
			title: 'Cruce por iteración',
			summary: 'Ejecuta el algoritmo discreto paso a paso, asigna oferta contra demanda y actualiza saldos remanentes.',
			formula: 'ΔV_t = min(O_t, D_t) · θ(restricciones)'
		},
		{
			id: 'output',
			step: '04',
			title: 'Trazabilidad y métricas',
			summary: 'Registra la tasa de equilibrio por ciclo, brecha de demanda no atendida y gráficas comparativas.',
			formula: 'H(t) = [T_t, V_asignado, D_pendiente]'
		}
	];

	let activeId = $state<string>(nodes[0].id);
	const activeNode = $derived(nodes.find((n) => n.id === activeId) ?? nodes[0]);
</script>

<div class="diagram-box">
	<div class="diagram-head">
		<span class="mono-label">Flujo algorítmico interactivo</span>
		<span class="diagram-hint">Selecciona un bloque para inspeccionar su lógica</span>
	</div>

	<svg
		viewBox="0 0 760 170"
		class="flow-svg"
		role="img"
		aria-label="Diagrama de flujo del algoritmo SIMADI en cuatro etapas"
	>
		{#each nodes as node, idx (node.id)}
			{@const x = 14 + idx * 190}
			{@const selected = activeId === node.id}
			{#if idx < nodes.length - 1}
				<line
					x1={x + 162}
					y1="85"
					x2={x + 190}
					y2="85"
					stroke="rgba(59, 130, 246, 0.55)"
					stroke-width="1.6"
					stroke-dasharray="4 3"
				/>
			{/if}

			<g
				class="svg-node"
				role="button"
				tabindex="0"
				aria-pressed={selected}
				aria-label="Etapa {node.step}: {node.title}"
				onclick={() => (activeId = node.id)}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						activeId = node.id;
					}
				}}
			>
				<rect
					{x}
					y="24"
					width="162"
					height="122"
					rx="14"
					fill={selected ? '#17233B' : '#0B1120'}
					stroke={selected ? '#3B82F6' : 'rgba(148, 163, 184, 0.22)'}
					stroke-width={selected ? '2' : '1'}
				/>
				<text
					x={x + 16}
					y="52"
					fill="#60A5FA"
					font-family="IBM Plex Mono, monospace"
					font-size="11"
				>
					ETAPA {node.step}
				</text>
				<text
					x={x + 16}
					y="82"
					fill="#F8FAFC"
					font-family="Space Grotesk, sans-serif"
					font-size="13.5"
					font-weight="600"
				>
					{node.title.split(' ').slice(0, 2).join(' ')}
				</text>
				<text
					x={x + 16}
					y="102"
					fill="#CBD5E1"
					font-family="Space Grotesk, sans-serif"
					font-size="13"
				>
					{node.title.split(' ').slice(2).join(' ')}
				</text>
				<text
					x={x + 16}
					y="130"
					fill="#94A3B8"
					font-family="IBM Plex Mono, monospace"
					font-size="10.5"
				>
					Inspeccionar →
				</text>
			</g>
		{/each}
	</svg>

	<div class="node-detail">
		<div class="detail-top">
			<strong>{activeNode.step} · {activeNode.title}</strong>
			<code>{activeNode.formula}</code>
		</div>
		<p>{activeNode.summary}</p>
	</div>
</div>

<style lang="scss">
	.diagram-box {
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

	.flow-svg {
		width: 100%;
		height: auto;
		display: block;
		overflow: visible;
	}

	.svg-node {
		cursor: pointer;
		outline: none;

		&:focus-visible rect {
			stroke: #60a5fa;
			stroke-width: 2.2;
		}
	}

	.node-detail {
		padding: 1rem 1.15rem;
		border-radius: var(--radius-md);
		background: var(--bg-primary);
		border: 1px solid var(--border-hairline);
		display: flex;
		flex-direction: column;
		gap: 0.45rem;

		p {
			font-size: 0.88rem;
			color: var(--text-secondary);
			line-height: 1.56;
		}
	}

	.detail-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;

		strong {
			font-family: var(--font-display);
			font-size: 0.96rem;
			color: var(--text-main);
		}

		code {
			font-family: var(--font-mono);
			font-size: 0.76rem;
			padding: 0.22rem 0.6rem;
			border-radius: 8px;
			background: var(--accent-mova-soft);
			color: #bfdbfe;
		}
	}
</style>
