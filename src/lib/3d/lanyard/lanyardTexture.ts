import * as THREE from 'three';
import { profileData } from '$lib/data/portfolioData';

function roundRectPath(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
): void {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	ctx.lineTo(x + w, y + h - r);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	ctx.lineTo(x + r, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
}

function drawPortraitSlot(
	ctx: CanvasRenderingContext2D,
	W: number,
	photoImg: HTMLImageElement | null
): void {
	const photoX = W / 2 - 145;
	const photoY = 186;
	const photoSize = 290;

	roundRectPath(ctx, photoX, photoY, photoSize, photoSize, 36);
	ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'rgba(59, 130, 246, 0.44)';
	ctx.stroke();

	ctx.save();
	roundRectPath(ctx, photoX, photoY, photoSize, photoSize, 36);
	ctx.clip();

	const portraitGlow = ctx.createRadialGradient(
		W / 2,
		photoY + 130,
		10,
		W / 2,
		photoY + 145,
		155
	);
	portraitGlow.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
	portraitGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
	ctx.fillStyle = portraitGlow;
	ctx.fillRect(photoX, photoY, photoSize, photoSize);

	if (photoImg && photoImg.complete && photoImg.naturalWidth > 0) {
		const ratio = Math.max(photoSize / photoImg.naturalWidth, photoSize / photoImg.naturalHeight);
		const dw = photoImg.naturalWidth * ratio;
		const dh = photoImg.naturalHeight * ratio;
		const dx = photoX + (photoSize - dw) / 2;
		const dy = photoY + (photoSize - dh) / 2;
		ctx.drawImage(photoImg, dx, dy, dw, dh);
	} else {
		ctx.fillStyle = 'rgba(248, 250, 252, 0.1)';
		ctx.beginPath();
		ctx.arc(W / 2, photoY + 110, 44, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.ellipse(W / 2, photoY + 260, 96, 84, 0, Math.PI, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = '#F8FAFC';
		ctx.font = '700 54px "Space Grotesk", system-ui, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText('SR', W / 2, photoY + 178);

		ctx.fillStyle = '#94A3B8';
		ctx.font = '500 17px "IBM Plex Mono", monospace';
		ctx.fillText('FÍSICA UCV', W / 2, photoY + 264);
	}

	ctx.restore();
}

function renderFrontCanvas(
	ctx: CanvasRenderingContext2D,
	W: number,
	H: number,
	photoImg: HTMLImageElement | null
): void {
	ctx.clearRect(0, 0, W, H);

	roundRectPath(ctx, 16, 16, W - 32, H - 32, 48);
	const bgGrad = ctx.createLinearGradient(0, 0, W, H);
	bgGrad.addColorStop(0, '#0F172A');
	bgGrad.addColorStop(0.55, '#0B1120');
	bgGrad.addColorStop(1, '#070B14');
	ctx.fillStyle = bgGrad;
	ctx.fill();

	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
	ctx.stroke();

	ctx.save();
	roundRectPath(ctx, 16, 16, W - 32, H - 32, 48);
	ctx.clip();

	const halo = ctx.createRadialGradient(W * 0.5, 360, 20, W * 0.5, 360, 320);
	halo.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
	halo.addColorStop(1, 'rgba(37, 99, 235, 0)');
	ctx.fillStyle = halo;
	ctx.fillRect(0, 0, W, H);

	ctx.fillStyle = '#2563EB';
	ctx.fillRect(16, 16, W - 32, 118);

	roundRectPath(ctx, W / 2 - 58, 44, 116, 22, 11);
	ctx.fillStyle = '#070B14';
	ctx.fill();

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '500 23px "IBM Plex Mono", monospace';
	ctx.textAlign = 'center';
	ctx.fillText(profileData.badgeCode, W / 2, 108);

	drawPortraitSlot(ctx, W, photoImg);

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '700 50px "Space Grotesk", system-ui, sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('SANTIAGO RIVERO', W / 2, 560);

	ctx.fillStyle = '#CBD5E1';
	ctx.font = '500 24px "DM Sans", system-ui, sans-serif';
	ctx.fillText('Software Developer &', W / 2, 616);
	ctx.fillText('Licenciatura en Física (UCV)', W / 2, 652);

	ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(84, 706);
	ctx.lineTo(W - 84, 706);
	ctx.stroke();

	const chips = ['IA · VISIÓN', 'GAME DEV', 'SHADERS GLSL'];
	chips.forEach((chip, index) => {
		const chipW = 184;
		const gap = 18;
		const startX = W / 2 - (chips.length * chipW + (chips.length - 1) * gap) / 2;
		const cx = startX + index * (chipW + gap);
		roundRectPath(ctx, cx, 742, chipW, 48, 24);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
		ctx.fill();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
		ctx.stroke();

		ctx.fillStyle = '#E2E8F0';
		ctx.font = '500 17px "IBM Plex Mono", monospace';
		ctx.fillText(chip, cx + chipW / 2, 772);
	});

	roundRectPath(ctx, 56, 858, W - 112, 168, 28);
	ctx.fillStyle = 'rgba(37, 99, 235, 0.14)';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
	ctx.stroke();

	ctx.fillStyle = '#93C5FD';
	ctx.font = '500 19px "IBM Plex Mono", monospace';
	ctx.fillText('KURIOS COMPETITION 2026', W / 2, 912);

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '700 31px "Space Grotesk", system-ui, sans-serif';
	ctx.fillText('1ER LUGAR · U-CODE', W / 2, 962);

	ctx.fillStyle = '#CBD5E1';
	ctx.font = '500 20px "DM Sans", system-ui, sans-serif';
	ctx.fillText('The Last Endo · 21 de marzo de 2026', W / 2, 1002);

	ctx.restore();
}

export function createFrontTexture(): THREE.CanvasTexture | null {
	if (typeof document === 'undefined') return null;
	const canvas = document.createElement('canvas');
	canvas.width = 768;
	canvas.height = 1120;
	const ctx = canvas.getContext('2d');
	if (!ctx) return null;

	renderFrontCanvas(ctx, canvas.width, canvas.height, null);

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	texture.needsUpdate = true;

	const tryLoadPortrait = (urls: string[], idx = 0) => {
		if (idx >= urls.length) return;
		const img = new Image();
		img.onload = () => {
			renderFrontCanvas(ctx, canvas.width, canvas.height, img);
			texture.needsUpdate = true;
		};
		img.onerror = () => {
			tryLoadPortrait(urls, idx + 1);
		};
		img.src = urls[idx];
	};

	tryLoadPortrait([
		'/images/portrait/santiago-badge.png',
		'/images/portrait/santiago-cutout.png'
	]);

	return texture;
}

export function createBackTexture(): THREE.CanvasTexture | null {
	if (typeof document === 'undefined') return null;
	const canvas = document.createElement('canvas');
	canvas.width = 768;
	canvas.height = 1120;
	const ctx = canvas.getContext('2d');
	if (!ctx) return null;

	const W = canvas.width;
	const H = canvas.height;

	ctx.clearRect(0, 0, W, H);

	roundRectPath(ctx, 16, 16, W - 32, H - 32, 48);
	const bgGrad = ctx.createLinearGradient(0, 0, W, H);
	bgGrad.addColorStop(0, '#0B1120');
	bgGrad.addColorStop(1, '#070B14');
	ctx.fillStyle = bgGrad;
	ctx.fill();

	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
	ctx.stroke();

	ctx.save();
	roundRectPath(ctx, 16, 16, W - 32, H - 32, 48);
	ctx.clip();

	roundRectPath(ctx, W / 2 - 58, 44, 116, 22, 11);
	ctx.fillStyle = '#070B14';
	ctx.fill();
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
	ctx.lineWidth = 2;
	ctx.stroke();

	ctx.fillStyle = '#3B82F6';
	ctx.font = '500 20px "IBM Plex Mono", monospace';
	ctx.textAlign = 'left';
	ctx.fillText("m·x'' + c·x' + k·x = 0", 68, 128);

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '700 38px "Space Grotesk", system-ui, sans-serif';
	ctx.fillText('Credenciales y Sellos', 68, 184);

	const seals = [
		{
			badge: 'UCV · FACULTAD DE CIENCIAS',
			title: 'Licenciatura en Física',
			desc: 'Bachiller con altas calificaciones (17.84 / 20).'
		},
		{
			badge: 'CEP · FACES · UCV (N° 000427)',
			title: 'Oratoria y Persuasión',
			desc: 'Comunicación técnica y defensa ante jurados.'
		},
		{
			badge: 'CERTIFICADO INTERNACIONAL',
			title: 'Python Avalado',
			desc: 'Algorítmica, simulación y bases para IA.'
		},
		{
			badge: 'ARQUITECTURA & GRÁFICOS',
			title: 'MOVA IA & Shaders GLSL',
			desc: 'Visión artificial a 60 FPS, WebGL2 y Svelte 5.'
		}
	];

	seals.forEach((seal, idx) => {
		const cardY = 242 + idx * 176;
		roundRectPath(ctx, 64, cardY, W - 128, 150, 24);
		ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
		ctx.fill();
		ctx.lineWidth = 1.8;
		ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
		ctx.stroke();

		roundRectPath(ctx, 64, cardY + 26, 6, 98, 3);
		ctx.fillStyle = '#2563EB';
		ctx.fill();

		ctx.fillStyle = '#60A5FA';
		ctx.font = '500 17px "IBM Plex Mono", monospace';
		ctx.fillText(seal.badge, 94, cardY + 46);

		ctx.fillStyle = '#F8FAFC';
		ctx.font = '700 26px "Space Grotesk", system-ui, sans-serif';
		ctx.fillText(seal.title, 94, cardY + 86);

		ctx.fillStyle = '#94A3B8';
		ctx.font = '400 20px "DM Sans", system-ui, sans-serif';
		ctx.fillText(seal.desc, 94, cardY + 120);
	});

	ctx.fillStyle = '#64748B';
	ctx.font = '500 18px "IBM Plex Mono", monospace';
	ctx.textAlign = 'center';
	ctx.fillText('CARACAS · UCV · 2026', W / 2, 1028);

	ctx.restore();

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	texture.needsUpdate = true;
	return texture;
}

export function createCardBodyGeometry(): THREE.ExtrudeGeometry {
	const w = 2.12;
	const h = 3.08;
	const r = 0.14;
	const hw = w / 2;
	const hh = h / 2;

	const shape = new THREE.Shape();
	shape.moveTo(-hw + r, -hh);
	shape.lineTo(hw - r, -hh);
	shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
	shape.lineTo(hw, hh - r);
	shape.quadraticCurveTo(hw, hh, hw - r, hh);
	shape.lineTo(-hw + r, hh);
	shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
	shape.lineTo(-hw, -hh + r);
	shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

	const geo = new THREE.ExtrudeGeometry(shape, {
		depth: 0.04,
		bevelEnabled: true,
		bevelSegments: 2,
		steps: 1,
		bevelSize: 0.012,
		bevelThickness: 0.012
	});
	geo.center();
	return geo;
}
