<script lang="ts">
	import '../styles/global.scss';
	import type { Snippet } from 'svelte';
	import StarfieldCanvas from '$lib/3d/starfield/StarfieldCanvas.svelte';
	import { mountSmoothScroll } from '$lib/motion/lenis';
	import ContactFooter from '$lib/sections/contact/ContactFooter.svelte';
	import Navbar from '$lib/sections/nav/Navbar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	$effect(() => {
		return mountSmoothScroll();
	});
</script>

<StarfieldCanvas />
<Navbar />

<main class="page-shell">
	{@render children()}
</main>

<ContactFooter />

<style lang="scss">
	.page-shell {
		position: relative;
		z-index: var(--z-base);
	}
</style>
