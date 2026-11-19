import { error } from '@sveltejs/kit';
import { featuredProjects } from '$lib/data/portfolioData';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
	return featuredProjects.map((project) => ({ slug: project.id }));
};

export const load: PageLoad = ({ params }) => {
	const index = featuredProjects.findIndex((item) => item.id === params.slug);
	if (index === -1) {
		throw error(404, 'Proyecto no encontrado');
	}

	const project = featuredProjects[index];
	const prevProject =
		featuredProjects[(index - 1 + featuredProjects.length) % featuredProjects.length];
	const nextProject = featuredProjects[(index + 1) % featuredProjects.length];

	return {
		project,
		prevProject,
		nextProject
	};
};
