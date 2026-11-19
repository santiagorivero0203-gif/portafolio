<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { recommendationsData, verifiableProofData } from '$lib/data/portfolioData';
	import { reveal } from '$lib/motion/reveal';

	const verifiedQuotes = recommendationsData.filter((item) => item.verified);
</script>

<section id="respaldo" class="proof-section">
	<div class="container">
		<header class="section-header" use:reveal>
			<span class="mono-label">Respaldo verificable</span>
			<h2 class="heading-lg">Hechos documentados y entornos reales</h2>
			<p class="section-lead">
				Evidencia concreta de competencias, entregas comerciales y formación acreditada.
			</p>
		</header>

		<div class="proof-list" use:reveal={{ delay: 0.06 }}>
			{#each verifiableProofData as proof (proof.id)}
				<article class="proof-row">
					<div class="proof-meta">
						<span class="proof-kind">{proof.kind}</span>
						<span class="proof-entity">{proof.entity}</span>
					</div>

					<div class="proof-body">
						<h3>{proof.title}</h3>
						<p>{proof.summary}</p>
						<span class="proof-evidence">{proof.evidence}</span>
					</div>

					<div class="proof-action">
						{#if proof.actionHref && proof.actionLabel}
							<a href={proof.actionHref} class="proof-link">
								<span>{proof.actionLabel}</span>
								<Icon name="arrow-right" size={14} />
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		{#if verifiedQuotes.length > 0}
			<div class="quotes-grid">
				{#each verifiedQuotes as rec (rec.id)}
					<article class="quote-card">
						<span class="quote-group">{rec.group}</span>
						<blockquote>"{rec.quote}"</blockquote>
						<footer>
							<strong>{rec.authorName}</strong>
							<span>{rec.authorRole} · {rec.organization}</span>
						</footer>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.proof-section {
		position: relative;
		z-index: var(--z-base);
		padding-block: var(--section-pad-y);
		border-top: 1px solid var(--border-hairline);
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		margin-bottom: 2.25rem;
	}

	.section-lead {
		max-width: 60ch;
		color: var(--text-muted);
		font-size: 0.96rem;
	}

	.proof-list {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--border-hairline);
	}

	.proof-row {
		display: grid;
		grid-template-columns: minmax(180px, 0.72fr) minmax(0, 1.55fr) auto;
		gap: 1.5rem;
		align-items: start;
		padding-block: 1.35rem;
		border-top: 1px solid var(--border-hairline);

		@media (max-width: 820px) {
			grid-template-columns: 1fr;
			gap: 0.7rem;
		}
	}

	.proof-meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.proof-kind {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent-mova-light);
	}

	.proof-entity {
		font-size: 0.88rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.proof-body {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;

		h3 {
			font-family: var(--font-display);
			font-size: 1.08rem;
			font-weight: 600;
			color: var(--text-main);
		}

		p {
			font-size: 0.9rem;
			color: var(--text-muted);
			line-height: 1.58;
		}
	}

	.proof-evidence {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--text-secondary);
	}

	.proof-action {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		@media (max-width: 820px) {
			justify-content: flex-start;
		}
	}

	.proof-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--accent-mova-light);
		white-space: nowrap;
		transition: color 0.2s ease;

		&:hover {
			color: var(--text-main);
		}
	}

	.quotes-grid {
		margin-top: 2.25rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.15rem;
	}

	.quote-card {
		padding: 1.35rem;
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		display: flex;
		flex-direction: column;
		gap: 0.9rem;

		blockquote {
			font-size: 0.92rem;
			line-height: 1.6;
			color: var(--text-main);
		}

		footer {
			display: flex;
			flex-direction: column;
			gap: 0.15rem;
			padding-top: 0.75rem;
			border-top: 1px solid var(--border-hairline);

			strong {
				font-family: var(--font-display);
				font-size: 0.9rem;
			}

			span {
				font-size: 0.78rem;
				color: var(--text-muted);
			}
		}
	}

	.quote-group {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent-mova-light);
	}
</style>
