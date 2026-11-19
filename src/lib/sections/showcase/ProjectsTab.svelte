<script lang="ts">
	import { featuredProjects } from '$lib/data/portfolioData';
	import ProjectCard from './ProjectCard.svelte';

	const flagshipIds = new Set(['mova', 'the-last-endo']);
	const flagshipProjects = featuredProjects.filter((p) => flagshipIds.has(p.id));
	const coreProjects = featuredProjects.filter((p) => !flagshipIds.has(p.id));
</script>

<div class="projects-layout" role="tabpanel" id="panel-projects" aria-labelledby="tab-projects">
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

		@media (max-width: 780px) {
			grid-template-columns: 1fr;
		}
	}
</style>
