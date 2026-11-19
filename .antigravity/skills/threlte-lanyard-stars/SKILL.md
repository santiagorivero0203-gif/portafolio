---
name: threlte-lanyard-stars
description: Construye en Threlte (Three.js para Svelte 5) el Carnet 3D interactivo con físicas de péndulo (3D Lanyard) para el Hero y el fondo espacial de estrellas flotantes sin cuadrículas.
---

# Threlte 3D Lanyard & Atmospheric Starfield

## Cuándo usar esta Skill
Úsala al construir el fondo global del portafolio y la columna derecha del Hero donde cuelga la credencial interactiva 3D de Santiago.

## 1. Fondo de Estrellas Flotantes (`StarfieldCanvas.svelte`)
- Crear un `<Canvas>` fijo en `position: fixed; inset: 0; z-index: 0; pointer-events: none;`.
- Generar entre 180 y 250 partículas usando `THREE.BufferGeometry` y `THREE.PointsMaterial` con tamaño variable y colores entre blanco (`#F8FAFC`) y azul cobalto suave (`#60A5FA`).
- En `useTask((delta) => ...)`, aplicar una rotación lenta y un ligero parallax vinculado a `window.scrollY` sin usar grillas ni líneas de fondo.

## 2. Carnet 3D Interactivo con Físicas (`HeroLanyard3D.svelte`)
Recrea el efecto de credencial colgante interactiva de los videos de referencia conectada a la carrera de Física en la UCV:
- **Comportamiento Físico:**
  - El carnet cuelga de una cinta superior (lanyard) anclada al borde superior derecho del Hero.
  - Al arrastrarlo con el cursor (`pointerdown` / `pointermove`), el carnet se desplaza siguiendo el puntero; al soltarlo (`pointerup`), regresa a su punto de equilibrio mediante una ecuación de péndulo amortiguado / Ley de Hooke (`F = -k * x - c * v`) calculada en `useTask`.
- **Diseño de la Credencial (Textura Canvas 2D dinámica o HTML Portal):**
  - **Frente del Carnet:**
    - Header con acento Azul Cobalto MOVA (`#2563EB`) y código `UCV // FÍSICA & DEV`.
    - Foto de Santiago perfectamente integrada.
    - Nombre: **SANTIAGO RIVERO**.
    - Subtítulo: **Software Developer & Physics Student (UCV)**.
    - Badge inferior destacado: **🏆 CAMPEÓN KURIOS 2026 (U-CODE)**.
  - **Reverso del Carnet (visible al rotar el carnet):**
    - Sello de Python Internacional, Oratoria & Liderazgo, IA y Shaders.
- **Rendimiento:** Mantener `dpr={[1, 2]}` en el `<Canvas>` de Threlte y pausar cálculos innecesarios cuando el usuario baje más allá de la sección Hero usando `IntersectionObserver`.
