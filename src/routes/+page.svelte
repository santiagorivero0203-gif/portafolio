<script lang="ts">
	import AboutSection from '$lib/sections/about/AboutSection.svelte';
	import Hero from '$lib/sections/hero/Hero.svelte';
	import ProofSection from '$lib/sections/recommendations/ProofSection.svelte';
	import PortfolioShowcase, {
		type ShowcaseTabId
	} from '$lib/sections/showcase/PortfolioShowcase.svelte';

	let activeShowcaseTab = $state<ShowcaseTabId>('projects');
</script>

<Hero onOpenCredentials={() => (activeShowcaseTab = 'certificates')} />
<AboutSection />
<PortfolioShowcase bind:activeTab={activeShowcaseTab} />
<ProofSection />
