<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Media from '$lib/components/Media.svelte';
	import type { Certificate } from '$lib/data/portfolioData';

	interface Props {
		certificate: Certificate | null;
		onclose: () => void;
	}

	let { certificate, onclose }: Props = $props();
</script>

<Dialog open={certificate !== null} titleId="lightbox-cert-title" maxWidth="840px" {onclose}>
	{#if certificate}
		<div class="lightbox-inner">
			<div class="lightbox-top">
				<div>
					<span class="cert-kicker">
						{certificate.issuer} · {certificate.date}
						{#if certificate.location}
							· {certificate.location}
						{/if}
					</span>
					<h3 id="lightbox-cert-title" class="cert-title">{certificate.title}</h3>
					{#if certificate.credentialCode}
						<span class="cert-code">{certificate.credentialCode}</span>
					{/if}
				</div>
				<button type="button" class="close-btn" aria-label="Cerrar visor" onclick={onclose}>
					<Icon name="close" size={18} />
				</button>
			</div>

			<div class="diploma-stage">
				<Media src={certificate.imageUrl} alt={certificate.title} fit="contain">
					{#snippet fallback()}
						<div class="diploma-placeholder">
							<span class="seal-pill">{certificate.category}</span>
							<h4>{certificate.title}</h4>
							<p>Otorgado a Santiago Alfonso Rivero Méndez</p>
							<small>Imagen pendiente de carga</small>
						</div>
					{/snippet}
				</Media>
			</div>

			<p class="cert-desc">{certificate.description}</p>

			{#if certificate.highlights?.length}
				<ul class="cert-highlights">
					{#each certificate.highlights as point}
						<li>{point}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</Dialog>

<style lang="scss">
	.lightbox-inner {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.lightbox-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.cert-kicker {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--accent-mova-light);
		margin-bottom: 0.25rem;
	}

	.cert-title {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 2.2vw, 1.55rem);
		font-weight: 700;
		color: var(--text-main);
	}

	.cert-code {
		display: inline-block;
		margin-top: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--text-muted);
	}

	.close-btn {
		width: 38px;
		height: 38px;
		flex-shrink: 0;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		color: var(--text-main);
		transition:
			border-color 0.25s ease,
			background-color 0.25s ease;

		&:hover {
			border-color: var(--border-active);
			background: var(--surface-hover);
		}
	}

	.diploma-stage {
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--border-hairline);
		background: var(--bg-obsidian);
		height: clamp(260px, 52vh, 480px);
	}

	.diploma-placeholder {
		width: 100%;
		height: 100%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		text-align: center;

		h4 {
			font-family: var(--font-display);
			font-size: 1.18rem;
			color: var(--text-main);
		}

		p,
		small {
			font-size: 0.86rem;
			color: var(--text-muted);
		}
	}

	.seal-pill {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		padding: 0.25rem 0.7rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: #bfdbfe;
	}

	.cert-desc {
		font-size: 0.94rem;
		line-height: 1.62;
		color: var(--text-secondary);
	}

	.cert-highlights {
		padding-left: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.88rem;
		color: var(--text-muted);
	}
</style>
