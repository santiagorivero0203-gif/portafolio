<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Media from '$lib/components/Media.svelte';
	import {
		santiagoProfile,
		teamAndResearchData,
		videoEditingData
	} from '$lib/data/portfolioData';

	let activeReelId = $state<string>(videoEditingData[0]?.id ?? 'tech-devlog-cut');

	const activeReel = $derived(
		videoEditingData.find((item) => item.id === activeReelId) ?? videoEditingData[0]
	);
</script>

<div class="team-video-panel" role="tabpanel" id="panel-team_video" aria-labelledby="tab-team_video">
	<div class="team-block">
		<h3 class="panel-heading">Equipos, Liderazgo y Proyectos Clave</h3>
		<div class="team-cards-grid">
			{#each teamAndResearchData as team (team.id)}
				<article class="team-card">
					<div class="team-photo-box">
						{#if team.imageUrl}
							<Media
								src={team.imageUrl}
								alt={team.imageCaption}
								fallbackLabel={team.context}
								fallbackTitle={team.imageCaption}
							/>
						{/if}
					</div>

					<div class="team-info">
						<span class="team-meta">{team.period} · {team.role}</span>
						<h4>{team.title}</h4>
						<p>{team.summary}</p>

						{#if team.collaborators?.length}
							<p class="team-collabs">
								<strong>Equipo:</strong> {team.collaborators.join(', ')}
							</p>
						{/if}

						{#if team.methods?.length}
							<ul class="team-methods">
								{#each team.methods as method}
									<li>{method}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>

	<div class="video-block">
		<div class="video-header">
			<h3 class="panel-heading">Edición Básica de Video en CapCut</h3>
			<p class="video-summary">{santiagoProfile.videoEditingSummary}</p>
		</div>

		<div class="showreel-shell">
			<div class="showreel-stage">
				{#if activeReel}
					<div class="reel-player">
						<Media
							src={activeReel.videoUrl ?? ''}
							alt={activeReel.title}
							kind="video"
							controls={true}
							fit="contain"
						>
							{#snippet fallback()}
								<div class="reel-fallback">
									<span class="showreel-badge">{santiagoProfile.tiktokHandle} · Showreel</span>
									<h4>{activeReel.title}</h4>
									<p>{activeReel.description}</p>
									<div class="showreel-meta">
										<span>Enfoque: {activeReel.focus}</span>
										<span>Duración ref.: {activeReel.duration}</span>
									</div>
								</div>
							{/snippet}
						</Media>
					</div>

					<div class="reel-caption">
						<strong>{activeReel.title}</strong>
						<span>{activeReel.focus} · {activeReel.duration}</span>
					</div>
				{/if}
			</div>

			<div class="showreel-list">
				{#each videoEditingData as reel (reel.id)}
					<button
						type="button"
						class="reel-item"
						class:active={activeReelId === reel.id}
						onclick={() => (activeReelId = reel.id)}
					>
						<div class="reel-copy">
							<span class="reel-play">
								<Icon name="play" size={14} />
								<strong>{reel.title}</strong>
							</span>
							<span>{reel.focus}</span>
						</div>
						<span class="reel-dur">{reel.duration}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.team-video-panel {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.panel-heading {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-main);
		margin-bottom: 0.75rem;
	}

	.team-cards-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;

		@media (max-width: 820px) {
			grid-template-columns: 1fr;
		}
	}

	.team-card {
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.team-photo-box {
		height: 210px;
		border-bottom: 1px solid var(--border-hairline);
		background: var(--bg-obsidian);
	}

	.team-info {
		padding: 1.3rem;
		display: flex;
		flex-direction: column;
		gap: 0.52rem;

		h4 {
			font-family: var(--font-display);
			font-size: 1.08rem;
			color: var(--text-main);
		}

		p {
			font-size: 0.89rem;
			color: var(--text-muted);
			line-height: 1.56;
		}
	}

	.team-meta {
		font-family: var(--font-mono);
		font-size: 0.73rem;
		color: var(--accent-mova-light);
	}

	.team-collabs {
		color: var(--text-secondary) !important;
	}

	.team-methods {
		padding-left: 1.15rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.video-summary {
		max-width: 66ch;
		font-size: 0.93rem;
		color: var(--text-muted);
		margin-bottom: 1.15rem;
	}

	.showreel-shell {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
		gap: 1.15rem;
		align-items: start;

		@media (max-width: 820px) {
			grid-template-columns: 1fr;
		}
	}

	.showreel-stage {
		border-radius: var(--radius-card);
		border: 1px solid var(--border-hairline);
		background: var(--surface-card);
		overflow: hidden;
	}

	.reel-player {
		height: 240px;
		background: var(--bg-obsidian);
		border-bottom: 1px solid var(--border-hairline);
	}

	.reel-fallback {
		height: 100%;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.6rem;

		h4 {
			font-family: var(--font-display);
			font-size: 1.12rem;
			color: var(--text-main);
		}

		p {
			font-size: 0.88rem;
			color: var(--text-secondary);
			line-height: 1.55;
		}
	}

	.showreel-badge {
		align-self: flex-start;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		padding: 0.22rem 0.65rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: #bfdbfe;
	}

	.showreel-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		font-family: var(--font-mono);
		font-size: 0.73rem;
		color: var(--text-muted);
	}

	.reel-caption {
		padding: 0.9rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;

		strong {
			font-family: var(--font-display);
			font-size: 0.94rem;
			color: var(--text-main);
		}

		span {
			font-family: var(--font-mono);
			font-size: 0.74rem;
			color: var(--text-muted);
		}
	}

	.showreel-list {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.reel-item {
		text-align: left;
		padding: 1rem;
		border-radius: 16px;
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		transition: border-color 0.25s ease;

		&.active,
		&:hover {
			border-color: var(--border-active);
		}
	}

	.reel-copy {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		span {
			font-size: 0.78rem;
			color: var(--text-muted);
		}
	}

	.reel-play {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--accent-mova-light) !important;

		strong {
			font-family: var(--font-display);
			font-size: 0.92rem;
			color: var(--text-main);
		}
	}

	.reel-dur {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--accent-mova-light);
	}
</style>
