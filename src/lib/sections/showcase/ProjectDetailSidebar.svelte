<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Media from '$lib/components/Media.svelte';
	import type { Project } from '$lib/data/portfolioData';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
	let zoomedMedia = $state<{ url: string; caption: string } | null>(null);

	export function openZoom(url: string, caption: string) {
		zoomedMedia = { url, caption };
	}
</script>

<aside class="col-side">
	{#if project.videoPreviewUrl}
		<section class="side-card">
			<h2 class="mono-label block-heading">Demostración en video</h2>
			<div class="video-frame">
				<Media
					src={project.videoPreviewUrl}
					alt="Demostración de {project.title}"
					kind="video"
					controls={true}
					fallbackLabel={project.category}
					fallbackTitle="Preview de {project.title}"
				/>
			</div>
		</section>
	{/if}

	<section class="side-card">
		<h2 class="mono-label block-heading">Galería</h2>
		<div class="gallery-stack">
			{#each project.galleryUrls as url, index}
				<button
					type="button"
					class="gallery-frame"
					onclick={() =>
						(zoomedMedia = {
							url,
							caption: `${project.title} — vista 0${index + 1}`
						})}
				>
					<Media
						src={url}
						alt="{project.title} — captura {index + 1}"
						fallbackLabel={project.title}
						fallbackTitle="Vista 0{index + 1}"
					/>
				</button>
			{/each}
		</div>
	</section>

	<section class="side-card">
		<h2 class="mono-label block-heading">Tecnologías</h2>
		<div class="tech-chips">
			{#each project.technologies as tech}
				<span class="tech-chip">{tech}</span>
			{/each}
		</div>
	</section>

	<section class="side-card">
		{#if project.accessType === 'public'}
			<h2 class="mono-label block-heading">Accesos</h2>
			{#if project.liveUrl || project.repoUrl}
				<div class="action-buttons">
					{#if project.liveUrl}
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="action-btn primary"
						>
							<span>Abrir demo</span>
							<Icon name="arrow-up-right" size={16} />
						</a>
					{/if}
					{#if project.repoUrl}
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="action-btn secondary"
						>
							<span>Repositorio</span>
							<Icon name="arrow-up-right" size={16} />
						</a>
					{/if}
				</div>
			{:else}
				<p class="privacy-copy">
					Proyecto público documentado en este caso de estudio. Los enlaces directos de
					repositorio o despliegue se habilitarán tras la revisión final de assets.
				</p>
			{/if}
		{:else}
			<span class="private-badge">
				<Icon name="lock" size={13} />
				<span>Arquitectura interna · Uso privado</span>
			</span>
			<p class="privacy-copy">
				{project.privacyNote ??
					'Este proyecto se presenta mediante inmersión explicativa interna sin acceso público externo.'}
			</p>
		{/if}
	</section>
</aside>

<Dialog
	open={zoomedMedia !== null}
	titleId="zoom-media-title"
	maxWidth="920px"
	onclose={() => (zoomedMedia = null)}
>
	{#if zoomedMedia}
		<div class="zoom-dialog">
			<div class="zoom-top">
				<h3 id="zoom-media-title" class="zoom-caption">{zoomedMedia.caption}</h3>
				<button
					type="button"
					class="zoom-close"
					aria-label="Cerrar imagen"
					onclick={() => (zoomedMedia = null)}
				>
					<Icon name="close" size={18} />
				</button>
			</div>
			<div class="zoom-stage">
				<Media src={zoomedMedia.url} alt={zoomedMedia.caption} fit="contain" />
			</div>
		</div>
	{/if}
</Dialog>

<style lang="scss">
	.col-side {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
	}

	.side-card {
		padding: 1.35rem;
		border-radius: var(--radius-card);
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
	}

	.block-heading {
		display: block;
		margin-bottom: 0.75rem;
	}

	.video-frame {
		height: 210px;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--border-hairline);
	}

	.gallery-stack {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.gallery-frame {
		width: 100%;
		height: 175px;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--border-hairline);
		background: var(--bg-obsidian);
		transition: border-color 0.22s ease;

		&:hover {
			border-color: var(--border-active);
		}
	}

	.tech-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.tech-chip {
		font-family: var(--font-mono);
		font-size: 0.73rem;
		padding: 0.3rem 0.65rem;
		border-radius: var(--radius-pill);
		background: var(--surface-subtle);
		border: 1px solid var(--border-hairline);
		color: var(--text-secondary);
	}

	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.78rem 1.1rem;
		border-radius: var(--radius-pill);
		font-size: 0.88rem;
		font-weight: 600;

		&.primary {
			background: var(--accent-mova);
			color: var(--text-main);

			&:hover {
				background: var(--accent-mova-light);
			}
		}

		&.secondary {
			background: var(--surface-subtle);
			border: 1px solid var(--border-hairline);
			color: var(--text-main);

			&:hover {
				border-color: var(--border-active);
				background: var(--surface-hover);
			}
		}
	}

	.private-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-mono);
		font-size: 0.73rem;
		padding: 0.32rem 0.75rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova-soft);
		border: 1px solid var(--border-active);
		color: #bfdbfe;
		margin-bottom: 0.75rem;
	}

	.privacy-copy {
		font-size: 0.86rem;
		line-height: 1.56;
		color: var(--text-muted);
	}

	.zoom-dialog {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.zoom-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.zoom-caption {
		font-family: var(--font-display);
		font-size: 1.05rem;
		color: var(--text-main);
	}

	.zoom-close {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--surface-card);
		border: 1px solid var(--border-hairline);
	}

	.zoom-stage {
		height: clamp(260px, 60vh, 520px);
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--border-hairline);
	}
</style>
