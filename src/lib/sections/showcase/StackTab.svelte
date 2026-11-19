<script lang="ts">
	import Icon, { type IconName } from "$lib/components/Icon.svelte";
	import { stackGroupsData } from "$lib/data/portfolioData";

	const iconById: Record<string, IconName> = {
		"dev-arch": "code",
		"ai-vision": "eye",
		"gamedev-shaders": "cube",
		"physics-comms": "atom",
	};
</script>

<div
	class="stack-grid"
	role="tabpanel"
	id="panel-stack"
	aria-labelledby="tab-stack"
>
	{#each stackGroupsData as group (group.id)}
		<article class="stack-card">
			<div class="stack-card-head">
				<span class="stack-icon" aria-hidden="true">
					<Icon name={iconById[group.id] ?? "code"} size={20} />
				</span>
				<div>
					<h3>{group.title}</h3>
					<p>{group.description}</p>
				</div>
			</div>

			<ul class="stack-list">
				{#each group.items as item}
					<li>
						<span class="stack-item-name">{item.name}</span>
						<span class="stack-item-level">{item.level}</span>
					</li>
				{/each}
			</ul>
		</article>
	{/each}
</div>

<style lang="scss">
	.stack-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.15rem;

		@media (max-width: 640px) {
			gap: 0.7rem;
		}
	}

	.stack-card {
		padding: 1.35rem;
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media (max-width: 640px) {
			padding: 0.85rem 0.75rem;
			border-radius: 16px;
			gap: 0.7rem;
		}
	}

	.stack-card-head {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;

		h3 {
			font-family: var(--font-display);
			font-size: 1.06rem;
			color: var(--text-main);
			margin-bottom: 0.2rem;
		}

		p {
			font-size: 0.85rem;
			color: var(--text-muted);
		}

		@media (max-width: 640px) {
			flex-direction: column;
			gap: 0.45rem;

			h3 {
				font-size: 0.9rem;
				line-height: 1.2;
				margin-bottom: 0;
			}

			p {
				display: none;
			}
		}
	}

	.stack-icon {
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		border-radius: 12px;
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: #93c5fd;
		display: grid;
		place-items: center;

		@media (max-width: 640px) {
			width: 32px;
			height: 32px;
			border-radius: 9px;
		}
	}

	.stack-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;

		li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.75rem;
			padding: 0.6rem 0.8rem;
			border-radius: 10px;
			background: var(--surface-subtle);
			border: 1px solid var(--border-hairline);

			@media (max-width: 640px) {
				flex-direction: column;
				align-items: flex-start;
				gap: 0.14rem;
				padding: 0.46rem 0.55rem;
				border-radius: 9px;
			}
		}
	}

	.stack-item-name {
		font-size: 0.87rem;
		font-weight: 500;
		color: var(--text-main);

		@media (max-width: 640px) {
			font-size: 0.76rem;
			line-height: 1.25;
		}
	}

	.stack-item-level {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent-mova-light);
		text-align: right;

		@media (max-width: 640px) {
			font-size: 0.62rem;
			text-align: left;
			line-height: 1.25;
		}
	}
</style>
