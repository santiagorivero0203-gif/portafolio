<script lang="ts">
	import type { Component } from 'svelte';
	import { Canvas } from '@threlte/core';
	import Icon from '$lib/components/Icon.svelte';
	import { santiagoProfile } from '$lib/data/portfolioData';
	import { observeReducedMotion } from '$lib/motion/reducedMotion.svelte';

	interface LanyardProps {
		paused?: boolean;
		flipped?: boolean;
		stageEl?: HTMLElement | undefined;
	}

	let stageEl = $state<HTMLDivElement | undefined>(undefined);
	let LanyardSceneComponent = $state<Component<LanyardProps> | null>(null);
	let isVisible = $state(true);
	let flipped = $state(false);
	let reducedMotion = $state(false);
	let webglSupported = $state(true);

	function hasWebGL(): boolean {
		if (typeof document === 'undefined') return false;
		try {
			const canvas = document.createElement('canvas');
			return Boolean(
				window.WebGLRenderingContext &&
					(canvas.getContext('webgl2') || canvas.getContext('webgl'))
			);
		} catch {
			return false;
		}
	}

	$effect(() => {
		webglSupported = hasWebGL();
		const stopObserve = observeReducedMotion((reduced) => {
			reducedMotion = reduced;
		});

		let active = true;
		if (!reducedMotion && webglSupported && !LanyardSceneComponent) {
			import('./LanyardScene.svelte').then((mod) => {
				if (active) LanyardSceneComponent = mod.default;
			});
		}

		let observer: IntersectionObserver | undefined;
		if (stageEl) {
			observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					if (entry) {
						isVisible = entry.isIntersecting;
					}
				},
				{ threshold: 0.05 }
			);
			observer.observe(stageEl);
		}

		const resetCursor = () => {
			document.body.style.cursor = 'default';
		};
		window.addEventListener('pointerup', resetCursor);

		return () => {
			active = false;
			stopObserve();
			observer?.disconnect();
			window.removeEventListener('pointerup', resetCursor);
			document.body.style.cursor = 'default';
		};
	});

	const showInteractive3D = $derived(!reducedMotion && webglSupported && LanyardSceneComponent !== null);
</script>

<div class="lanyard-shell">
	<div
		class="lanyard-stage"
		bind:this={stageEl}
		role="region"
		aria-label="Credencial interactiva de Santiago Rivero"
	>
		{#if showInteractive3D && LanyardSceneComponent}
			<Canvas dpr={[1, 2]}>
				<LanyardSceneComponent paused={!isVisible} {flipped} {stageEl} />
			</Canvas>
		{:else}
			<div class="static-badge" class:flipped>
				<div class="static-strap" aria-hidden="true"></div>
				<div class="static-card">
					<div class="static-header">
						<span>{santiagoProfile.badgeCode}</span>
					</div>

					{#if !flipped}
						<div class="static-body">
							<div class="static-monogram">SR</div>
							<strong class="static-name">{santiagoProfile.displayName}</strong>
							<span class="static-role">Software Developer · Física UCV</span>
							<div class="static-award">
								<span>Kurios Competition 2026</span>
								<strong>1er Lugar · Categoría U-Code</strong>
							</div>
						</div>
					{:else}
						<div class="static-body back">
							<span class="static-formula">m·x'' + c·x' + k·x = 0</span>
							<ul class="static-seals">
								<li>Licenciatura en Física (UCV)</li>
								<li>Bachiller 17.84/20 · Altas calificaciones</li>
								<li>Oratoria UCV (CEP FACES · N° 000427)</li>
								<li>Python Internacional · MOVA · GLSL</li>
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<div class="lanyard-controls">
		<span class="physics-hint">
			{showInteractive3D ? 'Arrastra el carnet · péndulo amortiguado' : 'Credencial UCV · Kurios 2026'}
		</span>
		<button type="button" class="flip-btn" onclick={() => (flipped = !flipped)}>
			<Icon name="flip" size={14} />
			<span>{flipped ? 'Ver frente' : 'Voltear'}</span>
		</button>
	</div>
</div>

<style lang="scss">
	.lanyard-shell {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.lanyard-stage {
		position: relative;
		width: 100%;
		height: clamp(410px, 56vh, 520px);
		border-radius: var(--radius-card);
		border: 1px solid var(--border-hairline);
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.72) 0%, rgba(7, 11, 20, 0.9) 100%);
		overflow: hidden;
		touch-action: none;
	}

	.static-badge {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.static-strap {
		width: 16px;
		height: 36px;
		background: #1e3a8a;
		border-radius: 3px 3px 0 0;
	}

	.static-card {
		width: min(260px, 100%);
		border-radius: 18px;
		background: var(--bg-primary);
		border: 1px solid var(--border-strong);
		overflow: hidden;
	}

	.static-header {
		background: var(--accent-mova);
		padding: 0.8rem 1rem;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--text-main);
	}

	.static-body {
		padding: 1.35rem 1.15rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;

		&.back {
			align-items: flex-start;
			text-align: left;
		}
	}

	.static-monogram {
		width: 72px;
		height: 72px;
		border-radius: 16px;
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: var(--text-main);
		margin-bottom: 0.35rem;
	}

	.static-name {
		font-family: var(--font-display);
		font-size: 1.12rem;
		color: var(--text-main);
	}

	.static-role {
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	.static-award {
		width: 100%;
		margin-top: 0.65rem;
		padding: 0.7rem;
		border-radius: 12px;
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		display: flex;
		flex-direction: column;
		gap: 0.15rem;

		span {
			font-family: var(--font-mono);
			font-size: 0.65rem;
			color: #93c5fd;
		}

		strong {
			font-family: var(--font-display);
			font-size: 0.84rem;
			color: var(--text-main);
		}
	}

	.static-formula {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--accent-mova-light);
	}

	.static-seals {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin-top: 0.4rem;
	}

	.lanyard-controls {
		margin-top: 0.85rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		width: 100%;
		padding-inline: 0.2rem;
	}

	.physics-hint {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.flip-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.42rem 0.85rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-main);
		transition:
			border-color 0.25s ease,
			background-color 0.25s ease;

		&:hover {
			border-color: var(--border-active);
			background: var(--surface-hover);
		}
	}
</style>
