<script lang="ts">
	import { onDestroy } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	const STAR_COUNT = 420;
	const FIELD_WIDTH = 44;
	const FIELD_HEIGHT = 32;
	const HALF_HEIGHT = FIELD_HEIGHT / 2;

	let pointsRef = $state<THREE.Points | undefined>(undefined);

	let smoothScroll = 0;
	let prevSmoothScroll = 0;
	let smoothVelocity = 0;
	let targetPointerX = 0;
	let targetPointerY = 0;
	let currentPointerX = 0;
	let currentPointerY = 0;
	let elapsedTime = 0;

	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(STAR_COUNT * 3);
	const colors = new Float32Array(STAR_COUNT * 3);
	const scales = new Float32Array(STAR_COUNT);
	const depths = new Float32Array(STAR_COUNT);
	const phases = new Float32Array(STAR_COUNT);

	const palette = [
		new THREE.Color('#F8FAFC'),
		new THREE.Color('#E2E8F0'),
		new THREE.Color('#CBD5E1'),
		new THREE.Color('#BFDBFE'),
		new THREE.Color('#60A5FA')
	];

	for (let i = 0; i < STAR_COUNT; i++) {
		const i3 = i * 3;

		// Distribute across three depth strata: far (50%), mid (35%), near (15%)
		const layerRoll = Math.random();
		let z: number;
		let depthFactor: number;
		let baseScale: number;

		if (layerRoll < 0.5) {
			// Far background stars
			z = -14 + Math.random() * 5;
			depthFactor = 0.28 + Math.random() * 0.22;
			baseScale = 0.55 + Math.random() * 0.45;
		} else if (layerRoll < 0.85) {
			// Midground stars
			z = -9 + Math.random() * 6;
			depthFactor = 0.62 + Math.random() * 0.35;
			baseScale = 0.85 + Math.random() * 0.55;
		} else {
			// Near parallax stars
			z = -3 + Math.random() * 4.5;
			depthFactor = 1.15 + Math.random() * 0.45;
			baseScale = 1.15 + Math.random() * 0.75;
		}

		positions[i3] = (Math.random() - 0.5) * FIELD_WIDTH;
		positions[i3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
		positions[i3 + 2] = z;

		depths[i] = depthFactor;
		scales[i] = baseScale;
		phases[i] = Math.random() * Math.PI * 2;

		const colorPick = Math.random();
		const starColor =
			colorPick < 0.5
				? palette[0]
				: colorPick < 0.72
					? palette[1]
					: colorPick < 0.84
						? palette[2]
						: colorPick < 0.94
							? palette[3]
							: palette[4];

		colors[i3] = starColor.r;
		colors[i3 + 1] = starColor.g;
		colors[i3 + 2] = starColor.b;
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
	geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
	geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
	geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

	const uniforms = {
		uTime: { value: 0 },
		uScroll: { value: 0 },
		uVelocity: { value: 0 },
		uPointer: { value: new THREE.Vector2(0, 0) },
		uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1 }
	};

	const vertexShader = /* glsl */ `
		attribute float aScale;
		attribute float aDepth;
		attribute float aPhase;

		uniform float uTime;
		uniform float uScroll;
		uniform float uVelocity;
		uniform vec2 uPointer;
		uniform float uPixelRatio;

		varying vec3 vColor;
		varying float vAlpha;
		varying float vScale;
		varying float vStretch;

		const float FIELD_H = ${FIELD_HEIGHT.toFixed(1)};
		const float HALF_H = ${HALF_HEIGHT.toFixed(1)};
		const float FIELD_W = ${FIELD_WIDTH.toFixed(1)};
		const float HALF_W = ${(FIELD_WIDTH / 2).toFixed(1)};

		void main() {
			vec3 pos = position;

			// True depth-coupled vertical scroll parallax with seamless infinite wrap-around
			float scrollTravel = uScroll * 0.0085 * aDepth;
			float subtleDriftY = uTime * 0.045 * aDepth;
			pos.y = mod(pos.y + scrollTravel + subtleDriftY + HALF_H, FIELD_H) - HALF_H;

			// Gentle horizontal drift + pointer parallax proportional to depth
			float subtleDriftX = sin(uTime * 0.06 + aPhase) * 0.18 * aDepth;
			pos.x = mod(pos.x + subtleDriftX - uPointer.x * 1.15 * aDepth + HALF_W, FIELD_W) - HALF_W;
			pos.y += uPointer.y * 0.75 * aDepth;

			// Subtle depth nudge when scrolling rapidly
			float velAbs = abs(uVelocity);
			pos.z += clamp(velAbs * 0.14 * aDepth, 0.0, 0.65);

			vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
			gl_Position = projectionMatrix * mvPosition;

			// Organic per-star twinkle
			float twinkle = 0.76 + 0.24 * sin(uTime * (0.9 + aDepth * 0.8) + aPhase);
			float velBoost = 1.0 + clamp(velAbs * 0.28 * aDepth, 0.0, 0.45);

			float distAttenuation = 165.0 / max(-mvPosition.z, 2.0);
			float sizeBoost = 1.0 + clamp(velAbs * 0.35 * aDepth, 0.0, 0.75);
			gl_PointSize = clamp(aScale * distAttenuation * 0.14 * uPixelRatio * sizeBoost, 1.5, 22.0);

			vColor = color;
			vScale = aScale;
			vAlpha = clamp((0.32 + 0.56 * min(aDepth, 1.15)) * twinkle * velBoost, 0.18, 0.95);
			vStretch = clamp(velAbs * 0.55 * aDepth, 0.0, 0.62);
		}
	`;

	const fragmentShader = /* glsl */ `
		varying vec3 vColor;
		varying float vAlpha;
		varying float vScale;
		varying float vStretch;

		void main() {
			vec2 uv = gl_PointCoord - vec2(0.5);

			// Slight vertical elongation during fast scrolling for tactile warp feedback
			vec2 warped = vec2(uv.x * (1.0 + vStretch * 1.15), uv.y * (1.0 - vStretch * 0.45));
			float d = length(warped);

			if (d > 0.5) discard;

			// Crisp bright starlight core + soft exponential halo
			float core = smoothstep(0.22, 0.0, d);
			float halo = exp(-d * 7.8) * 0.62;

			// Subtle 4-point optical diffraction glint on brightest stars
			float crossGlint = 0.0;
			if (vScale > 1.38) {
				float gx = exp(-abs(uv.y) * 28.0) * exp(-abs(uv.x) * 6.5);
				float gy = exp(-abs(uv.x) * 28.0) * exp(-abs(uv.y) * 6.5);
				crossGlint = (gx + gy) * 0.35;
			}

			float intensity = clamp(core + halo + crossGlint, 0.0, 1.0);
			gl_FragColor = vec4(vColor, intensity * vAlpha);
		}
	`;

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
		vertexColors: true,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});

	$effect(() => {
		if (typeof window === 'undefined') return;

		smoothScroll = window.scrollY;
		prevSmoothScroll = smoothScroll;

		const handlePointer = (event: PointerEvent) => {
			targetPointerX = (event.clientX / window.innerWidth - 0.5) * 1.0;
			targetPointerY = (event.clientY / window.innerHeight - 0.5) * 0.85;
		};

		const handleResize = () => {
			uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
		};

		window.addEventListener('pointermove', handlePointer, { passive: true });
		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			window.removeEventListener('pointermove', handlePointer);
			window.removeEventListener('resize', handleResize);
		};
	});

	useTask((delta) => {
		const dt = Math.min(delta, 0.05);
		elapsedTime += dt;

		const rawScroll = typeof window !== 'undefined' ? window.scrollY : 0;
		smoothScroll += (rawScroll - smoothScroll) * Math.min(1, dt * 11);

		const instVelocity = (smoothScroll - prevSmoothScroll) / Math.max(dt, 0.008);
		prevSmoothScroll = smoothScroll;

		const normalizedTargetVel = THREE.MathUtils.clamp(instVelocity / 1600, -1.5, 1.5);
		smoothVelocity += (normalizedTargetVel - smoothVelocity) * Math.min(1, dt * 7);

		currentPointerX += (targetPointerX - currentPointerX) * Math.min(1, dt * 3.5);
		currentPointerY += (targetPointerY - currentPointerY) * Math.min(1, dt * 3.5);

		uniforms.uTime.value = elapsedTime;
		uniforms.uScroll.value = smoothScroll;
		uniforms.uVelocity.value = smoothVelocity;
		uniforms.uPointer.value.set(currentPointerX, currentPointerY);

		if (pointsRef) {
			// Very subtle rotational roll coupled to scroll position for cosmic depth
			pointsRef.rotation.z = smoothScroll * 0.000045;
		}
	});

	onDestroy(() => {
		geometry.dispose();
		material.dispose();
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]} fov={52} />
<T.Points bind:ref={pointsRef} {geometry} {material} frustumCulled={false} />
