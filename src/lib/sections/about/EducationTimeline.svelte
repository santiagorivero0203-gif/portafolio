<script lang="ts">
	import { personalTouchesData, santiagoProfile } from '$lib/data/portfolioData';
	import { reveal } from '$lib/motion/reveal';
</script>

<div class="timeline-block" use:reveal={{ delay: 0.12 }}>
	<h3 class="mono-label block-label">Formación e hitos</h3>
	<ol class="editorial-timeline">
		{#each santiagoProfile.educationAndMilestones as item (item.id)}
			<li class="timeline-row">
				<span class="timeline-period">{item.period}</span>
				<div class="timeline-content">
					<span class="timeline-inst">{item.institution}</span>
					<h4 class="timeline-title">{item.title}</h4>
					<p class="timeline-desc">{item.description}</p>
				</div>
			</li>
		{/each}
	</ol>
</div>

<div class="personal-block" use:reveal={{ delay: 0.16 }}>
	<h3 class="mono-label block-label">Habilidades transversales e intereses</h3>
	<div class="personal-list">
		{#each personalTouchesData as touch (touch.id)}
			<article class="personal-item">
				<span class="personal-tag">{touch.tag}</span>
				<h4 class="personal-title">{touch.title}</h4>
				<p class="personal-desc">{touch.description}</p>
				<div class="personal-meta">
					{#each touch.details as detail}
						<span>{detail}</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</div>

<style lang="scss">
	.block-label {
		margin-bottom: 1rem;
	}

	.editorial-timeline {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.timeline-row {
		display: grid;
		grid-template-columns: 108px minmax(0, 1fr);
		gap: 1.25rem;
		padding-block: 1rem;
		border-top: 1px solid var(--border-hairline);

		@media (max-width: 560px) {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}
	}

	.timeline-period {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: var(--accent-mova-light);
		padding-top: 0.2rem;
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.24rem;
		border-left: 1px solid var(--border-hairline);
		padding-left: 1.1rem;

		@media (max-width: 560px) {
			border-left: none;
			padding-left: 0;
		}
	}

	.timeline-inst {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.timeline-title {
		font-family: var(--font-display);
		font-size: 1.04rem;
		font-weight: 600;
		color: var(--text-main);
	}

	.timeline-desc {
		font-size: 0.89rem;
		color: var(--text-muted);
		line-height: 1.56;
	}

	.personal-list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.15rem;
		border-top: 1px solid var(--border-hairline);
		padding-top: 1.25rem;

		@media (max-width: 780px) {
			grid-template-columns: 1fr;
		}
	}

	.personal-item {
		display: flex;
		flex-direction: column;
		gap: 0.38rem;
	}

	.personal-tag {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent-mova-light);
	}

	.personal-title {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-main);
	}

	.personal-desc {
		font-size: 0.86rem;
		color: var(--text-muted);
		line-height: 1.55;
	}

	.personal-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 0.75rem;
		margin-top: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.71rem;
		color: var(--text-secondary);
	}
</style>
