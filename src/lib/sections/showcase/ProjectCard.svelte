<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Media from '$lib/components/Media.svelte';
	import type { Project } from '$lib/data/portfolioData';

	interface Props {
		project: Project;
		featured?: boolean;
	}

	let { project, featured = false }: Props = $props();
	let hovered = $state(false);
</script>

<article
	class="project-card"
	class:featured
	onpointerenter={() => (hovered = true)}
	onpointerleave={() => (hovered = false)}
>
	<a href="/proyectos/{project.id}" class="project-thumb" tabindex="-1" aria-hidden="true">
		<Media
			src={project.thumbnailUrl}
			alt={project.title}
			videoPreviewUrl={project.videoPreviewUrl}
			{hovered}
			fallbackLabel={project.category}
			fallbackTitle={project.title}
		/>
	</a>

	<div class="project-body">
		<div class="project-meta-row">
			<span class="project-category">{project.category}</span>
			<span class="access-pill">
				{project.accessType === 'public' ? 'Proyecto público' : 'Inmersión interna'}
			</span>
		</div>

		{#if project.featuredBadge}
			<span class="featured-tag">{project.featuredBadge}</span>
		{/if}

		<h3 class="project-title">{project.title}</h3>
		<p class="project-subtitle">{project.subtitle}</p>
		<p class="project-desc">{project.shortDescription}</p>

		<div class="tech-row">
			{#each project.technologies.slice(0, 3) as tech}
				<span class="tech-tag">{tech}</span>
			{/each}
		</div>

		<div class="project-actions">
			<a href="/proyectos/{project.id}" class="details-link">
				<span>
					{project.accessType === 'public' ? 'Detalles' : 'Explorar arquitectura'}
				</span>
				<Icon name="arrow-right" size={16} />
			</a>
		</div>
	</div>
</article>

<style lang="scss">
	.project-card {
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			border-color 0.28s var(--ease-out-expo),
			transform 0.28s var(--ease-out-expo);

		&:hover {
			border-color: var(--border-active);
			transform: translateY(-3px);
		}
	}

	.project-thumb {
		display: block;
		height: 190px;
		border-bottom: 1px solid var(--border-hairline);
		background: var(--bg-obsidian);

		.featured & {
			height: 225px;
		}
	}

	.project-body {
		padding: 1.35rem;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		flex: 1;
	}

	.project-meta-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.project-category {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent-mova-light);
	}

	.access-pill {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		padding: 0.16rem 0.55rem;
		border-radius: var(--radius-pill);
		background: var(--surface-subtle);
		border: 1px solid var(--border-hairline);
		color: var(--text-muted);
	}

	.featured-tag {
		align-self: flex-start;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 0.2rem 0.58rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		border: 1px solid rgba(59, 130, 246, 0.35);
		color: #bfdbfe;
	}

	.project-title {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-main);
	}

	.project-subtitle {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1.04rem;
		font-weight: 400;
		line-height: 1.3;
		color: #dbeafe;
	}

	.project-desc {
		font-size: 0.89rem;
		color: var(--text-muted);
		line-height: 1.56;
	}

	.tech-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.2rem;
	}

	.tech-tag {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		padding: 0.18rem 0.5rem;
		border-radius: var(--radius-pill);
		background: var(--surface-subtle);
		border: 1px solid var(--border-hairline);
		color: var(--text-secondary);
	}

	.project-actions {
		margin-top: auto;
		padding-top: 0.85rem;
		border-top: 1px solid var(--border-hairline);
	}

	.details-link {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--accent-mova-light);
		transition: color 0.2s ease;

		&:hover {
			color: var(--text-main);
		}
	}
</style>
