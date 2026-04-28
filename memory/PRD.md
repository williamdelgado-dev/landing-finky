# Finky · Landing Institucional · PRD

## Contexto
Rediseño de la landing institucional de Finky (Angular 21, Standalone Components,
Signals + nuevo Control Flow) bajo el lineamiento estético **"Minimalismo Premium"**.

## Repositorio
https://github.com/williamdelgado-dev/landing-finky · rama `main`

## Stack
- Angular 21.2 (Standalone, Signals, Control Flow `@if/@for/@switch`)
- Tailwind 3.4 (preflight off — convive con CSS scoped por host)
- Plus Jakarta Sans + Outfit (Google Fonts)
- AOS para reveal motion + animaciones CSS personalizadas

## Tokens de marca
- Deep Navy `#0f172a`
- White `#FFFFFF`
- Finky Orange `#f16c2d`
- Display: Outfit · Body: Plus Jakarta Sans
- Premium Shadows (difusas, opacidad baja, radio grande)
- Glassmorphism: `backdrop-filter: blur(20px)` + borde 1px translúcido
- Radios: tarjetas 24px, píldoras 999px

## Implementado en esta iteración (28-Abr-2026)
- ✅ Sistema de tokens globales (`src/styles.css`) + utilidades `.fk-glass*`
- ✅ Header glass sticky con divider y dual-logo Finky/IES
- ✅ Footer minimal en 4 columnas con acentos naranja
- ✅ Simulador button premium (pill orange + ghost variant)
- ✅ Alliance section: layout aireado, lista de beneficios con check-pill
- ✅ **Template Uno (rediseño completo):**
  - Hero con velo claro y gradiente sutil (sin overlay oscuro pesado), eyebrow glass, quick-stats card glass
  - Stats: **bento grid** 4 celdas (1 acento navy + 3 white) con micro-animaciones reveal con delay
  - Oferta Académica: **chips reactivos** (custom selects integrados) sobre `tiposPrograma()` (signal) + lista glass con `programasFiltrados()` (signal)
  - Simulador: contenedor radio 24px, glow sutil, sombra premium
- ✅ Templates Dos/Tres: alineadas al sistema de tokens (fonts + colores) preservando su layout
- ✅ Floating widget Lina: modal glassmorphism (navy header + orange CTA)
- ✅ Mock HTTP interceptor en dev para previsualización offline (no afecta producción)

## Lógica preservada (no negociables)
- Signals + computed: `config`, `validatedBanner`, `validatedBullets`, `simuladorUrl`,
  `tiposPrograma`, `programasFiltrados`, `selectedTipo` — sin alteración
- ConfigService aplica `--color-oscuro` y `--color-claro` por IES en `applyColors`
- Imágenes responsive con `<picture>` + `<source media="(max-width: 768px)">`
- Iframe del simulador centralizado, recibe `postMessage` para height/width

## Personas
- Estudiante prospecto (18-30) buscando financiación sin codeudor
- Aliados IES configurando su landing co-branded

## Backlog
- P0: Verificación con datos reales del backend `api-production.finky.la`
- P1: Animaciones extra en bento (parallax sutil), variantes para plantillas 4-5 si las hay
- P1: Modal Lina con nuevo CTA testimonial (avatar + nombre asesor)
- P2: A/B test estilos del CTA principal (orange filled vs ghost)
- P2: Estados vacíos ilustrados para "0 programas en categoría"

## Notas técnicas
- Mock interceptor sólo activo cuando `environment.production === false`. Se sirven slugs `demo`, `areandina`, `ibero`, `salle`.
- En este pod, el dev server corre con `pnpm exec ng serve --host 0.0.0.0 --port 3000`
  (la plantilla supervisor estándar no aplica porque el repo es Angular puro, no Python+React).
