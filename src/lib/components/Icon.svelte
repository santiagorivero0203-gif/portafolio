<script lang="ts">
	export type IconName =
		| 'arrow-right'
		| 'arrow-left'
		| 'arrow-up-right'
		| 'award'
		| 'copy'
		| 'check'
		| 'close'
		| 'lock'
		| 'play'
		| 'code'
		| 'eye'
		| 'cube'
		| 'atom'
		| 'flip'
		| 'home'
		| 'user'
		| 'grid'
		| 'mail';

	interface Props {
		name: IconName;
		size?: number;
		strokeWidth?: number;
	}

	let { name, size = 16, strokeWidth = 1.8 }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	class="ui-icon"
>
	{#if name === 'arrow-right'}
		<path d="M5 12h14" />
		<path d="m13 6 6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M19 12H5" />
		<path d="m11 18-6-6 6-6" />
	{:else if name === 'arrow-up-right'}
		<path d="M7 17 17 7" />
		<path d="M8 7h9v9" />
	{:else if name === 'award'}
		<circle cx="12" cy="8.5" r="5.5" />
		<path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5" />
	{:else if name === 'copy'}
		<rect x="9" y="9" width="11" height="11" rx="2" />
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
	{:else if name === 'check'}
		<path d="M20 6 9 17l-5-5" />
	{:else if name === 'close'}
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	{:else if name === 'lock'}
		<rect x="4" y="11" width="16" height="10" rx="2" />
		<path d="M8 11V7a4 4 0 0 1 8 0v4" />
	{:else if name === 'play'}
		<polygon points="7 5 19 12 7 19 7 5" />
	{:else if name === 'code'}
		<path d="m8 9-4 3 4 3" />
		<path d="m16 9 4 3-4 3" />
		<path d="m13.5 6-3 12" />
	{:else if name === 'eye'}
		<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
		<circle cx="12" cy="12" r="2.8" />
	{:else if name === 'cube'}
		<polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5 12 2" />
		<path d="M12 22V12" />
		<path d="m20 6.5-8 5.5-8-5.5" />
	{:else if name === 'atom'}
		<circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
		<ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" />
		<ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-30 12 12)" />
	{:else if name === 'flip'}
		<path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
		<path d="M21 3v5h-5" />
		<path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
		<path d="M3 21v-5h5" />
	{:else if name === 'home'}
		<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5Z" />
	{:else if name === 'user'}
		<circle cx="12" cy="8" r="4" />
		<path d="M4.5 20c1.4-3.4 4.3-5 7.5-5s6.1 1.6 7.5 5" />
	{:else if name === 'grid'}
		<rect x="3" y="3" width="7" height="7" rx="1.5" />
		<rect x="14" y="3" width="7" height="7" rx="1.5" />
		<rect x="3" y="14" width="7" height="7" rx="1.5" />
		<rect x="14" y="14" width="7" height="7" rx="1.5" />
	{:else if name === 'mail'}
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="m3 7 9 6 9-6" />
	{/if}
</svg>

<style lang="scss">
	.ui-icon {
		flex-shrink: 0;
		display: inline-block;
		vertical-align: middle;
	}
</style>
