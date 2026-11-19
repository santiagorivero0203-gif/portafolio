const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export function getReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(REDUCED_QUERY).matches;
}

export function observeReducedMotion(onChange: (reduced: boolean) => void): () => void {
	if (typeof window === 'undefined') return () => {};
	const mediaQuery = window.matchMedia(REDUCED_QUERY);
	onChange(mediaQuery.matches);

	const listener = (event: MediaQueryListEvent) => {
		onChange(event.matches);
	};

	mediaQuery.addEventListener('change', listener);
	return () => {
		mediaQuery.removeEventListener('change', listener);
	};
}
