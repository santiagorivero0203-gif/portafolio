<script lang="ts">
	import { onDestroy } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import {
		LANYARD_CONSTANTS,
		computeStrapTransform,
		createInitialPhysicsState,
		stepLanyardPhysics,
		type LanyardAnchor
	} from './physics';
	import {
		createBackTexture,
		createCardBodyGeometry,
		createFrontTexture
	} from './lanyardTexture';

	interface Props {
		paused?: boolean;
		flipped?: boolean;
		overlayEl?: HTMLElement | undefined;
		slotEl?: HTMLElement | undefined;
		onDragChange?: (dragging: boolean) => void;
	}

	const CAMERA_FOV = 36;
	const CARD_WORLD_HEIGHT = 3.08;

	let {
		paused = false,
		flipped = false,
		overlayEl = undefined,
		slotEl = undefined,
		onDragChange
	}: Props = $props();

	let camRef = $state<THREE.PerspectiveCamera | undefined>(undefined);
	let cardGroupRef = $state<THREE.Group | undefined>(undefined);
	let hitMeshRef = $state<THREE.Mesh | undefined>(undefined);
	let strapRef = $state<THREE.Mesh | undefined>(undefined);

	let camZ = $state(13.2);
	let bounds = { minX: -5, maxX: 5, minY: -3.5, maxY: 3.5, visH: 8.5, visW: 12 };
	let anchor: LanyardAnchor = { ...LANYARD_CONSTANTS };

	let isDragging = false;
	let isHovered = false;
	let hasInitializedAnchor = false;

	let physics = createInitialPhysicsState();
	let dragTargetX = 0;
	let dragTargetY = 0;
	let grabOffsetX = 0;
	let grabOffsetY = 0;

	const raycaster = new THREE.Raycaster();
	const pointerNdc = new THREE.Vector2();
	const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	const planeHit = new THREE.Vector3();

	const frontTexture = createFrontTexture();
	const backTexture = createBackTexture();
	const bodyGeometry = createCardBodyGeometry();

	function syncViewportMetrics() {
		if (!overlayEl || !slotEl || typeof window === 'undefined') return;

		const oRect = overlayEl.getBoundingClientRect();
		const sRect = slotEl.getBoundingClientRect();
		if (oRect.width <= 0 || oRect.height <= 0) return;

		const isMobile = window.innerWidth <= 960;
		const targetCardPx = isMobile
			? Math.min(278, Math.max(225, sRect.height * 0.78))
			: Math.min(365, Math.max(300, window.innerHeight * 0.44));

		const visH = (CARD_WORLD_HEIGHT * oRect.height) / targetCardPx;
		const visW = visH * (oRect.width / oRect.height);
		const halfFovRad = THREE.MathUtils.degToRad(CAMERA_FOV / 2);
		camZ = visH / (2 * Math.tan(halfFovRad));

		const slotCenterPxX = sRect.left + sRect.width / 2 - oRect.left;
		const slotCenterPxY = sRect.top + sRect.height / 2 - oRect.top;

		const ndcX = (slotCenterPxX / oRect.width) * 2 - 1;
		const ndcY = 1 - (slotCenterPxY / oRect.height) * 2;

		const worldX = ndcX * (visW / 2);
		const worldY = ndcY * (visH / 2);

		// Strap originates cleanly above the very top edge of the page (y = 0)
		const topEdgeWorldY = visH / 2 + 0.25;

		anchor = {
			anchorX: worldX,
			anchorY: topEdgeWorldY,
			equilibriumX: worldX,
			equilibriumY: worldY,
			clipOffsetY: LANYARD_CONSTANTS.clipOffsetY
		};

		bounds = {
			minX: -visW / 2 + 1.15,
			maxX: visW / 2 - 1.15,
			minY: -visH / 2 + 1.65,
			maxY: topEdgeWorldY - LANYARD_CONSTANTS.clipOffsetY - 0.15,
			visH,
			visW
		};

		if (!hasInitializedAnchor) {
			hasInitializedAnchor = true;
			physics = createInitialPhysicsState(anchor);
			dragTargetX = anchor.equilibriumX;
			dragTargetY = anchor.equilibriumY;
		}
	}

	function clientToNdc(clientX: number, clientY: number): boolean {
		if (!overlayEl) return false;
		const rect = overlayEl.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return false;

		pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
		pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
		return true;
	}

	function hitTestCard(clientX: number, clientY: number): boolean {
		if (!camRef || !hitMeshRef || !overlayEl) return false;
		const rect = overlayEl.getBoundingClientRect();
		if (
			clientX < rect.left ||
			clientX > rect.right ||
			clientY < rect.top ||
			clientY > rect.bottom
		) {
			return false;
		}
		if (!clientToNdc(clientX, clientY)) return false;

		raycaster.setFromCamera(pointerNdc, camRef);
		return raycaster.intersectObject(hitMeshRef, false).length > 0;
	}

	function updateDragTarget(clientX: number, clientY: number) {
		if (!camRef || !clientToNdc(clientX, clientY)) return;
		raycaster.setFromCamera(pointerNdc, camRef);
		if (raycaster.ray.intersectPlane(dragPlane, planeHit)) {
			dragTargetX = THREE.MathUtils.clamp(planeHit.x + grabOffsetX, bounds.minX, bounds.maxX);
			dragTargetY = THREE.MathUtils.clamp(planeHit.y + grabOffsetY, bounds.minY, bounds.maxY);
		}
	}

	function beginDrag(clientX: number, clientY: number) {
		if (!camRef || !clientToNdc(clientX, clientY)) return;
		raycaster.setFromCamera(pointerNdc, camRef);
		if (raycaster.ray.intersectPlane(dragPlane, planeHit)) {
			grabOffsetX = physics.posX - planeHit.x;
			grabOffsetY = physics.posY - planeHit.y;
		} else {
			grabOffsetX = 0;
			grabOffsetY = 0;
		}
		dragTargetX = physics.posX;
		dragTargetY = physics.posY;
		isDragging = true;
		onDragChange?.(true);
		document.body.style.cursor = 'grabbing';
	}

	function endDrag() {
		if (!isDragging) return;
		isDragging = false;
		// Defer overlay pointer-events release by one tick so a mouseup over a button does not trigger a spurious click
		requestAnimationFrame(() => {
			onDragChange?.(false);
		});
		document.body.style.cursor = isHovered ? 'grab' : 'default';
	}

	$effect(() => {
		if (typeof window === 'undefined') return;

		syncViewportMetrics();

		const resizeObserver = new ResizeObserver(() => {
			syncViewportMetrics();
		});
		if (overlayEl) resizeObserver.observe(overlayEl);
		if (slotEl) resizeObserver.observe(slotEl);

		const isFlipControl = (target: EventTarget | null) =>
			target instanceof Element && Boolean(target.closest('.flip-btn'));

		const handlePointerDown = (e: PointerEvent) => {
			if (e.pointerType === 'touch') return;
			if (e.button !== 0 || isFlipControl(e.target)) return;

			if (hitTestCard(e.clientX, e.clientY)) {
				e.preventDefault();
				e.stopPropagation();
				beginDrag(e.clientX, e.clientY);
			}
		};

		const handlePointerMove = (e: PointerEvent) => {
			if (e.pointerType === 'touch') return;

			if (isDragging) {
				updateDragTarget(e.clientX, e.clientY);
				return;
			}

			const hit = hitTestCard(e.clientX, e.clientY) && !isFlipControl(e.target);
			if (hit !== isHovered) {
				isHovered = hit;
				document.body.style.cursor = hit ? 'grab' : 'default';
			}
		};

		const handlePointerUp = () => {
			endDrag();
		};

		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			if (!touch || isFlipControl(e.target)) return;

			if (hitTestCard(touch.clientX, touch.clientY)) {
				e.preventDefault();
				beginDrag(touch.clientX, touch.clientY);
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isDragging) return;
			const touch = e.touches[0];
			if (!touch) return;
			e.preventDefault();
			updateDragTarget(touch.clientX, touch.clientY);
		};

		const handleTouchEnd = () => {
			endDrag();
		};

		const handleScrollOrResize = () => {
			syncViewportMetrics();
		};

		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('pointercancel', handlePointerUp);
		window.addEventListener('touchstart', handleTouchStart, { passive: false });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', handleTouchEnd);
		window.addEventListener('touchcancel', handleTouchEnd);
		window.addEventListener('resize', handleScrollOrResize);
		window.addEventListener('scroll', handleScrollOrResize, { passive: true });

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointercancel', handlePointerUp);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('touchcancel', handleTouchEnd);
			window.removeEventListener('resize', handleScrollOrResize);
			window.removeEventListener('scroll', handleScrollOrResize);
			document.body.style.cursor = 'default';
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
				dragTargetY,
				anchor
			},
			delta
		);

		if (cardGroupRef) {
			cardGroupRef.position.set(physics.posX, physics.posY, 0);
			cardGroupRef.rotation.set(physics.rotX, physics.rotY, physics.rotZ);
		}

		if (strapRef) {
			const strap = computeStrapTransform(physics, anchor);
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

<T.PerspectiveCamera bind:ref={camRef} makeDefault position={[0, 0, camZ]} fov={CAMERA_FOV} />

<T.AmbientLight intensity={1.75} />
<T.DirectionalLight position={[3.5, 5.5, 7]} intensity={1.25} color="#FFFFFF" />
<T.DirectionalLight position={[-4, -2, 5]} intensity={0.55} color="#60A5FA" />

<T.Mesh bind:ref={strapRef} position={[anchor.anchorX, 2.5, -0.02]}>
	<T.BoxGeometry args={[0.26, 1, 0.024]} />
	<T.MeshStandardMaterial color="#1D4ED8" roughness={0.62} metalness={0.12} toneMapped={false} />
</T.Mesh>

<T.Group
	bind:ref={cardGroupRef}
	position={[anchor.equilibriumX, anchor.equilibriumY, 0]}
>
	<!-- Invisible hit volume covering card body + clasp so raycasting works cleanly at all angles -->
	<T.Mesh bind:ref={hitMeshRef} position={[0, 0.05, 0]}>
		<T.BoxGeometry args={[2.28, 3.32, 0.28]} />
		<T.MeshBasicMaterial transparent={true} opacity={0} depthWrite={false} />
	</T.Mesh>

	<!-- Metallic clasp -->
	<T.Mesh position={[0, LANYARD_CONSTANTS.clipOffsetY, 0]}>
		<T.BoxGeometry args={[0.34, 0.2, 0.11]} />
		<T.MeshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.22} />
	</T.Mesh>

	<!-- Card thickness extruded slab -->
	<T.Mesh geometry={bodyGeometry}>
		<T.MeshStandardMaterial color="#0F172A" metalness={0.22} roughness={0.45} toneMapped={false} />
	</T.Mesh>

	{#if frontTexture}
		<T.Mesh position={[0, 0, 0.036]}>
			<T.PlaneGeometry args={[2.16, 3.14]} />
			<T.MeshStandardMaterial
				map={frontTexture}
				transparent={true}
				alphaTest={0.05}
				roughness={0.32}
				metalness={0.04}
				toneMapped={false}
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
				roughness={0.32}
				metalness={0.04}
				toneMapped={false}
			/>
		</T.Mesh>
	{/if}
</T.Group>
