<script lang="ts">
	import type { Snippet } from 'svelte';
	import { lockScroll, unlockScroll } from '$lib/motion/lenis';

	interface Props {
		open: boolean;
		titleId: string;
		maxWidth?: string;
		onclose: () => void;
		children: Snippet;
	}

	let { open, titleId, maxWidth = '820px', onclose, children }: Props = $props();

	let dialogEl = $state<HTMLDivElement | undefined>(undefined);

	$effect(() => {
		if (!open || typeof window === 'undefined') return;

		const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		lockScroll();

		requestAnimationFrame(() => {
			const focusable = dialogEl?.querySelector<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			focusable?.focus();
		});

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				onclose();
				return;
			}

			if (event.key === 'Tab' && dialogEl) {
				const nodes = Array.from(
					dialogEl.querySelectorAll<HTMLElement>(
						'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
					)
				);
				if (!nodes.length) return;
				const first = nodes[0];
				const last = nodes[nodes.length - 1];
				if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			unlockScroll();
			previousFocus?.focus();
		};
	});
</script>

{#if open}
	<div
		class="dialog-backdrop"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) onclose();
		}}
	>
		<div
			bind:this={dialogEl}
			class="dialog-panel"
			style="--dialog-max-width: {maxWidth};"
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
		>
			{@render children()}
		</div>
	</div>
{/if}

<style lang="scss">
	.dialog-backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-dialog);
		background: rgba(7, 11, 20, 0.84);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		padding: clamp(1rem, 3vw, 2rem);
		display: grid;
		place-items: center;
		overflow-y: auto;
	}

	.dialog-panel {
		width: 100%;
		max-width: var(--dialog-max-width, 820px);
		border-radius: var(--radius-card);
		background: var(--bg-primary);
		border: 1px solid var(--border-strong);
		padding: clamp(1.25rem, 3vw, 2rem);
		box-shadow: 0 24px 64px rgba(2, 6, 23, 0.65);
	}
</style>
