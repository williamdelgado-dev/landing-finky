# PRD · Landing Finky — Template 3 Redesign

## Problema original
El usuario tiene 2 templates de landing ya diseñados:
- **Template 1**: Minimalismo Premium / Pantalla Completa (glassmorphism, hero full-screen, bento grid, listas horizontales).
- **Template 2**: Hero Dividido + Minimalismo Estructurado (split corporativo, cards verticales blancas 3x3).

El **Template 3** (https://b4mlatam.finky.la, repo: github.com/williamdelgado-dev/landing-finky, ruta `src/app/features/institutional/components/template-tres`) debía ser **rediseñado** para diferenciarse, con estas restricciones del usuario:
- Mantener el **header**, **simulador** (iframe) y **footer** intactos.
- Conservar la **distribución del hero** (texto-izquierda / imagen-derecha).
- Conservar la **tipografía** existente (`Outfit` display + `Plus Jakarta Sans` body).
- Mantener paleta dinámica navy (`--color-oscuro`) + naranja (`--color-claro`).
- Estilo: **minimalismo refinado**.

## Stack
- **Angular 21** standalone components
- **TypeScript** + signals + computed
- **AOS** para animaciones on-scroll
- **TailwindCSS** + CSS por componente
- API externa Finky en `api-production.finky.la`

## Tareas completadas (29 abril 2026)

### Rediseño Template 3 — Minimalismo refinado
**Files modificados:**
- `src/app/features/institutional/components/template-tres/template-tres.html` (rewrite)
- `src/app/features/institutional/components/template-tres/template-tres.css` (rewrite)
- `template-tres.ts` **sin cambios** (lógica preservada)

**Diferenciadores aplicados vs Templates 1 y 2:**

| Sección | Template 1 | Template 2 | **Template 3 (nuevo)** |
|---|---|---|---|
| Estilo global | Glass + immersivo | Corporate split | **Minimal editorial** |
| Hero | Full-screen + chips | Split + bullets check | Split limpio + stats hairline + bloque acento offset detrás de la imagen |
| "Por qué Finky" | 2-col párrafo | Centrado bloque | **4-col grid hairline + numeración 01-04** |
| Oferta tabs | Chips translúcidos | Tabs subrayados clásicos | **Tabs subrayados con scale animado** |
| Programas | Filas horizontales | Cards verticales 3-col | **Grid 2-col, divisor 1px hairline, índice monospace `N° 001`, hover con border-left acento scaleY** |
| CTA intermedio | Yellow box llamativo | – | **Notice slim con border-left acento** |

**Detalles de minimalismo:**
- Bordes 1px hairline, paddings 96–120px
- Eyebrow editorial con barritas acento
- Patrón sutil de líneas verticales en navy
- Hover restrained
- Index de programas en `Courier New`

**Preservado intacto:**
- `<app-header>`, `<app-alliance-section>`, sección `#simulador` (iframe), `<app-footer>`

### Validación
- ✅ `ng build --configuration=development` compila sin errores
- ✅ Servido en `http://localhost:4200/b4mlatam` y testeado visualmente
- ✅ Animaciones AOS funcionando con stagger
- ✅ Responsive 1024 / 768 / 540 px
- ✅ Data-testids en todos los elementos interactivos

## Backlog / Mejoras futuras
- **P2**: Marquee horizontal entre secciones ("Aprobado · 4 min · 100% digital ·")
- **P2**: Lazy-load de imagen hero
- **P3**: Ajuste responsive del bloque acento `.t3-hero__corner` en pantallas muy pequeñas
- **P3**: Variante dark mode para "Por qué Finky" si la institución tiene paleta clara
