import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ style: { configFile: false } }),

	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/images/') || path.startsWith('/videos/')) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
