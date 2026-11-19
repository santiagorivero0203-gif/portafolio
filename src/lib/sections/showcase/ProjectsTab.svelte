<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import { featuredProjects } from "$lib/data/portfolioData";
	import ProjectCard from "./ProjectCard.svelte";

	const flagshipIds = new Set(["mova", "the-last-endo"]);
	const flagshipProjects = featuredProjects.filter((p) =>
		flagshipIds.has(p.id),
	);
	const coreProjects = featuredProjects.filter((p) => !flagshipIds.has(p.id));

	// Mobile chunking: 4 projects per page in a 2x2 bento grid
	const MOBILE_PAGE_SIZE = 4;
	const totalPages = Math.ceil(featuredProjects.length / MOBILE_PAGE_SIZE);
	let mobilePage = $state<number | "all">(0);

	const mobileVisibleProjects = $derived(
		mobilePage === "all"
			? featuredProjects
			: featuredProjects.slice(
					mobilePage * MOBILE_PAGE_SIZE,
					mobilePage * MOBILE_PAGE_SIZE + MOBILE_PAGE_SIZE,
				),
	);

	function pageLabel(idx: number): string {
		const start = idx * MOBILE_PAGE_SIZE + 1;
		const end = Math.min(
			featuredProjects.length,
			(idx + 1) * MOBILE_PAGE_SIZE,
		);
		const pad = (n: number) => String(n).padStart(2, "0");
		return `${pad(start)}–${pad(end)}`;
	}
</script>

<div
	class="projects-wrapper"
	role="tabpanel"
	id="panel-projects"
	aria-labelledby="tab-projects"
>
	<!-- Desktop layout (> 780px): preserved identically -->
	<div class="projects-layout desktop-only">
		<div class="flagship-grid">
			{#each flagshipProjects as project (project.id)}
				<ProjectCard {project} featured={true} />
			{/each}
		</div>

		<div class="core-grid">
			{#each coreProjects as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>

	<!-- Mobile layout (<= 780px): 2x2 bento grid divided 4 by 4 -->
	<div class="mobile-projects mobile-only">
		<div
			class="mobile-chunk-bar"
			role="group"
			aria-label="Bloques de proyectos de cuatro en cuatro"
		>
			<div class="chunk-pills">
				{#each Array.from({ length: totalPages }, (_, i) => i) as pageIdx}
					<button
						type="button"
						class="chunk-pill"
						class:active={mobilePage === pageIdx}
						onclick={() => (mobilePage = pageIdx)}
					>
						{pageLabel(pageIdx)}
					</button>
				{/each}
				<button
					type="button"
					class="chunk-pill"
					class:active={mobilePage === "all"}
					onclick={() => (mobilePage = "all")}
				>
					Todos ({featuredProjects.length})
				</button>
			</div>
			<span class="chunk-counter">
				{mobilePage === "all"
					? `${featuredProjects.length} en cuadrícula`
					: `Bloque ${mobilePage + 1} / ${totalPages}`}
			</span>
		</div>

		<div class="mobile-bento-grid">
			{#each mobileVisibleProjects as project (project.id)}
				<ProjectCard {project} compact={true} />
			{/each}
		</div>

		{#if mobilePage !== "all" && totalPages > 1}
			<div class="mobile-chunk-nav">
				<button
					type="button"
					class="chunk-nav-btn"
					disabled={mobilePage === 0}
					onclick={() => {
						if (typeof mobilePage === "number" && mobilePage > 0)
							mobilePage -= 1;
					}}
				>
					<Icon name="arrow-left" size={14} />
					<span>Anterior</span>
				</button>

				<button
					type="button"
					class="chunk-nav-btn"
					disabled={mobilePage === totalPages - 1}
					onclick={() => {
						if (
							typeof mobilePage === "number" &&
							mobilePage < totalPages - 1
						)
							mobilePage += 1;
					}}
				>
					<span>Siguiente bloque</span>
					<Icon name="arrow-right" size={14} />
				</button>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.projects-layout {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
	}

	.flagship-grid,
	.core-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.desktop-only {
		@media (max-width: 780px) {
			display: none;
		}
	}

	.mobile-only {
		display: none;

		@media (max-width: 780px) {
			display: flex;
			flex-direction: column;
			gap: 0.9rem;
		}
	}

	.mobile-chunk-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.65rem;
		flex-wrap: wrap;
	}

	.chunk-pills {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.25rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
	}

	.chunk-pill {
		padding: 0.36rem 0.72rem;
		border-radius: var(--radius-pill);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;

		&.active {
			background: var(--accent-mova);
			color: var(--text-main);
		}
	}

	.chunk-counter {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
	}

	.mobile-bento-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.72rem;
	}

	.mobile-chunk-nav {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.6rem;
		margin-top: 0.15rem;
	}

	.chunk-nav-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		padding: 0.62rem 0.85rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-main);
		transition:
			border-color 0.2s ease,
			opacity 0.2s ease;

		&:hover:not(:disabled) {
			border-color: var(--border-active);
		}

		&:disabled {
			opacity: 0.38;
			cursor: not-allowed;
		}
	}
</style>
