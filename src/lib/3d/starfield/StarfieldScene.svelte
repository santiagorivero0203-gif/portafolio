<script lang="ts">
	import { onDestroy } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	const STAR_COUNT = 165;

	let pointsRef = $state<THREE.Points | undefined>(undefined);
	let scrollY = $state(0);
	let currentParallaxY = 0;
	let currentParallaxX = 0;
	let pointerX = 0;
	let pointerY = 0;

	function createStarSprite(): THREE.CanvasTexture | null {
		if (typeof document === 'undefined') return null;
		const canvas = document.createElement('canvas');
		canvas.width = 64;
		canvas.height = 64;
		const ctx = canvas.getContext('2d');
		if (!ctx) return null;

		const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
		gradient.addColorStop(0, 'rgba(248, 250, 252, 1)');
		gradient.addColorStop(0.35, 'rgba(248, 250, 252, 0.78)');
		gradient.addColorStop(0.75, 'rgba(96, 165, 250, 0.2)');
		gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 64, 64);

		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		return texture;
	}

	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(STAR_COUNT * 3);
	const colors = new Float32Array(STAR_COUNT * 3);

	const whiteColor = new THREE.Color('#F8FAFC');
	const cobaltSoftColor = new THREE.Color('#60A5FA');

	for (let i = 0; i < STAR_COUNT; i++) {
		const i3 = i * 3;
		positions[i3] = (Math.random() - 0.5) * 30;
		positions[i3 + 1] = (Math.random() - 0.5) * 22;
		positions[i3 + 2] = (Math.random() - 0.5) * 14 - 4;

		const mixFactor = Math.random();
		const color = whiteColor.clone().lerp(cobaltSoftColor, mixFactor > 0.62 ? 0.8 : 0.12);
		colors[i3] = color.r;
		colors[i3 + 1] = color.g;
		colors[i3 + 2] = color.b;
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

	const spriteTexture = createStarSprite();

	const material = new THREE.PointsMaterial({
		size: 0.125,
		map: spriteTexture ?? undefined,
		vertexColors: true,
		transparent: true,
		opacity: 0.55,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
		sizeAttenuation: true
	});

	$effect(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		const handlePointer = (event: PointerEvent) => {
			pointerX = (event.clientX / window.innerWidth - 0.5) * 0.32;
			pointerY = (event.clientY / window.innerHeight - 0.5) * 0.24;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('pointermove', handlePointer, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('pointermove', handlePointer);
		};
	});

	useTask((delta) => {
		if (!pointsRef) return;
		const dt = Math.min(delta, 0.05);

		pointsRef.rotation.y += dt * 0.012;
		pointsRef.rotation.x += dt * 0.004;

		const targetY = scrollY * 0.0014 - pointerY * 0.4;
		const targetX = pointerX * 0.4;

		currentParallaxY += (targetY - currentParallaxY) * Math.min(1, dt * 3.5);
		currentParallaxX += (targetX - currentParallaxX) * Math.min(1, dt * 3.5);

		pointsRef.position.y = currentParallaxY;
		pointsRef.position.x = currentParallaxX;
	});

	onDestroy(() => {
		geometry.dispose();
		material.dispose();
		spriteTexture?.dispose();
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
<T.Points bind:ref={pointsRef} {geometry} {material} />
