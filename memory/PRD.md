# Finky - Landing + Sections Redesign

## Problem Statement
Cliente (Finky) pidió mejorar 3 secciones de su web usando solo #fc6223 (naranja) y #ffffff:
1. Sección "Qué es Finky" — rediseño minimalista
2. Página FAQ — basada en https://finky.la/preguntas/
3. Página Instituciones Aliadas — basada en https://finky.la/instituciones-aliadas/

Requerimiento clave: "solo maqueta, el dev implementa la lógica" + mantener el aspecto minimalista del home.

## Tech Stack
- Angular 21 + TypeScript (standalone components)
- CSS puro (Outfit + Plus Jakarta Sans)
- pnpm

## What's Been Implemented (21 Abr 2026)
- ✅ Rediseño completo `/que-es-finky` (hero + stats, misión con chip flotante, 6 pilares, 4 pasos, CTA naranja)
- ✅ Nueva página `/preguntas` con sidebar de 5 categorías (Sobre Finky, Registro, Pagos, Renovación, Instituciones), acordeón animado, tarjeta WhatsApp y CTA final
- ✅ Nueva página `/instituciones-aliadas` con hero stats, buscador decorativo, filtros por tipo (Todas/Universidades/Corporaciones/Instituciones/Fundaciones) y grid de 25 instituciones con cards premium
- ✅ Header actualizado: tokens ahora usan #fc6223 (botones Ingreso y Registrarse en naranja); routerLink a nuevas rutas
- ✅ Rutas añadidas: `/preguntas`, `/instituciones-aliadas`
- ✅ `angular.json` → `serve.options.allowedHosts` para permitir preview domain
- ✅ Lint pasa limpio

## Design System (todas las páginas)
- Primary: #fc6223 + hover #e5521a
- Surface: #ffffff + soft bg #f8fafc + peach soft #fff4ee
- Text: #0f172a (titles) / #64748b (body)
- Fonts: Outfit (headings, 800 weight) + Plus Jakarta Sans (body)
- Radius: 14-28px botones/cards, 100px pills
- Animaciones fadeUp escalonadas (delays 0.08s)

## Files Touched
- `/app/src/app/app.routes.ts`
- `/app/src/app/features/site/components/header/header.component.ts`
- `/app/src/app/features/site/pages/que-es-finky/*`
- `/app/src/app/features/site/pages/preguntas/*` (new)
- `/app/src/app/features/site/pages/instituciones-aliadas/*` (new)
- `/app/angular.json`

## Sin lógica (tal como pidió el usuario)
- Search inputs en FAQ e Instituciones son decorativos (sin filtrado por texto)
- Los filtros por tipo en Instituciones SÍ funcionan en cliente (UI state only)
- Acordeón FAQ funciona en UI (sin persistencia)
- Todos los CTAs apuntan a URLs existentes (app.finky.la/registro, WhatsApp, etc.)

## Backlog / P1
- Implementar filtro por texto en los search inputs
- Agregar animaciones on-scroll (IntersectionObserver) para sections largas
- Agregar skeleton/lazy loading de logos de instituciones
- Links "Ver detalles" → páginas individuales de institución
- Integrar con API real para catálogo de instituciones/FAQs

## Backlog / P2
- SEO meta tags por página
- Open Graph images
- Internacionalización (en/es)
