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

	const showInteractive3D = $derived(
		!reducedMotion && webglSupported && LanyardSceneComponent !== null
	);
</script>

<div class="lanyard-shell">
	<div
		class="lanyard-stage"
		bind:this={stageEl}
		role="region"
		aria-label="Credencial interactiva de Santiago Rivero"
	>
		{#if showInteractive3D && LanyardSceneComponent}
			<Canvas dpr={[1, 2.5]}>
				<LanyardSceneComponent paused={!isVisible} {flipped} {stageEl} />
			</Canvas>
		{:else}
			<div class="static-badge" class:flipped>
				<div class="static-strap" aria-hidden="true"></div>
				<div class="static-clasp" aria-hidden="true"></div>
				<div class="static-card">
					<div class="static-header">
						<span>PORTAFOLIO // 2026</span>
					</div>

					{#if !flipped}
						<div class="static-body">
							<div class="static-monogram">SR</div>
							<strong class="static-name">{santiagoProfile.displayName}</strong>
							<span class="static-role">Software Developer & Creative Engineer</span>
							<span class="static-degree">Física UCV · 1er Semestre</span>
							<div class="static-identity">
								<span>{santiagoProfile.fullName}</span>
								<strong>{santiagoProfile.location}</strong>
							</div>
						</div>
					{:else}
						<div class="static-body back">
							<span class="static-formula">m·x'' + c·x' + k·x = 0</span>
							<strong class="static-name">Perfil y Credenciales</strong>
							<ul class="static-seals">
								<li>UCV · Licenciatura en Física (1er Semestre)</li>
								<li>CEP · FACES · UCV — Oratoria y Persuasión</li>
								<li>Python Avalado & Ecosistema IA Google</li>
								<li>MOVA IA, Web 3D & Videojuegos 2D</li>
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<div class="lanyard-controls">
		<span class="physics-hint">
			{showInteractive3D ? 'Arrastra el carnet' : 'Santiago Rivero · UCV'}
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
		height: clamp(500px, 78svh, 660px);
		background: transparent;
		border: none;
		border-radius: 0;
		overflow: visible;
		touch-action: none;

		@media (max-width: 960px) {
			height: clamp(410px, 56svh, 490px);
		}
	}

	.static-badge {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-bottom: 1rem;
	}

	.static-strap {
		width: 20px;
		height: clamp(86px, 14vh, 140px);
		background: linear-gradient(180deg, #1d4ed8 0%, #2563eb 100%);
	}

	.static-clasp {
		width: 30px;
		height: 14px;
		border-radius: 4px 4px 2px 2px;
		background: #94a3b8;
		margin-bottom: -4px;
		z-index: 2;
	}

	.static-card {
		width: min(270px, 100%);
		border-radius: 18px;
		background: var(--bg-primary);
		border: 1px solid var(--border-strong);
		overflow: hidden;
		box-shadow: 0 24px 48px rgba(2, 6, 23, 0.55);
	}

	.static-header {
		background: var(--accent-mova);
		padding: 0.78rem 1rem;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-main);
	}

	.static-body {
		padding: 1.35rem 1.15rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.42rem;

		&.back {
			align-items: flex-start;
			text-align: left;
		}
	}

	.static-monogram {
		width: 74px;
		height: 74px;
		border-radius: 18px;
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-size: 1.65rem;
		font-weight: 800;
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: var(--text-main);
		margin-bottom: 0.35rem;
	}

	.static-name {
		font-family: var(--font-display);
		font-size: 1.24rem;
		font-weight: 700;
		color: var(--text-main);
	}

	.static-role {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 0.98rem;
		color: #bfdbfe;
	}

	.static-degree {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.static-identity {
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
			font-size: 0.62rem;
			color: #93c5fd;
		}

		strong {
			font-family: var(--font-display);
			font-size: 0.86rem;
			color: var(--text-main);
		}
	}

	.static-formula {
		font-family: var(--font-mono);
		font-size: 0.74rem;
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
		margin-top: -0.5rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		padding: 0.35rem 0.45rem 0.35rem 0.95rem;
		border-radius: var(--radius-pill);
		background: rgba(11, 17, 32, 0.72);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid var(--border-hairline);
		z-index: 2;
	}

	.physics-hint {
		font-family: var(--font-mono);
		font-size: 0.73rem;
		color: var(--text-muted);
	}

	.flip-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.38rem 0.82rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		font-size: 0.78rem;
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
