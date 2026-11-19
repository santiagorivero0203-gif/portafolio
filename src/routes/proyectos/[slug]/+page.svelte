<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Media from '$lib/components/Media.svelte';
	import ProductivityEcosystemDiagram from '$lib/sections/showcase/ProductivityEcosystemDiagram.svelte';
	import ProjectDetailSidebar from '$lib/sections/showcase/ProjectDetailSidebar.svelte';
	import SimadiFlowDiagram from '$lib/sections/showcase/SimadiFlowDiagram.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const project = $derived(data.project);
	const prevProject = $derived(data.prevProject);
	const nextProject = $derived(data.nextProject);

	let sidebarRef = $state<ProjectDetailSidebar | undefined>(undefined);
</script>

<svelte:head>
	<title>{project.title} — Portafolio Santiago Rivero</title>
	<meta name="description" content={project.shortDescription} />
</svelte:head>

<article class="project-detail-page">
	<div class="container detail-container">
		<header class="detail-topbar">
			<div class="topbar-left">
				<a href="/#proyectos" class="back-link">
					<Icon name="arrow-left" size={15} />
					<span>Volver al portafolio</span>
				</a>

				<nav class="breadcrumbs" aria-label="Ruta de navegación">
					<a href="/#proyectos">Proyectos</a>
					<span aria-hidden="true">/</span>
					<span class="crumb-current">{project.title}</span>
				</nav>
			</div>

			<div class="topbar-badges">
				<span class="meta-pill accent">{project.category}</span>
				<span class="meta-pill">{project.role}</span>
			</div>
		</header>

		<section class="detail-hero">
			{#if project.featuredBadge}
				<span class="featured-pill">{project.featuredBadge}</span>
			{/if}
			<h1 class="display-xl">{project.title}</h1>
			<p class="body-lg detail-subtitle">{project.subtitle}</p>
		</section>

		<div class="detail-columns">
			<div class="col-main">
				<section class="detail-block">
					<h2 class="mono-label block-heading">Resumen ejecutivo</h2>
					<p class="block-text">{project.fullOverview}</p>
				</section>

				<section class="detail-block">
					<h2 class="mono-label block-heading">Arquitectura e ingeniería</h2>
					<p class="block-text">{project.architectureDetails}</p>
				</section>

				{#if project.id === 'simulacion-simadi'}
					<section class="detail-block">
						<SimadiFlowDiagram />
					</section>
				{/if}

				{#if project.id === 'app-productividad'}
					<section class="detail-block">
						<ProductivityEcosystemDiagram />
					</section>
				{/if}

				<section class="detail-block">
					<h2 class="mono-label block-heading">Capacidades clave</h2>
					<ul class="features-list">
						{#each project.keyFeatures as feature}
							<li>
								<span class="feature-bullet" aria-hidden="true"></span>
								<span>{feature}</span>
							</li>
						{/each}
					</ul>
				</section>

				{#if project.internalModules?.length}
					<section class="detail-block">
						<h2 class="mono-label block-heading">Módulos internos</h2>
						<div class="modules-grid">
							{#each project.internalModules as mod (mod.name)}
								<div class="module-card">
									<h3>{mod.name}</h3>
									<p>{mod.detail}</p>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				{#if project.teamPhotos?.length}
					<section class="detail-block">
						<h2 class="mono-label block-heading">Equipo y liderazgo</h2>
						<div class="team-grid">
							{#each project.teamPhotos as photo}
								<figure class="team-figure">
									<button
										type="button"
										class="zoom-trigger"
										onclick={() => sidebarRef?.openZoom(photo.url, photo.caption)}
									>
										<div class="figure-frame">
											<Media
												src={photo.url}
												alt={photo.caption}
												fallbackLabel="Equipo"
												fallbackTitle={photo.caption}
											/>
										</div>
									</button>
									<figcaption>{photo.caption}</figcaption>
								</figure>
							{/each}
						</div>
					</section>
				{/if}
			</div>

			<ProjectDetailSidebar bind:this={sidebarRef} {project} />
		</div>

		<nav class="project-pager" aria-label="Navegación entre proyectos">
			<a href="/proyectos/{prevProject.id}" class="pager-link">
				<span class="pager-dir">
					<Icon name="arrow-left" size={14} />
					<span>Anterior</span>
				</span>
				<strong>{prevProject.title}</strong>
			</a>

			<a href="/proyectos/{nextProject.id}" class="pager-link next">
				<span class="pager-dir">
					<span>Siguiente</span>
					<Icon name="arrow-right" size={14} />
				</span>
				<strong>{nextProject.title}</strong>
			</a>
		</nav>
	</div>
</article>

<style lang="scss">
	.project-detail-page {
		padding-top: clamp(6.5rem, 11vw, 8.5rem);
		padding-bottom: clamp(4rem, 7vw, 6rem);
	}

	.detail-container {
		display: flex;
		flex-direction: column;
		gap: 2.25rem;
	}

	.detail-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid var(--border-hairline);
	}

	.topbar-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.5rem 0.95rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-main);
		transition:
			border-color 0.22s ease,
			background-color 0.22s ease;

		&:hover {
			border-color: var(--border-active);
			background: var(--surface-hover);
		}
	}

	.breadcrumbs {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: var(--text-muted);

		a:hover {
			color: var(--text-main);
		}

		.crumb-current {
			color: var(--text-main);
		}
	}

	.topbar-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.meta-pill {
		font-family: var(--font-mono);
		font-size: 0.73rem;
		padding: 0.3rem 0.72rem;
		border-radius: var(--radius-pill);
		border: 1px solid var(--border-hairline);
		background: var(--surface-subtle);
		color: var(--text-secondary);

		&.accent {
			border-color: rgba(59, 130, 246, 0.4);
			color: #93c5fd;
		}
	}

	.detail-hero {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		max-width: 72ch;
	}

	.featured-pill {
		align-self: flex-start;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		padding: 0.25rem 0.7rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: #bfdbfe;
	}

	.detail-subtitle {
		color: var(--text-muted);
	}

	.detail-columns {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
		gap: 1.5rem;
		align-items: start;

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
		}
	}

	.col-main {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
	}

	.detail-block {
		padding: 1.35rem;
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
	}

	.block-heading {
		display: block;
		margin-bottom: 0.75rem;
	}

	.block-text {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.features-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;

		li {
			display: flex;
			align-items: flex-start;
			gap: 0.65rem;
			font-size: 0.92rem;
			line-height: 1.58;
			color: var(--text-secondary);
		}
	}

	.feature-bullet {
		margin-top: 0.5rem;
		flex-shrink: 0;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent-mova-light);
	}

	.modules-grid,
	.team-grid {
		display: grid;
		gap: 0.85rem;
	}

	.module-card {
		padding: 0.95rem 1.05rem;
		border-radius: 12px;
		background: var(--bg-primary);
		border: 1px solid var(--border-hairline);

		h3 {
			font-family: var(--font-display);
			font-size: 0.95rem;
			color: var(--text-main);
			margin-bottom: 0.25rem;
		}

		p {
			font-size: 0.85rem;
			color: var(--text-muted);
			line-height: 1.52;
		}
	}

	.team-figure {
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--border-hairline);
		background: var(--bg-obsidian);

		figcaption {
			padding: 0.65rem 0.9rem;
			font-size: 0.8rem;
			color: var(--text-muted);
		}
	}

	.zoom-trigger {
		width: 100%;
		display: block;
	}

	.figure-frame {
		height: 220px;
	}

	.project-pager {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-hairline);

		@media (max-width: 640px) {
			grid-template-columns: 1fr;
		}
	}

	.pager-link {
		padding: 1.15rem 1.25rem;
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		transition: border-color 0.22s ease;

		&:hover {
			border-color: var(--border-active);
		}

		&.next {
			align-items: flex-end;
			text-align: right;
		}

		strong {
			font-family: var(--font-display);
			font-size: 1rem;
			color: var(--text-main);
		}
	}

	.pager-dir {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent-mova-light);
	}
</style>
