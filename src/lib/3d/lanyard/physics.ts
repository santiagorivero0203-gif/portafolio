export interface LanyardAnchor {
	anchorX: number;
	anchorY: number;
	equilibriumX: number;
	equilibriumY: number;
	clipOffsetY: number;
}

export interface LanyardPhysicsState {
	posX: number;
	posY: number;
	velX: number;
	velY: number;
	rotX: number;
	rotY: number;
	rotZ: number;
	velRotY: number;
	elapsed: number;
}

export interface LanyardPhysicsInput {
	isDragging: boolean;
	isHovered: boolean;
	flipped: boolean;
	dragTargetX: number;
	dragTargetY: number;
	anchor?: LanyardAnchor;
}

export const LANYARD_CONSTANTS: LanyardAnchor = {
	anchorX: 0,
	anchorY: 4.35,
	equilibriumX: 0,
	equilibriumY: -0.32,
	clipOffsetY: 1.58
};

export function createInitialPhysicsState(
	anchor: LanyardAnchor = LANYARD_CONSTANTS
): LanyardPhysicsState {
	return {
		posX: anchor.equilibriumX,
		posY: anchor.equilibriumY,
		velX: 0,
		velY: 0,
		rotX: 0,
		rotY: 0,
		rotZ: 0,
		velRotY: 0,
		elapsed: 0
	};
}

/**
 * Integrador de resorte amortiguado + péndulo (Ley de Hooke: F = -k*x - c*v).
 * Puro y determinista para poder validarlo fuera de Three.js.
 */
export function stepLanyardPhysics(
	state: LanyardPhysicsState,
	input: LanyardPhysicsInput,
	rawDelta: number
): LanyardPhysicsState {
	const anchor = input.anchor ?? LANYARD_CONSTANTS;
	const dt = Math.min(Math.max(rawDelta, 0), 0.04);
	const elapsed = state.elapsed + dt;

	const targetX = input.isDragging
		? input.dragTargetX
		: anchor.equilibriumX + Math.sin(elapsed * 1.1) * 0.045;
	const targetY = input.isDragging
		? input.dragTargetY
		: anchor.equilibriumY + Math.cos(elapsed * 1.45) * 0.03;

	const stiffness = input.isDragging ? 165 : 54;
	const damping = input.isDragging ? 19 : 5.4;

	const ax = -stiffness * (state.posX - targetX) - damping * state.velX;
	const ay = -stiffness * (state.posY - targetY) - damping * state.velY;

	const velX = state.velX + ax * dt;
	const velY = state.velY + ay * dt;
	const posX = state.posX + velX * dt;
	const posY = state.posY + velY * dt;

	// Pendulum tilt points the upper clasp directly back toward the suspension anchor
	const dxAnchor = posX - anchor.anchorX;
	const dyAnchor = Math.max(0.8, anchor.anchorY - posY);
	const targetRotZ = Math.atan2(dxAnchor, dyAnchor) * 0.92 - velX * 0.036;
	const targetRotX = velY * 0.038 + (input.isHovered ? 0.045 : 0);
	const targetFlipY =
		(input.flipped ? Math.PI : 0) + velX * 0.065 + Math.sin(elapsed * 0.85) * 0.055;

	const rotZ = state.rotZ + (targetRotZ - state.rotZ) * Math.min(1, dt * 12);
	const rotX = state.rotX + (targetRotX - state.rotX) * Math.min(1, dt * 10);

	const rotForceY = -68 * (state.rotY - targetFlipY) - 11.5 * state.velRotY;
	const velRotY = state.velRotY + rotForceY * dt;
	const rotY = state.rotY + velRotY * dt;

	return {
		posX,
		posY,
		velX,
		velY,
		rotX,
		rotY,
		rotZ,
		velRotY,
		elapsed
	};
}

export function computeStrapTransform(
	state: LanyardPhysicsState,
	anchor: LanyardAnchor = LANYARD_CONSTANTS
) {
	const clipX = state.posX - Math.sin(state.rotZ) * anchor.clipOffsetY;
	const clipY = state.posY + Math.cos(state.rotZ) * anchor.clipOffsetY;
	const dx = clipX - anchor.anchorX;
	const dy = clipY - anchor.anchorY;
	const length = Math.max(0.2, Math.hypot(dx, dy));

	return {
		midX: (anchor.anchorX + clipX) / 2,
		midY: (anchor.anchorY + clipY) / 2,
		angleZ: Math.atan2(dy, dx) - Math.PI / 2,
		length
	};
}
