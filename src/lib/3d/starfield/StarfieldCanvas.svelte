<script lang="ts">
	import type { Component } from "svelte";
	import { Canvas } from "@threlte/core";
	import { observeReducedMotion } from "$lib/motion/reducedMotion.svelte";

	let SceneComponent = $state<Component | null>(null);
	let reducedMotion = $state(false);

	$effect(() => {
		const stopObserve = observeReducedMotion((reduced) => {
			reducedMotion = reduced;
		});

		let active = true;
		if (!reducedMotion && !SceneComponent) {
			import("./StarfieldScene.svelte").then((mod) => {
				if (active) SceneComponent = mod.default;
			});
		}

		return () => {
			active = false;
			stopObserve();
		};
	});
</script>

<div class="starfield-layer" aria-hidden="true">
	{#if !reducedMotion && SceneComponent}
		<Canvas dpr={[1, 1.5]}>
			<SceneComponent />
		</Canvas>
	{/if}
</div>

<style lang="scss">
	.starfield-layer {
		position: fixed;
		inset: 0;
		z-index: var(--z-bg);
		pointer-events: none;
		overflow: hidden;
	}
</style>
