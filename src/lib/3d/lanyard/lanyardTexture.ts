import * as THREE from 'three';

const LOGICAL_W = 768;
const LOGICAL_H = 1120;
const TEX_SCALE = 2; // 1536 x 2240 retina-sharp canvas texture

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
	const photoX = W / 2 - 142;
	const photoY = 178;
	const photoSize = 284;

	roundRectPath(ctx, photoX, photoY, photoSize, photoSize, 38);
	ctx.fillStyle = '#0D1528';
	ctx.fill();
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = 'rgba(96, 165, 250, 0.42)';
	ctx.stroke();

	ctx.save();
	roundRectPath(ctx, photoX, photoY, photoSize, photoSize, 38);
	ctx.clip();

	const portraitGlow = ctx.createRadialGradient(
		W / 2,
		photoY + 126,
		10,
		W / 2,
		photoY + 142,
		160
	);
	portraitGlow.addColorStop(0, 'rgba(37, 99, 235, 0.28)');
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
		// Clean typographic editorial monogram
		ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.arc(W / 2, photoY + 132, 82, 0, Math.PI * 2);
		ctx.stroke();

		ctx.fillStyle = '#F8FAFC';
		ctx.font = '800 84px "Bricolage Grotesque", system-ui, sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('SR', W / 2, photoY + 134);

		ctx.fillStyle = '#93C5FD';
		ctx.font = '500 18px "JetBrains Mono", monospace';
		ctx.textBaseline = 'alphabetic';
		ctx.fillText('SANTIAGO RIVERO', W / 2, photoY + 252);
	}

	ctx.restore();
}

function renderFrontCanvas(
	ctx: CanvasRenderingContext2D,
	photoImg: HTMLImageElement | null
): void {
	const W = LOGICAL_W;
	const H = LOGICAL_H;

	ctx.save();
	ctx.setTransform(TEX_SCALE, 0, 0, TEX_SCALE, 0, 0);
	ctx.clearRect(0, 0, W, H);
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';

	// Card body background
	roundRectPath(ctx, 14, 14, W - 28, H - 28, 48);
	const bgGrad = ctx.createLinearGradient(0, 0, W, H);
	bgGrad.addColorStop(0, '#101B33');
	bgGrad.addColorStop(0.55, '#0B1222');
	bgGrad.addColorStop(1, '#070C17');
	ctx.fillStyle = bgGrad;
	ctx.fill();

	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
	ctx.stroke();

	ctx.save();
	roundRectPath(ctx, 14, 14, W - 28, H - 28, 48);
	ctx.clip();

	// Subtle top atmospheric cobalt lighting
	const halo = ctx.createRadialGradient(W * 0.5, 310, 20, W * 0.5, 310, 360);
	halo.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
	halo.addColorStop(1, 'rgba(37, 99, 235, 0)');
	ctx.fillStyle = halo;
	ctx.fillRect(0, 0, W, H);

	// Cobalt top header bar
	ctx.fillStyle = '#2563EB';
	ctx.fillRect(14, 14, W - 28, 118);

	// Lanyard slot cutout
	roundRectPath(ctx, W / 2 - 58, 40, 116, 22, 11);
	ctx.fillStyle = '#070B14';
	ctx.fill();

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '500 22px "JetBrains Mono", monospace';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'alphabetic';
	ctx.fillText('PORTAFOLIO // 2026', W / 2, 106);

	drawPortraitSlot(ctx, W, photoImg);

	// Prominent Name
	ctx.fillStyle = '#F8FAFC';
	ctx.font = '800 58px "Bricolage Grotesque", system-ui, sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('Santiago Rivero', W / 2, 548);

	// Editorial italic role line + clean degree status
	ctx.fillStyle = '#BFDBFE';
	ctx.font = 'italic 400 32px "Instrument Serif", Georgia, serif';
	ctx.fillText('Software Developer & Creative Engineer', W / 2, 602);

	ctx.fillStyle = '#CBD5E1';
	ctx.font = '500 23px "Plus Jakarta Sans", system-ui, sans-serif';
	ctx.fillText('Estudiante de Física · UCV (1er Semestre)', W / 2, 650);

	// Crisp divider
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(76, 704);
	ctx.lineTo(W - 76, 704);
	ctx.stroke();

	// Skill pills
	const chips = ['IA & VISIÓN', 'WEB & 3D', 'GAME DEV'];
	chips.forEach((chip, index) => {
		const chipW = 186;
		const gap = 18;
		const startX = W / 2 - (chips.length * chipW + (chips.length - 1) * gap) / 2;
		const cx = startX + index * (chipW + gap);
		roundRectPath(ctx, cx, 742, chipW, 50, 25);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
		ctx.fill();
		ctx.lineWidth = 1.6;
		ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
		ctx.stroke();

		ctx.fillStyle = '#F1F5F9';
		ctx.font = '500 18px "JetBrains Mono", monospace';
		ctx.fillText(chip, cx + chipW / 2, 773);
	});

	// Bottom Identity Plate (focused strictly on Santiago Rivero, no "1er lugar")
	roundRectPath(ctx, 54, 846, W - 108, 186, 28);
	ctx.fillStyle = 'rgba(37, 99, 235, 0.14)';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'rgba(96, 165, 250, 0.45)';
	ctx.stroke();

	ctx.fillStyle = '#93C5FD';
	ctx.font = '500 19px "JetBrains Mono", monospace';
	ctx.fillText('SANTIAGO ALFONSO RIVERO MÉNDEZ', W / 2, 902);

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '700 30px "Bricolage Grotesque", system-ui, sans-serif';
	ctx.fillText('Caracas, Venezuela', W / 2, 954);

	ctx.fillStyle = '#CBD5E1';
	ctx.font = '500 20px "JetBrains Mono", monospace';
	ctx.fillText('@santi.arm_dev · santiago.rivero0203@gmail.com', W / 2, 998);

	ctx.restore();
	ctx.restore();
}

