<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Media from '$lib/components/Media.svelte';
	import { certificatesData, santiagoProfile, type Certificate } from '$lib/data/portfolioData';

	interface Props {
		onSelectCertificate: (cert: Certificate) => void;
	}

	let { onSelectCertificate }: Props = $props();

	const kuriosCert = certificatesData.find((c) => c.id === 'kurios-2026-ucode');
</script>

<div class="certs-panel" role="tabpanel" id="panel-certificates" aria-labelledby="tab-certificates">
	<article class="kurios-banner">
		<div class="banner-copy">
			<span class="banner-eyebrow">21 de marzo de 2026 · Torneo Nacional de Robótica y Tecnología</span>
			<h3>1er Lugar — Kurios Competition 2026 (Categoría U-Code)</h3>
			<p>{santiagoProfile.kuriosNarrative}</p>
		</div>

		<div class="banner-actions">
			{#if kuriosCert}
				<button
					type="button"
					class="banner-btn primary"
					onclick={() => onSelectCertificate(kuriosCert)}
				>
					<Icon name="award" size={16} />
					<span>Ver diploma</span>
				</button>
			{/if}

			<a href="/proyectos/the-last-endo" class="banner-btn secondary">
				<span>Caso The Last Endo</span>
				<Icon name="arrow-right" size={15} />
			</a>
		</div>
	</article>

	<div class="certs-grid">
		{#each certificatesData as cert (cert.id)}
			<button type="button" class="cert-card" onclick={() => onSelectCertificate(cert)}>
				<div class="cert-preview">
					<Media
						src={cert.imageUrl}
						alt={cert.title}
						fallbackLabel={cert.issuer}
						fallbackTitle={cert.title}
					/>
				</div>

				<div class="cert-body">
					<div class="cert-card-top">
						<span class="cert-badge">{cert.issuer}</span>
						<span class="cert-date">{cert.date}</span>
					</div>
					<h3 class="cert-name">{cert.title}</h3>
					<p class="cert-summary">{cert.description}</p>
					<span class="cert-cta">
						<span>Inspeccionar diploma</span>
						<Icon name="arrow-right" size={14} />
					</span>
				</div>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.certs-panel {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
	}

	.kurios-banner {
		padding: 1.5rem;
		border-radius: var(--radius-card);
		background: var(--surface-elevated);
		border: 1px solid var(--border-active);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.35rem;
		flex-wrap: wrap;

		h3 {
			font-family: var(--font-display);
			font-size: 1.2rem;
			color: var(--text-main);
			margin-bottom: 0.4rem;
		}

		p {
			max-width: 66ch;
			font-size: 0.91rem;
			color: var(--text-secondary);
			line-height: 1.6;
		}
	}

	.banner-eyebrow {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: #93c5fd;
		margin-bottom: 0.35rem;
	}

	.banner-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.banner-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.72rem 1.15rem;
		border-radius: var(--radius-pill);
		font-size: 0.85rem;
		font-weight: 600;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease;

		&.primary {
			background: var(--accent-mova);
			color: var(--text-main);

			&:hover {
				background: var(--accent-mova-light);
			}
		}

		&.secondary {
			background: var(--surface-card);
			border: 1px solid var(--border-hairline);
			color: var(--text-main);

			&:hover {
				border-color: var(--border-active);
				background: var(--surface-hover);
			}
		}
	}

	.certs-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.15rem;

		@media (max-width: 940px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		@media (max-width: 640px) {
			grid-template-columns: 1fr;
		}
	}

	.cert-card {
		text-align: left;
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			border-color 0.25s ease,
			transform 0.25s var(--ease-out-expo);

		&:hover {
			border-color: var(--border-active);
			transform: translateY(-2px);
		}
	}

	.cert-preview {
		width: 100%;
		height: 168px;
		border-bottom: 1px solid var(--border-hairline);
		background: var(--bg-obsidian);
	}

	.cert-body {
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.cert-card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.cert-badge {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--accent-mova-light);
	}

	.cert-date {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
	}

	.cert-name {
		font-family: var(--font-display);
		font-size: 1.04rem;
		color: var(--text-main);
	}

	.cert-summary {
		font-size: 0.86rem;
		color: var(--text-muted);
		line-height: 1.54;
	}

	.cert-cta {
		margin-top: auto;
		padding-top: 0.55rem;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: #93c5fd;
	}
</style>
