---
name: mova-svelte-portfolio
description: Estructura componentes en Svelte 5 y SCSS modular bajo la estética limpia de MOVA (sin neón ni cuadrículas), implementando la Navbar tipo píldora, la sección Acerca de Mí con foto sin fondo y contadores, el Showcase por pestañas (Proyectos, Certificados, Equipos y Edición de Video, Stack) y la vista interna de detalles (Details View).
---

# MOVA Svelte 5 Portfolio Architecture

## Cuándo usar esta Skill
Úsala siempre que construyas o modifiques el layout principal, el sistema de navegación, las tarjetas de proyectos, el visor de certificados o la vista interna de cada proyecto.

## 1. Sistema de Tokens SCSS (`src/styles/tokens.scss`)
Todo componente debe importar o consumir estas variables CSS sin recurrir a Tailwind:

```scss
:root {
  --bg-obsidian: #070B14;
  --bg-slate: #0F172A;
  --surface-card: rgba(15, 23, 42, 0.65);
  --surface-hover: rgba(30, 41, 59, 0.8);
  --accent-mova: #2563EB;
  --accent-mova-soft: rgba(37, 99, 235, 0.16);
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border-hairline: rgba(148, 163, 184, 0.14);
  --border-active: rgba(37, 99, 235, 0.55);
  --radius-pill: 9999px;
  --radius-card: 20px;
  --transition-snappy: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## 2. Patrón de Foto sin Fondo + Contadores en "Sobre Mí"
- La foto recortada (`.png`) de Santiago debe ir dentro de un contenedor `.portrait-stage` con:
  - Un halo radial trasero muy suave (`background: radial-gradient(circle, var(--accent-mova-soft) 0%, transparent 70%)`).
  - Máscara inferior suave: `-webkit-mask-image: linear-gradient(to bottom, #000 80%, transparent 100%)`.
- Debajo o al costado, renderizar **3 Tarjetas Contadoras** interactivas:
  1. `6+` Proyectos de Alto Impacto (IA, SaaS, Game Dev & Simulaciones).
  2. `2` Certificaciones Destacadas (Python Internacional + Oratoria y Persuasión).
  3. `1er Lugar` Kurios Competition 2026 (Categoría U-Code) + Física UCV.
- Incluir la línea de tiempo editorial con borde fino vertical (`1px solid var(--border-hairline)`) mostrando:
  - **Universidad Central de Venezuela (UCV)** — Licenciatura en Física (Actualidad).
  - **Kurios Competition 2026** — Campeón Categoría U-Code (Liderazgo técnico, oratoria y desarrollo de *The Last Endo*).
  - **Educación Media General** — Bachiller graduado con altas calificaciones.

## 3. Sistema de Pestañas (Portfolio Showcase Tabs) en Svelte 5
Usar `$state` en Svelte 5 para alternar sin recargar la página entre 4 vistas dentro del Showcase:

```svelte
<script lang="ts">
  type TabId = 'projects' | 'certificates' | 'team_video' | 'stack';
  let activeTab = $state<TabId>('projects');
  let selectedProject = $state<Project | null>(null);
</script>
```

- **Pestaña 1 (`projects`):** Grid de los 6 proyectos (*MOVA, The Last Endo, Invoficlib/GiraStock, Be A Legend, Simulación SIMADI, App de Productividad*).
- **Pestaña 2 (`certificates`):** Tarjetas para el **Certificado Internacional de Python** y el **Certificado en Oratoria y Persuasión**. Al hacer clic, abren un modal Lightbox con fondo desenfocado y botón `✕`.
- **Pestaña 3 (`team_video`):**
  - Bloque **Equipos & Liderazgo**: Galería interactiva con las fotos de los equipos de trabajo (especialmente Kurios 2026 e investigaciones), explicando cómo la oratoria y persuasión impulsaron la presentación de cada proyecto.
  - Bloque **Edición de Video**: Reproductor limpio tipo showreel mostrando su experiencia básica en edición de video (cortes dinámicos, ritmo visual y narrativa).
- **Pestaña 4 (`stack`):** Iconografía SVG limpia agrupada por áreas (Desarrollo & Arquitectura, Física & Modelado Matemático, Game Dev & Shaders, Edición & Comunicación).

## 4. Vista Interna de Proyecto (`ProjectDetailsModal.svelte`)
Cuando `selectedProject !== null`, el portafolio despliega una vista interna completa (inspirada en el flujo `Details →` de los videos de referencia):
- Cabecera con botón `← Volver`, breadcrumbs (`Proyectos / {selectedProject.title}`) y badges de rol.
- Columna izquierda: Resumen ejecutivo, arquitectura técnica, lista de **Key Features** y sección de **Equipo / Rol de Liderazgo**.
- Columna derecha: Galería de capturas/video demostrativo y bloque de acción:
  - Si `selectedProject.accessType === 'public'`, renderizar botones de **Acceso Directo (Demo / Repo)**.
  - Si `selectedProject.accessType === 'explanatory'` (*Simulación SIMADI* y *App de Productividad*), renderizar un badge elegante `"Arquitectura Interna / Uso Privado"` junto con un desglose interactivo de sus módulos sin links externos rotos.
