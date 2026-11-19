# Mapa de Assets Multimedia (`static/`)

Los componentes usan `Media.svelte` con fallback limpio si un archivo aún no existe. Para activar cada imagen o video real, coloca el archivo en la ruta exacta indicada:

## Retratos (PNG sin fondo y 1:1 para carnet)
- `static/images/portrait/santiago-cutout.png` — Retrato recortado sin fondo (sección Sobre mí)
- `static/images/portrait/santiago-badge.png` — Foto 1:1 para el carnet 3D (opcional; si falta usa `santiago-cutout.png`)

## Certificados (`static/images/certificates/`)
- `kurios-2026-primer-lugar.webp` — Generado desde `certificados/Primer Lugar Kurios competition.pdf`
- `oratoria-persuasion.webp` — Generado desde `certificados/000427-Santiago-Rivero-32.988.090.pdf`
- `python-international.webp` — Diploma internacional de Python

## Proyectos (`static/images/projects/<id>/` y `static/videos/projects/<id>/`)
Cada proyecto (`mova`, `the-last-endo`, `invoficlib-girastock`, `be-a-legend`, `simulacion-simadi`, `app-productividad`):
- `static/images/projects/<id>/cover.webp` — Portada 16:10
- `static/images/projects/<id>/01.webp`, `02.webp` — Capturas para la vista `/proyectos/<id>`
- `static/videos/projects/mova/preview.mp4` — Clip loop corto (muted, ≤10 s)

## Equipos y Edición de Video
- `static/images/teams/kurios-2026-01.webp` — Foto del equipo ganador de Kurios 2026
- `static/images/teams/research-chemistry-01.webp` — Foto del equipo de investigación experimental de química
- `static/videos/reels/tech-devlog-cut.mp4` — Showreel `@santi.arm_dev` / `@SR Developer`
- `static/videos/reels/pitch-visual-support.mp4` — Piezas visuales para pitch y divulgación
