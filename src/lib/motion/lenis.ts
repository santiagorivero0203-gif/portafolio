import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReducedMotion } from './reducedMotion.svelte';

let lenisInstance: Lenis | null = null;
let pluginRegistered = false;

export function mountSmoothScroll(): () => void {
	if (typeof window === 'undefined') return () => {};

	if (!pluginRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		pluginRegistered = true;
	}

	if (getReducedMotion()) {
		return () => {};
	}

	const lenis = new Lenis({
		duration: 1.05,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 0.95
	});

	lenisInstance = lenis;

	const onScroll = () => {
		ScrollTrigger.update();
	};
	lenis.on('scroll', onScroll);

	const tick = (time: number) => {
		lenis.raf(time * 1000);
	};
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(tick);
		lenis.off('scroll', onScroll);
		lenis.destroy();
		if (lenisInstance === lenis) {
			lenisInstance = null;
		}
	};
}

export function scrollToTarget(target: string | HTMLElement, offset = -24): void {
	if (typeof window === 'undefined') return;

	if (lenisInstance) {
		lenisInstance.scrollTo(target, { offset });
		return;
	}

	const element =
		typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

	if (element) {
		element.scrollIntoView({
			behavior: getReducedMotion() ? 'auto' : 'smooth',
			block: 'start'
		});
	}
}

export function lockScroll(): void {
	if (typeof document === 'undefined') return;
	lenisInstance?.stop();
	document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll(): void {
	if (typeof document === 'undefined') return;
	document.documentElement.style.overflow = '';
	lenisInstance?.start();
}
