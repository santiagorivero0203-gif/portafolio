<script lang="ts">
	import Media from '$lib/components/Media.svelte';
	import { santiagoProfile } from '$lib/data/portfolioData';
	import { getReducedMotion } from '$lib/motion/reducedMotion.svelte';
	import { reveal } from '$lib/motion/reveal';
	import EducationTimeline from './EducationTimeline.svelte';

	let statsBandEl = $state<HTMLDivElement | undefined>(undefined);
	let projectsDisplay = $state(6);
	let animatedOnce = false;

	$effect(() => {
		if (!statsBandEl || animatedOnce || getReducedMotion()) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry?.isIntersecting || animatedOnce) return;
				animatedOnce = true;

				const start = performance.now();
				const duration = 680;
				const frame = (now: number) => {
					const t = Math.min(1, (now - start) / duration);
					const eased = 1 - Math.pow(1 - t, 3);
					projectsDisplay = Math.max(1, Math.round(eased * 6));
					if (t < 1) {
						requestAnimationFrame(frame);
					} else {
						projectsDisplay = 6;
					}
				};
				requestAnimationFrame(frame);
				observer.disconnect();
			},
			{ threshold: 0.35 }
		);

		observer.observe(statsBandEl);
		return () => observer.disconnect();
	});
</script>

<section id="sobre-mi" class="about-section">
	<div class="container">
		<header class="section-header" use:reveal>
			<span class="mono-label">Sobre mí</span>
			<h2 class="heading-lg">
				Curiosidad científica, <em class="serif-accent">código</em> y criterio
			</h2>
		</header>

		<div class="about-grid">
			<div class="about-visual-col" use:reveal={{ delay: 0.05 }}>
				<div class="portrait-stage">
					<div class="portrait-halo" aria-hidden="true"></div>
					<div class="portrait-frame">
						<Media
							src="/images/portrait/santiago-cutout.png"
							alt="Santiago Rivero — Estudiante de Física en la UCV y desarrollador de software"
							fit="contain"
						>
							{#snippet fallback()}
								<div class="portrait-placeholder">
									<div class="placeholder-monogram">SR</div>
									<span class="placeholder-code">{santiagoProfile.badgeCode}</span>
									<span class="placeholder-note">Retrato pendiente</span>
								</div>
							{/snippet}
						</Media>
					</div>
				</div>

				<div class="figures-strip" bind:this={statsBandEl} aria-label="Cifras de trayectoria">
					{#each santiagoProfile.stats as stat (stat.id)}
						<div class="figure-item">
							<strong class="figure-value">
								{#if stat.id === 'projects-stat'}
									{projectsDisplay}
								{:else}
									{stat.value}
								{/if}
							</strong>
							<span class="figure-label">{stat.label}</span>
							<span class="figure-detail">{stat.detail}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="about-editorial-col">
				<div class="bio-stack" use:reveal={{ delay: 0.08 }}>
					{#each santiagoProfile.aboutBio as paragraph}
						<p class="bio-paragraph">{paragraph}</p>
					{/each}
				</div>

				<EducationTimeline />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.about-section {
		position: relative;
		z-index: var(--z-base);
		padding-block: var(--section-pad-y);
		border-top: 1px solid var(--border-hairline);
	}

	.section-header {
		margin-bottom: clamp(2rem, 4vw, 3rem);
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;

		@media (max-width: 960px) {
			grid-template-columns: 1fr;
		}
	}

	.about-visual-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		@media (min-width: 961px) {
			position: sticky;
			top: 6.25rem;
		}
	}

	.portrait-stage {
		position: relative;
		border-radius: var(--radius-card);
		border: 1px solid var(--border-hairline);
		background: linear-gradient(180deg, #0f172a 0%, #070b14 100%);
		min-height: 380px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		overflow: hidden;
		padding: 1.5rem 1.5rem 0;

		@media (max-width: 640px) {
			min-height: 255px;
			padding: 1rem 1rem 0;
		}
	}

	.portrait-halo {
		position: absolute;
		inset: 12% 14% 18%;
		background: radial-gradient(circle, var(--accent-mova-soft) 0%, transparent 70%);
		pointer-events: none;
		z-index: 0;
	}

	.portrait-frame {
		position: relative;
		z-index: 1;
		width: min(100%, 330px);
		height: 350px;
		-webkit-mask-image: linear-gradient(to bottom, #000 80%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 80%, transparent 100%);

		@media (max-width: 640px) {
			height: 240px;
		}

		:global(.media-box) {
			background: transparent;
		}

		:global(img) {
			filter: drop-shadow(0 8px 22px rgba(37, 99, 235, 0.16));
		}
	}

	.portrait-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
	}

	.placeholder-monogram {
		width: 104px;
		height: 104px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-main);
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
	}

	.placeholder-code {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: var(--accent-mova-light);
	}

	.placeholder-note {
		font-size: 0.76rem;
		color: var(--text-muted);
	}

	.figures-strip {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-top: 1px solid var(--border-hairline);
		border-bottom: 1px solid var(--border-hairline);

		@media (max-width: 640px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.65rem;
			border: none;
		}
	}

	.figure-item {
		padding: 1rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		&:not(:first-child) {
			border-left: 1px solid var(--border-hairline);
		}

		@media (max-width: 640px) {
			padding: 0.9rem 0.85rem;
			border-radius: 14px;
			background: var(--surface-card);
			border: 1px solid var(--border-hairline) !important;

			&:last-child {
				grid-column: 1 / -1;
				background: linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, var(--surface-card) 72%);
				border-color: rgba(59, 130, 246, 0.32) !important;
			}
		}
	}

	.figure-value {
		font-family: var(--font-display);
		font-size: 1.32rem;
		font-weight: 700;
		color: var(--text-main);
		letter-spacing: -0.02em;
	}

	.figure-label {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--text-secondary);
		line-height: 1.3;
	}

	.figure-detail {
		font-size: 0.74rem;
		color: var(--text-muted);
		line-height: 1.35;
	}

	.about-editorial-col {
		display: flex;
		flex-direction: column;
		gap: 2.35rem;
	}

	.bio-stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.bio-paragraph {
		font-size: 0.99rem;
		line-height: 1.72;
		color: var(--text-secondary);
	}
</style>