function renderBackCanvas(ctx: CanvasRenderingContext2D): void {
	const W = LOGICAL_W;
	const H = LOGICAL_H;

	ctx.save();
	ctx.setTransform(TEX_SCALE, 0, 0, TEX_SCALE, 0, 0);
	ctx.clearRect(0, 0, W, H);
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';

	roundRectPath(ctx, 14, 14, W - 28, H - 28, 48);
	const bgGrad = ctx.createLinearGradient(0, 0, W, H);
	bgGrad.addColorStop(0, '#0F182D');
	bgGrad.addColorStop(1, '#070C17');
	ctx.fillStyle = bgGrad;
	ctx.fill();

	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
	ctx.stroke();

	ctx.save();
	roundRectPath(ctx, 14, 14, W - 28, H - 28, 48);
	ctx.clip();

	// Slot cutout
	roundRectPath(ctx, W / 2 - 58, 40, 116, 22, 11);
	ctx.fillStyle = '#070B14';
	ctx.fill();
	ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
	ctx.lineWidth = 2;
	ctx.stroke();

	ctx.fillStyle = '#60A5FA';
	ctx.font = '500 21px "JetBrains Mono", monospace';
	ctx.textAlign = 'left';
	ctx.fillText("m·x'' + c·x' + k·x = 0", 64, 126);

	ctx.fillStyle = '#F8FAFC';
	ctx.font = '700 42px "Bricolage Grotesque", system-ui, sans-serif';
	ctx.fillText('Perfil y Credenciales', 64, 184);

	const seals = [
		{
			badge: 'UCV · FACULTAD DE CIENCIAS',
			title: 'Física · 1er Semestre',
			desc: 'Iniciando formación universitaria en Caracas.'
		},
		{
			badge: 'CEP · FACES · UCV (N° 000427)',
			title: 'Oratoria y Persuasión',
			desc: 'Comunicación técnica y defensa clara ante jurados.'
		},
		{
			badge: 'IA & AUTOMATIZACIÓN',
			title: 'Python & Ecosistema IA Google',
			desc: 'Algoritmos, Gemini, AI Studio y flujos agénticos.'
		},
		{
			badge: 'INGENIERÍA & PRODUCTO',
			title: 'MOVA IA, Web 3D & Videojuegos',
			desc: 'Visión artificial a 60 FPS, WebGL2 y Svelte 5.'
		}
	];

	seals.forEach((seal, idx) => {
		const cardY = 236 + idx * 182;
		roundRectPath(ctx, 60, cardY, W - 120, 156, 24);
		ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
		ctx.stroke();

		roundRectPath(ctx, 60, cardY + 26, 6, 104, 3);
		ctx.fillStyle = '#3B82F6';
		ctx.fill();

		ctx.fillStyle = '#93C5FD';
		ctx.font = '500 18px "JetBrains Mono", monospace';
		ctx.fillText(seal.badge, 92, cardY + 48);

		ctx.fillStyle = '#F8FAFC';
		ctx.font = '700 28px "Bricolage Grotesque", system-ui, sans-serif';
		ctx.fillText(seal.title, 92, cardY + 90);

		ctx.fillStyle = '#CBD5E1';
		ctx.font = '400 21px "Plus Jakarta Sans", system-ui, sans-serif';
		ctx.fillText(seal.desc, 92, cardY + 126);
	});

	ctx.fillStyle = '#94A3B8';
	ctx.font = '500 19px "JetBrains Mono", monospace';
	ctx.textAlign = 'center';
	ctx.fillText('SANTIAGO RIVERO · CARACAS · 2026', W / 2, 1034);

	ctx.restore();
	ctx.restore();
}

export function createFrontTexture(): THREE.CanvasTexture | null {
	if (typeof document === 'undefined') return null;
	const canvas = document.createElement('canvas');
	canvas.width = LOGICAL_W * TEX_SCALE;
	canvas.height = LOGICAL_H * TEX_SCALE;
	const ctx = canvas.getContext('2d');
	if (!ctx) return null;

	let loadedPortrait: HTMLImageElement | null = null;
	renderFrontCanvas(ctx, loadedPortrait);

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 16;
	texture.minFilter = THREE.LinearMipmapLinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.generateMipmaps = true;
	texture.needsUpdate = true;

	// Re-render crisply once web fonts finish loading
	if ('fonts' in document) {
		document.fonts.ready.then(() => {
			renderFrontCanvas(ctx, loadedPortrait);
			texture.needsUpdate = true;
		});
	}

	const tryLoadPortrait = (urls: string[], idx = 0) => {
		if (idx >= urls.length) return;
		const img = new Image();
		img.onload = () => {
			loadedPortrait = img;
			renderFrontCanvas(ctx, loadedPortrait);
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
	canvas.width = LOGICAL_W * TEX_SCALE;
	canvas.height = LOGICAL_H * TEX_SCALE;
	const ctx = canvas.getContext('2d');
	if (!ctx) return null;

	renderBackCanvas(ctx);

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 16;
	texture.minFilter = THREE.LinearMipmapLinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.generateMipmaps = true;
	texture.needsUpdate = true;

	if ('fonts' in document) {
		document.fonts.ready.then(() => {
			renderBackCanvas(ctx);
			texture.needsUpdate = true;
		});
	}

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
