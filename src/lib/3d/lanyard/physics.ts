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
}

export const LANYARD_CONSTANTS = {
	anchorX: 0,
	anchorY: 3.55,
	equilibriumX: 0,
	equilibriumY: -0.18,
	clipOffsetY: 1.62
} as const;

export function createInitialPhysicsState(): LanyardPhysicsState {
	return {
		posX: LANYARD_CONSTANTS.equilibriumX,
		posY: LANYARD_CONSTANTS.equilibriumY,
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
	const dt = Math.min(Math.max(rawDelta, 0), 0.04);
	const elapsed = state.elapsed + dt;

	const targetX = input.isDragging
		? input.dragTargetX
		: LANYARD_CONSTANTS.equilibriumX + Math.sin(elapsed * 1.1) * 0.055;
	const targetY = input.isDragging
		? input.dragTargetY
		: LANYARD_CONSTANTS.equilibriumY + Math.cos(elapsed * 1.5) * 0.035;

	const stiffness = input.isDragging ? 155 : 56;
	const damping = input.isDragging ? 18.5 : 5.6;

	const ax = -stiffness * (state.posX - targetX) - damping * state.velX;
	const ay = -stiffness * (state.posY - targetY) - damping * state.velY;

	const velX = state.velX + ax * dt;
	const velY = state.velY + ay * dt;
	const posX = state.posX + velX * dt;
	const posY = state.posY + velY * dt;

	const targetRotZ = -posX * 0.18 - velX * 0.048;
	const targetRotX = velY * 0.042 + (input.isHovered ? 0.045 : 0);
	const targetFlipY =
		(input.flipped ? Math.PI : 0) + velX * 0.075 + Math.sin(elapsed * 0.85) * 0.065;

	const rotZ = state.rotZ + (targetRotZ - state.rotZ) * Math.min(1, dt * 11);
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

export function computeStrapTransform(state: LanyardPhysicsState) {
	const clipX = state.posX - Math.sin(state.rotZ) * LANYARD_CONSTANTS.clipOffsetY;
	const clipY = state.posY + Math.cos(state.rotZ) * LANYARD_CONSTANTS.clipOffsetY;
	const dx = clipX - LANYARD_CONSTANTS.anchorX;
	const dy = clipY - LANYARD_CONSTANTS.anchorY;
	const length = Math.max(0.2, Math.hypot(dx, dy));

	return {
		midX: (LANYARD_CONSTANTS.anchorX + clipX) / 2,
		midY: (LANYARD_CONSTANTS.anchorY + clipY) / 2,
		angleZ: Math.atan2(dy, dx) - Math.PI / 2,
		length
	};
}
