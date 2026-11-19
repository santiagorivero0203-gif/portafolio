<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		src: string;
		alt: string;
		kind?: 'image' | 'video';
		poster?: string;
		videoPreviewUrl?: string;
		hovered?: boolean;
		controls?: boolean;
		fit?: 'cover' | 'contain';
		className?: string;
		fallbackLabel?: string;
		fallbackTitle?: string;
		fallback?: Snippet;
	}

	let {
		src,
		alt,
		kind = 'image',
		poster = undefined,
		videoPreviewUrl = undefined,
		hovered = false,
		controls = false,
		fit = 'cover',
		className = '',
		fallbackLabel = '',
		fallbackTitle = '',
		fallback = undefined
	}: Props = $props();

	let mediaFailed = $state(false);
	let previewFailed = $state(false);
	let videoEl = $state<HTMLVideoElement | undefined>(undefined);

	$effect(() => {
		src;
		mediaFailed = false;
	});

	$effect(() => {
		videoPreviewUrl;
		previewFailed = false;
	});

	$effect(() => {
		if (!videoEl || !videoPreviewUrl || previewFailed) return;
		if (hovered) {
			videoEl.play().catch(() => {});
		} else {
			videoEl.pause();
			videoEl.currentTime = 0;
		}
	});
</script>

<div class="media-box {className}" class:contain={fit === 'contain'}>
	{#if kind === 'video'}
		{#if !mediaFailed}
			<video
				{src}
				{poster}
				{controls}
				playsinline
				preload="metadata"
				aria-label={alt}
				onerror={() => (mediaFailed = true)}
			>
				<track kind="captions" />
			</video>
		{:else if fallback}
			{@render fallback()}
		{:else}
			<div class="media-fallback">
				{#if fallbackLabel}
					<span class="fb-label">{fallbackLabel}</span>
				{/if}
				<strong class="fb-title">{fallbackTitle || alt}</strong>
			</div>
		{/if}
	{:else if !mediaFailed}
		<img
			{src}
			{alt}
			loading="lazy"
			decoding="async"
			onerror={() => (mediaFailed = true)}
		/>
		{#if videoPreviewUrl && !previewFailed && hovered}
			<video
				bind:this={videoEl}
				src={videoPreviewUrl}
				muted
				loop
				playsinline
				preload="none"
				class="hover-video"
				aria-hidden="true"
				onerror={() => (previewFailed = true)}
			>
				<track kind="captions" />
			</video>
		{/if}
	{:else if fallback}
		{@render fallback()}
	{:else}
		<div class="media-fallback">
			{#if fallbackLabel}
				<span class="fb-label">{fallbackLabel}</span>
			{/if}
			<strong class="fb-title">{fallbackTitle || alt}</strong>
		</div>
	{/if}
</div>

<style lang="scss">
	.media-box {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--bg-obsidian);

		img,
		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}

		&.contain img,
		&.contain video {
			object-fit: contain;
		}
	}

	.hover-video {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.media-fallback {
		width: 100%;
		height: 100%;
		min-height: 140px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 0.35rem;
		background: linear-gradient(155deg, rgba(19, 29, 51, 0.92), rgba(7, 11, 20, 0.98));
	}

	.fb-label {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--accent-mova-light);
	}

	.fb-title {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-main);
		line-height: 1.3;
	}
</style>
