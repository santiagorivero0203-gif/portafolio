<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';
	import { scrollToTarget } from '$lib/motion/lenis';

	interface NavItem {
		id: string;
		label: string;
	}

	const navItems: NavItem[] = [
		{ id: 'inicio', label: 'Inicio' },
		{ id: 'sobre-mi', label: 'Sobre mí' },
		{ id: 'proyectos', label: 'Portafolio' },
		{ id: 'respaldo', label: 'Respaldo' },
		{ id: 'contacto', label: 'Contacto' }
	];

	let activeId = $state<string>('inicio');
	let isScrolled = $state(false);
	let mobileOpen = $state(false);

	let navTrackEl = $state<HTMLDivElement | undefined>(undefined);
	let buttonEls = $state<Record<string, HTMLButtonElement | null>>({});

	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let indicatorVisible = $state(false);

	const isHome = $derived(page.url.pathname === '/');

	function updateIndicator() {
		const targetId = !isHome && page.url.pathname.startsWith('/proyectos') ? 'proyectos' : activeId;
		const activeBtn = buttonEls[targetId];
		if (!activeBtn || !navTrackEl) return;

		indicatorLeft = activeBtn.offsetLeft;
		indicatorWidth = activeBtn.offsetWidth;
		indicatorVisible = true;
	}

	async function navigateTo(id: string) {
		activeId = id;
		mobileOpen = false;

		if (!isHome) {
			await goto(`/#${id}`);
			setTimeout(() => {
				const el = document.getElementById(id);
				if (el) scrollToTarget(el, -88);
			}, 60);
			return;
		}

		const target = document.getElementById(id);
		if (target) {
			scrollToTarget(target, -88);
		}
	}

	$effect(() => {
		activeId;
		isHome;
		page.url.pathname;
		requestAnimationFrame(() => updateIndicator());
	});

	$effect(() => {
		const handleScrollState = () => {
			isScrolled = window.scrollY > 24;
		};
		const handleResize = () => updateIndicator();

		handleScrollState();
		updateIndicator();

		window.addEventListener('scroll', handleScrollState, { passive: true });
		window.addEventListener('resize', handleResize);

		let observer: IntersectionObserver | undefined;
		if (isHome) {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeId = entry.target.id;
						}
					}
				},
				{ rootMargin: '-38% 0px -48% 0px', threshold: 0 }
			);

			for (const item of navItems) {
				const el = document.getElementById(item.id);
				if (el) observer.observe(el);
			}
		}

		return () => {
			window.removeEventListener('scroll', handleScrollState);
			window.removeEventListener('resize', handleResize);
			observer?.disconnect();
		};
	});
</script>

<header class="navbar-wrapper" class:scrolled={isScrolled}>
	<nav class="pill-navbar" aria-label="Navegación principal">
		<button
			type="button"
			class="brand-badge"
			onclick={() => navigateTo('inicio')}
			aria-label="Ir al inicio"
		>
			<span class="brand-name">SR</span>
		</button>

		<div class="nav-track" bind:this={navTrackEl}>
			<span
				class="active-pill"
				class:visible={indicatorVisible}
				style="transform: translateX({indicatorLeft}px); width: {indicatorWidth}px;"
				aria-hidden="true"
			></span>

			{#each navItems as item (item.id)}
				{@const isItemActive =
					(!isHome && page.url.pathname.startsWith('/proyectos') && item.id === 'proyectos') ||
					(isHome && activeId === item.id)}
				<button
					type="button"
					class="nav-link"
					class:active={isItemActive}
					bind:this={buttonEls[item.id]}
					onclick={() => navigateTo(item.id)}
				>
					{item.label}
				</button>
			{/each}
		</div>

		<button type="button" class="cta-pill" onclick={() => navigateTo('proyectos')}>
			<span>Proyectos</span>
			<Icon name="arrow-right" size={14} />
		</button>

		<button
			type="button"
			class="mobile-toggle"
			aria-expanded={mobileOpen}
			aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="bar" class:open={mobileOpen}></span>
			<span class="bar" class:open={mobileOpen}></span>
		</button>
	</nav>

	{#if mobileOpen}
		<div class="mobile-menu" role="dialog" aria-label="Menú móvil">
			{#each navItems as item (item.id)}
				<button
					type="button"
					class="mobile-link"
					class:active={isHome && activeId === item.id}
					onclick={() => navigateTo(item.id)}
				>
					{item.label}
				</button>
			{/each}
		</div>
	{/if}
</header>

<style lang="scss">
	.navbar-wrapper {
		position: fixed;
		top: 1.1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: var(--z-nav);
		width: min(calc(100% - 1.5rem), 840px);
		transition: top 0.35s var(--ease-out-expo);

		&.scrolled {
			top: 0.8rem;
		}
	}

	.pill-navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.38rem 0.42rem 0.38rem 0.62rem;
		border-radius: var(--radius-pill);
		background: var(--surface-glass);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--border-hairline);
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;

		.scrolled & {
			background: rgba(11, 17, 32, 0.9);
			border-color: var(--border-strong);
		}
	}

	.brand-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.42rem 0.82rem;
		border-radius: var(--radius-pill);
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.9rem;
		letter-spacing: 0.04em;
		color: var(--text-main);
		transition: background-color 0.25s ease;

		&:hover {
			background: var(--surface-subtle);
		}
	}

	.nav-track {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.1rem;

		@media (max-width: 780px) {
			display: none;
		}
	}

	.active-pill {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		border: 1px solid rgba(59, 130, 246, 0.35);
		opacity: 0;
		pointer-events: none;
		transition:
			transform 0.4s var(--ease-out-expo),
			width 0.4s var(--ease-out-expo),
			opacity 0.2s ease;

		&.visible {
			opacity: 1;
		}
	}

	.nav-link {
		position: relative;
		z-index: 1;
		padding: 0.44rem 0.78rem;
		border-radius: var(--radius-pill);
		font-size: 0.84rem;
		font-weight: 500;
		color: var(--text-muted);
		transition: color 0.22s ease;
		white-space: nowrap;

		&:hover,
		&.active {
			color: var(--text-main);
		}
	}

	.cta-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.46rem 0.92rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova);
		color: var(--text-main);
		font-size: 0.83rem;
		font-weight: 600;
		transition:
			background-color 0.25s ease,
			transform 0.25s var(--ease-out-expo);

		&:hover {
			background: var(--accent-mova-light);
			transform: translateY(-1px);
		}

		@media (max-width: 780px) {
			display: none;
		}
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 38px;
		height: 38px;
		border-radius: var(--radius-pill);
		border: 1px solid var(--border-hairline);
		background: var(--surface-subtle);

		@media (max-width: 780px) {
			display: inline-flex;
		}
	}

	.bar {
		width: 16px;
		height: 1.5px;
		background: var(--text-main);
		border-radius: 2px;
		transition: transform 0.25s ease;

		&:first-child.open {
			transform: translateY(3.2px) rotate(45deg);
		}

		&:last-child.open {
			transform: translateY(-3.2px) rotate(-45deg);
		}
	}

	.mobile-menu {
		margin-top: 0.5rem;
		padding: 0.55rem;
		border-radius: 18px;
		background: rgba(11, 17, 32, 0.94);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--border-hairline);
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		@media (min-width: 781px) {
			display: none;
		}
	}

	.mobile-link {
		text-align: left;
		padding: 0.7rem 0.95rem;
		border-radius: 12px;
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--text-muted);

		&.active,
		&:hover {
			background: var(--accent-mova-soft);
			color: var(--text-main);
		}
	}
</style>
