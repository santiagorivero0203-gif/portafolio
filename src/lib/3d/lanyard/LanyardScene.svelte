<script lang="ts">
	import { onDestroy } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import * as THREE from 'three';
	import {
		LANYARD_CONSTANTS,
		computeStrapTransform,
		createInitialPhysicsState,
		stepLanyardPhysics
	} from './physics';
	import {
		createBackTexture,
		createCardBodyGeometry,
		createFrontTexture
	} from './lanyardTexture';

	interactivity();

	interface Props {
		paused?: boolean;
		flipped?: boolean;
		stageEl?: HTMLElement | undefined;
	}

	interface ThreePointerPayload {
		nativeEvent?: PointerEvent;
	}

	let { paused = false, flipped = false, stageEl = undefined }: Props = $props();

	let cardGroupRef = $state<THREE.Group | undefined>(undefined);
	let strapRef = $state<THREE.Mesh | undefined>(undefined);

	let isDragging = $state(false);
	let isHovered = $state(false);

	let physics = createInitialPhysicsState();
	let dragTargetX = 0;
	let dragTargetY: number = LANYARD_CONSTANTS.equilibriumY;
	let dragStartClientX = 0;
	let dragStartClientY = 0;
	let dragOriginX = 0;
	let dragOriginY: number = LANYARD_CONSTANTS.equilibriumY;

	const frontTexture = createFrontTexture();
	const backTexture = createBackTexture();
	const bodyGeometry = createCardBodyGeometry();

	function startDrag(event: ThreePointerPayload | PointerEvent) {
		const nativeEvent = event instanceof PointerEvent ? event : event.nativeEvent;
		if (!nativeEvent) return;

		isDragging = true;
		dragStartClientX = nativeEvent.clientX;
		dragStartClientY = nativeEvent.clientY;
		dragOriginX = physics.posX;
		dragOriginY = physics.posY;
		dragTargetX = physics.posX;
		dragTargetY = physics.posY;
	}

	$effect(() => {
		if (!isDragging) return;

		const handlePointerMove = (e: PointerEvent) => {
			const stageHeight = stageEl?.clientHeight || 520;
			const unitsPerPixel = 4.95 / stageHeight;
			const dx = (e.clientX - dragStartClientX) * unitsPerPixel;
			const dy = -(e.clientY - dragStartClientY) * unitsPerPixel;

			dragTargetX = THREE.MathUtils.clamp(dragOriginX + dx, -1.75, 1.75);
			dragTargetY = THREE.MathUtils.clamp(dragOriginY + dy, -1.45, 1.35);
		};

		const handlePointerUp = () => {
			isDragging = false;
		};

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('pointercancel', handlePointerUp);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointercancel', handlePointerUp);
		};
	});

	useTask((delta) => {
		if (paused) return;

		physics = stepLanyardPhysics(
			physics,
			{
				isDragging,
				isHovered,
				flipped,
				dragTargetX,
				dragTargetY
			},
			delta
		);

		if (cardGroupRef) {
			cardGroupRef.position.set(physics.posX, physics.posY, 0);
			cardGroupRef.rotation.set(physics.rotX, physics.rotY, physics.rotZ);
		}

		if (strapRef) {
			const strap = computeStrapTransform(physics);
			strapRef.position.set(strap.midX, strap.midY, -0.02);
			strapRef.rotation.z = strap.angleZ;
			strapRef.scale.set(1, strap.length, 1);
		}
	});

	onDestroy(() => {
		frontTexture?.dispose();
		backTexture?.dispose();
		bodyGeometry.dispose();
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0.22, 6.65]} fov={36} />

<T.AmbientLight intensity={1.75} />
<T.DirectionalLight position={[3.5, 5.5, 7]} intensity={1.45} color="#FFFFFF" />
<T.DirectionalLight position={[-4, -2, 5]} intensity={0.65} color="#60A5FA" />

<T.Mesh bind:ref={strapRef} position={[0, 2.2, -0.02]}>
	<T.BoxGeometry args={[0.26, 1, 0.024]} />
	<T.MeshStandardMaterial color="#1D4ED8" roughness={0.62} metalness={0.12} />
</T.Mesh>

<T.Group
	bind:ref={cardGroupRef}
	position={[0, LANYARD_CONSTANTS.equilibriumY, 0]}
	onpointerenter={() => {
		isHovered = true;
		if (typeof document !== 'undefined') {
			document.body.style.cursor = 'grab';
		}
	}}
	onpointerleave={() => {
		isHovered = false;
		if (!isDragging && typeof document !== 'undefined') {
			document.body.style.cursor = 'default';
		}
	}}
	onpointerdown={(e: ThreePointerPayload) => {
		if (typeof document !== 'undefined') {
			document.body.style.cursor = 'grabbing';
		}
		startDrag(e);
	}}
>
	<T.Mesh position={[0, LANYARD_CONSTANTS.clipOffsetY, 0]}>
		<T.BoxGeometry args={[0.34, 0.2, 0.11]} />
		<T.MeshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.22} />
	</T.Mesh>

	<T.Mesh geometry={bodyGeometry}>
		<T.MeshStandardMaterial color="#0F172A" metalness={0.25} roughness={0.45} />
	</T.Mesh>

	{#if frontTexture}
		<T.Mesh position={[0, 0, 0.036]}>
			<T.PlaneGeometry args={[2.16, 3.14]} />
			<T.MeshStandardMaterial
				map={frontTexture}
				transparent={true}
				alphaTest={0.05}
				roughness={0.28}
				metalness={0.05}
			/>
		</T.Mesh>
	{/if}

	{#if backTexture}
		<T.Mesh position={[0, 0, -0.036]} rotation.y={Math.PI}>
			<T.PlaneGeometry args={[2.16, 3.14]} />
			<T.MeshStandardMaterial
				map={backTexture}
				transparent={true}
				alphaTest={0.05}
				roughness={0.28}
				metalness={0.05}
			/>
		</T.Mesh>
	{/if}
</T.Group>
