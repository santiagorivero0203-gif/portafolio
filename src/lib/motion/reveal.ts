import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReducedMotion } from './reducedMotion.svelte';

export interface RevealOptions {
	y?: number;
	duration?: number;
	delay?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (typeof window === 'undefined' || getReducedMotion()) {
		return {};
	}

	gsap.registerPlugin(ScrollTrigger);

	const y = options.y ?? 16;
	const duration = options.duration ?? 0.55;
	const delay = options.delay ?? 0;

	const tween = gsap.fromTo(
		node,
		{ opacity: 0, y },
		{
			opacity: 1,
			y: 0,
			duration,
			delay,
			ease: 'power2.out',
			clearProps: 'transform,opacity',
			scrollTrigger: {
				trigger: node,
				start: 'top 88%',
				once: true
			}
		}
	);

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}
