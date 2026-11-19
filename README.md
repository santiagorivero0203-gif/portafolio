# Portafolio — Santiago Rivero (`@SR Developer`)

Portafolio personal de **Santiago Alfonso Rivero Méndez**, Desarrollador de Software y estudiante de Licenciatura en Física en la **Universidad Central de Venezuela (UCV)**, Campeón (1er Lugar Absoluto) de la **Kurios Competition 2026 — Categoría U-Code** liderando *The Last Endo*.

- **Repositorio:** [github.com/santiagorivero0203-gif/portafolio](https://github.com/santiagorivero0203-gif/portafolio)
- **Perfil de GitHub:** [github.com/santiagorivero0203-gif](https://github.com/santiagorivero0203-gif)

## Stack Tecnológico

- **Core:** SvelteKit 2 + Svelte 5 (Runes API: `$state`, `$derived`, `$effect`, `$props`) + TypeScript
- **Motor 3D & Físicas:** Threlte 8 (`@threlte/core`, `@threlte/extras`) + Three.js
- **Estilos:** SCSS Modular (`src/styles/tokens.scss`, `src/styles/global.scss`) bajo estética editorial MOVA (cero neón, cero cuadrículas)
- **Scroll y Animaciones:** Lenis + GSAP

## Estructura del Proyecto

```text
├── .antigravityrules                  # Reglas del proyecto y dirección de arte MOVA
├── .antigravity/skills/               # Skills especializadas (arquitectura MOVA y Threlte 3D)
├── CONTEXT.md                         # Documento maestro de perfil, trayectoria y proyectos
├── src/
│   ├── app.html
│   ├── styles/
│   │   ├── tokens.scss
│   │   └── global.scss
│   ├── lib/
│   │   ├── components/
│   │   │   ├── StarfieldCanvas.svelte # Fondo estelar fijo en Threlte
│   │   │   ├── StarfieldScene.svelte  # Partículas + parallax por scroll
│   │   │   ├── Navbar.svelte          # Barra flotante tipo píldora con indicador activo
│   │   │   ├── Hero.svelte            # Hero editorial con typewriter de roles
│   │   │   ├── HeroLanyard3D.svelte   # Contenedor 3D con IntersectionObserver
│   │   │   └── LanyardScene.svelte    # Carnet 3D con física de péndulo (Ley de Hooke)
│   │   └── data/
│   │       └── portfolioData.ts       # Perfil, 6 proyectos reales, certificados y contexto
│   └── routes/
│       ├── +layout.svelte
│       └── +page.svelte
└── package.json
```

## Instalación y Desarrollo Local

Requisitos previos: **Node.js (LTS)** y **Git**.

```bash
npm install
npm run check
npm run dev
```

Para generar el build de producción y previsualizarlo:

```bash
npm run build
npm run preview
```

## Publicación en GitHub

```bash
git init
git add .
git commit -m "Initial commit: Svelte 5 + Threlte portfolio foundation"
git branch -M main
git remote add origin https://github.com/santiagorivero0203-gif/portafolio.git
git push -u origin main
```
