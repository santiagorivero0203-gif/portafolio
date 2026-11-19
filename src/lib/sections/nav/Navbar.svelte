<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Icon, { type IconName } from '$lib/components/Icon.svelte';
	import { scrollToTarget } from '$lib/motion/lenis';

	interface NavItem {
		id: string;
		label: string;
		shortLabel: string;
		icon: IconName;
	}

	const navItems: NavItem[] = [
		{ id: 'inicio', label: 'Inicio', shortLabel: 'Inicio', icon: 'home' },
		{ id: 'sobre-mi', label: 'Sobre mí', shortLabel: 'Sobre mí', icon: 'user' },
		{ id: 'proyectos', label: 'Portafolio', shortLabel: 'Proyectos', icon: 'grid' },
		{ id: 'respaldo', label: 'Respaldo', shortLabel: 'Respaldo', icon: 'award' },
		{ id: 'contacto', label: 'Contacto', shortLabel: 'Contacto', icon: 'mail' }
	];

	let activeId = $state<string>('inicio');
	let isScrolled = $state(false);

	let navTrackEl = $state<HTMLDivElement | undefined>(undefined);
	let buttonEls = $state<Record<string, HTMLButtonElement | null>>({});

	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let indicatorVisible = $state(false);

	const isHome = $derived(page.url.pathname === '/');

	function updateIndicator() {
		const targetId =
			!isHome && page.url.pathname.startsWith('/proyectos') ? 'proyectos' : activeId;
		const activeBtn = buttonEls[targetId];
		if (!activeBtn || !navTrackEl) return;

		indicatorLeft = activeBtn.offsetLeft;
		indicatorWidth = activeBtn.offsetWidth;
		indicatorVisible = true;
	}

	function getScrollOffset(): number {
		if (typeof window === 'undefined') return -88;
		// Mobile dock sits at bottom, so top of section needs almost no top offset
		return window.innerWidth <= 780 ? -20 : -88;
	}

	async function navigateTo(id: string) {
		activeId = id;
		const offset = getScrollOffset();

		if (!isHome) {
			await goto(`/#${id}`);
			setTimeout(() => {
				const el = document.getElementById(id);
				if (el) scrollToTarget(el, offset);
			}, 60);
			return;
		}

		const target = document.getElementById(id);
		if (target) {
			scrollToTarget(target, offset);
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
		<!-- Desktop pill navbar (> 780px) -->
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

		<!-- Functional Mobile Bottom Dock (<= 780px) -->
		<div class="mobile-dock" role="navigation" aria-label="Acceso rápido móvil">
			{#each navItems as item (item.id)}
				{@const isItemActive =
					(!isHome && page.url.pathname.startsWith('/proyectos') && item.id === 'proyectos') ||
					(isHome && activeId === item.id)}
				<button
					type="button"
					class="dock-item"
					class:active={isItemActive}
					aria-current={isItemActive ? 'page' : undefined}
					onclick={() => navigateTo(item.id)}
				>
					<Icon name={item.icon} size={17} strokeWidth={isItemActive ? 2.1 : 1.7} />
					<span>{item.shortLabel}</span>
				</button>
			{/each}
		</div>
	</nav>
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

		@media (max-width: 780px) {
			top: auto;
			bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
			width: min(calc(100% - 1.15rem), 430px);

			&.scrolled {
				top: auto;
			}
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

		@media (max-width: 780px) {
			padding: 0.32rem;
			border-radius: 22px;
			background: rgba(11, 17, 32, 0.9);
			border-color: var(--border-strong);
			box-shadow: 0 14px 36px rgba(2, 6, 23, 0.58);
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

		@media (max-width: 780px) {
			display: none;
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
		border: 1px solid rgba(59, 130, 246, 0.4);
		opacity: 0;
		pointer-events: none;
		transition:
			transform 0.38s var(--ease-out-expo),
			width 0.38s var(--ease-out-expo),
			opacity 0.2s ease;

		&.visible {
			opacity: 1;
		}
	}

	.nav-link {
		position: relative;
		z-index: 1;
		padding: 0.48rem 0.92rem;
		border-radius: var(--radius-pill);
		font-size: 0.87rem;
		font-weight: 500;
		color: var(--text-muted);
		transition: color 0.25s ease;

		&:hover,
		&.active {
			color: var(--text-main);
		}
	}

	.cta-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.42rem;
		padding: 0.5rem 0.98rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova);
		color: var(--text-main);
		font-size: 0.84rem;
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

	.mobile-dock {
		display: none;

		@media (max-width: 780px) {
			display: grid;
			grid-template-columns: repeat(5, minmax(0, 1fr));
			gap: 0.22rem;
			width: 100%;
		}
	}

	.dock-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		padding: 0.44rem 0.2rem;
		border-radius: 16px;
		color: var(--text-muted);
		transition:
			background-color 0.22s ease,
			color 0.22s ease,
			transform 0.2s var(--ease-out-expo);

		span {
			font-family: var(--font-sans);
			font-size: 0.64rem;
			font-weight: 500;
			line-height: 1;
			letter-spacing: 0.01em;
			white-space: nowrap;
		}

		&.active {
			background: var(--accent-mova);
			color: var(--text-main);
			box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);

			span {
				font-weight: 600;
			}
		}

		&:active {
			transform: scale(0.95);
		}
	}
</style>
