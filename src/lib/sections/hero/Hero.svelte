<script lang="ts">
	import HeroLanyard3D from "$lib/3d/lanyard/HeroLanyard3D.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { santiagoProfile } from "$lib/data/portfolioData";
	import { scrollToTarget } from "$lib/motion/lenis";
	import { observeReducedMotion } from "$lib/motion/reducedMotion.svelte";

	interface Props {
		onOpenCredentials?: () => void;
	}

	let { onOpenCredentials }: Props = $props();

	const roles = santiagoProfile.dynamicRoles;

	let roleIndex = $state(0);
	let displayedRole = $state(roles[0] ?? "");
	let isDeleting = $state(false);
	let reducedMotion = $state(false);

	$effect(() => {
		return observeReducedMotion((reduced) => {
			reducedMotion = reduced;
			if (reduced) {
				displayedRole = roles[0] ?? "";
			}
		});
	});

	$effect(() => {
		if (!roles.length || reducedMotion) return;

		let timeoutId: ReturnType<typeof setTimeout>;
		const currentFull = roles[roleIndex] ?? "";

		if (!isDeleting && displayedRole === currentFull) {
			timeoutId = setTimeout(() => {
				isDeleting = true;
			}, 2200);
		} else if (isDeleting && displayedRole === "") {
			isDeleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
		} else {
			const nextLength = displayedRole.length + (isDeleting ? -1 : 1);
			const delay = isDeleting ? 22 : 42;

			timeoutId = setTimeout(() => {
				displayedRole = currentFull.slice(0, nextLength);
			}, delay);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	});

	function goToProjects() {
		scrollToTarget("#proyectos", -88);
	}

	function goToCredentials() {
		onOpenCredentials?.();
		scrollToTarget("#proyectos", -88);
	}
</script>

<section id="inicio" class="hero-section">
	<div class="container hero-grid">
		<div class="hero-copy">
			<p class="hero-status">
				<span>{santiagoProfile.statusBadge}</span>
			</p>

			<div class="hero-identity">
				<span class="identity-name">{santiagoProfile.displayName}</span>
				<span class="identity-sep" aria-hidden="true">/</span>
				<span class="identity-loc">{santiagoProfile.location}</span>
			</div>

			<div class="typewriter-line" aria-live="polite">
				<span class="typewriter-prefix">&gt;_</span>
				<span class="typewriter-text">{displayedRole}</span>
				{#if !reducedMotion}
					<span class="typewriter-caret" aria-hidden="true"></span>
				{/if}
			</div>

			<h1 class="display-xl hero-title">
				Ingeniería de software, física y <em class="serif-accent"
					>comunicación clara.</em
				>
			</h1>

			<p class="body-lg hero-description">{santiagoProfile.heroBio}</p>

			<div class="hero-actions">
				<button
					type="button"
					class="btn-primary"
					onclick={goToProjects}
				>
					<span>Explorar proyectos</span>
					<Icon name="arrow-right" size={16} />
				</button>

				<button
					type="button"
					class="btn-secondary"
					onclick={goToCredentials}
				>
					<Icon name="award" size={16} />
					<span>Ver credenciales</span>
				</button>
			</div>
		</div>

		<div class="hero-visual">
			<HeroLanyard3D />
		</div>
	</div>
</section>

<style lang="scss">
	.hero-section {
		position: relative;
		min-height: 100svh;
		display: flex;
		align-items: flex-start;
		padding-top: 0;
		padding-bottom: clamp(3.5rem, 6vw, 5rem);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
		gap: clamp(1.5rem, 4.5vw, 4rem);
		align-items: start;

		@media (max-width: 960px) {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	.hero-copy {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: clamp(7.5rem, 13vw, 9.75rem);

		@media (max-width: 960px) {
			padding-top: 0.5rem;
		}
	}

	.hero-status {
		display: inline-flex;
		align-items: center;
		padding: 0.3rem 0.78rem;
		border-radius: var(--radius-pill);
		border: 1px solid var(--border-hairline);
		background: var(--surface-subtle);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--text-secondary);
		margin-bottom: 1.35rem;
	}

	.hero-identity {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem 0.5rem;
		font-family: var(--font-display);
		font-size: 0.96rem;
		font-weight: 600;
		color: var(--text-main);
		margin-bottom: 0.45rem;
	}

	.identity-sep {
		color: var(--border-strong);
	}

	.identity-loc {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.typewriter-line {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 1.65rem;
		font-family: var(--font-mono);
		font-size: clamp(0.84rem, 1.15vw, 0.95rem);
		color: #93c5fd;
		margin-bottom: 1rem;
	}

	.typewriter-prefix {
		color: var(--accent-mova-light);
		font-weight: 500;
	}

	.typewriter-caret {
		width: 2px;
		height: 1.05em;
		background: var(--accent-mova-light);
		animation: blinkCaret 0.95s steps(1) infinite;
	}

	@keyframes blinkCaret {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	.hero-title {
		max-width: 17ch;
		margin-bottom: 1.35rem;
	}

	.hero-description {
		max-width: 54ch;
		margin-bottom: 2.15rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		width: 100%;

		@media (max-width: 540px) {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.6rem;

			.btn-primary,
			.btn-secondary {
				width: 100%;
				justify-content: center;
				padding: 0.76rem 0.7rem;
				font-size: 0.84rem;
				white-space: nowrap;
			}
		}
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.84rem 1.45rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova);
		color: var(--text-main);
		font-weight: 600;
		font-size: 0.94rem;
		transition:
			background-color 0.25s ease,
			transform 0.25s var(--ease-out-expo);

		&:hover {
			background: var(--accent-mova-light);
			transform: translateY(-2px);
		}
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.84rem 1.35rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		color: var(--text-main);
		font-weight: 500;
		font-size: 0.94rem;
		transition:
			border-color 0.25s ease,
			background-color 0.25s ease;

		&:hover {
			border-color: var(--border-active);
			background: var(--surface-hover);
		}
	}

	.hero-visual {
		width: 100%;
		max-width: 460px;
		margin-inline: auto;
		padding-top: 6.2rem;

		@media (max-width: 960px) {
			order: -1;
			max-width: 100%;
			padding-top: 4.35rem;
		}
	}
</style>
