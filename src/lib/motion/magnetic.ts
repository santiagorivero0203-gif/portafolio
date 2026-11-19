import { getReducedMotion } from './reducedMotion.svelte';

export interface MagneticOptions {
	strength?: number;
}

export function magnetic(node: HTMLElement, options: MagneticOptions = {}) {
	if (typeof window === 'undefined' || getReducedMotion()) {
		return {};
	}

	const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
	if (isCoarsePointer) return {};

	const maxOffset = options.strength ?? 6;
	node.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';

	const handleMove = (event: PointerEvent) => {
		const rect = node.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) return;

		const relX = (event.clientX - rect.left) / rect.width - 0.5;
		const relY = (event.clientY - rect.top) / rect.height - 0.5;

		const tx = Math.max(-maxOffset, Math.min(maxOffset, relX * maxOffset * 2));
		const ty = Math.max(-maxOffset, Math.min(maxOffset, relY * maxOffset * 2));
		node.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
	};

	const handleLeave = () => {
		node.style.transform = 'translate3d(0px, 0px, 0)';
	};

	node.addEventListener('pointermove', handleMove);
	node.addEventListener('pointerleave', handleLeave);

	return {
		destroy() {
			node.removeEventListener('pointermove', handleMove);
			node.removeEventListener('pointerleave', handleLeave);
			node.style.transform = '';
		}
	};
}
