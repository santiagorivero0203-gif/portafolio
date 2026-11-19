<script lang="ts">
	import { replaceState } from '$app/navigation';
	import type { Certificate } from '$lib/data/portfolioData';
	import { reveal } from '$lib/motion/reveal';
	import CertificateLightbox from './CertificateLightbox.svelte';
	import CredentialsTab from './CredentialsTab.svelte';
	import ProjectsTab from './ProjectsTab.svelte';
	import StackTab from './StackTab.svelte';
	import TeamVideoTab from './TeamVideoTab.svelte';

	export type ShowcaseTabId = 'projects' | 'certificates' | 'team_video' | 'stack';

	interface Props {
		activeTab?: ShowcaseTabId;
		onTabChange?: (tab: ShowcaseTabId) => void;
	}

	const tabs: { id: ShowcaseTabId; label: string }[] = [
		{ id: 'projects', label: 'Proyectos (6)' },
		{ id: 'certificates', label: 'Certificados y premios' },
		{ id: 'team_video', label: 'Equipos y edición' },
		{ id: 'stack', label: 'Tech stack' }
	];

	const validTabs = new Set<ShowcaseTabId>(tabs.map((t) => t.id));

	let { activeTab = $bindable<ShowcaseTabId>('projects'), onTabChange }: Props = $props();
	let selectedCertificate = $state<Certificate | null>(null);
	let tabEls = $state<Record<string, HTMLButtonElement | null>>({});

	$effect(() => {
		if (typeof window === 'undefined') return;
		const urlTab = new URLSearchParams(window.location.search).get('tab') as ShowcaseTabId | null;
		if (urlTab && validTabs.has(urlTab)) {
			activeTab = urlTab;
		}
	});

	function selectTab(tab: ShowcaseTabId) {
		activeTab = tab;
		onTabChange?.(tab);

		if (typeof window !== 'undefined') {
			const url = new URL(window.location.href);
			if (tab === 'projects') {
				url.searchParams.delete('tab');
			} else {
				url.searchParams.set('tab', tab);
			}
			replaceState(url, {});
		}
	}

	function handleTabKeyDown(event: KeyboardEvent, index: number) {
		let nextIndex = index;
		if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
		else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
		else if (event.key === 'Home') nextIndex = 0;
		else if (event.key === 'End') nextIndex = tabs.length - 1;
		else return;

		event.preventDefault();
		const nextTab = tabs[nextIndex];
		selectTab(nextTab.id);
		tabEls[nextTab.id]?.focus();
	}
</script>

<section id="proyectos" class="showcase-section">
	<div class="container">
		<div class="showcase-header" use:reveal>
			<div class="header-copy">
				<span class="mono-label">Portafolio</span>
				<h2 class="heading-lg">
					Proyectos, credenciales e <em class="serif-accent">ingeniería</em>
				</h2>
				<p class="section-lead">
					Seis proyectos entre visión artificial, videojuegos 2D, sistemas comerciales,
					modelado discreto y herramientas académicas privadas.
				</p>
			</div>

			<div class="tabs-bar" role="tablist" aria-label="Categorías del portafolio">
				{#each tabs as tab, idx (tab.id)}
					<button
						type="button"
						role="tab"
						id="tab-{tab.id}"
						aria-controls="panel-{tab.id}"
						aria-selected={activeTab === tab.id}
						tabindex={activeTab === tab.id ? 0 : -1}
						bind:this={tabEls[tab.id]}
						class="tab-btn"
						class:active={activeTab === tab.id}
						onclick={() => selectTab(tab.id)}
						onkeydown={(e) => handleTabKeyDown(e, idx)}
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>

		{#if activeTab === 'projects'}
			<ProjectsTab />
		{:else if activeTab === 'certificates'}
			<CredentialsTab onSelectCertificate={(cert) => (selectedCertificate = cert)} />
		{:else if activeTab === 'team_video'}
			<TeamVideoTab />
		{:else}
			<StackTab />
		{/if}
	</div>
</section>

<CertificateLightbox
	certificate={selectedCertificate}
	onclose={() => (selectedCertificate = null)}
/>

<style lang="scss">
	.showcase-section {
		position: relative;
		z-index: var(--z-base);
		padding-block: var(--section-pad-y);
		border-top: 1px solid var(--border-hairline);
		background: rgba(15, 23, 42, 0.28);
	}

	.showcase-header {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2.25rem;
	}

	.header-copy {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.section-lead {
		max-width: 64ch;
		color: var(--text-muted);
		font-size: 0.96rem;
	}

	.tabs-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tab-btn {
		padding: 0.6rem 1.08rem;
		border-radius: var(--radius-pill);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		font-size: 0.86rem;
		font-weight: 500;
		color: var(--text-muted);
		transition:
			background-color 0.22s ease,
			border-color 0.22s ease,
			color 0.22s ease;

		&:hover {
			color: var(--text-main);
			border-color: var(--border-strong);
		}

		&.active {
			background: var(--accent-mova);
			border-color: var(--accent-mova-light);
			color: var(--text-main);
		}
	}
</style>
