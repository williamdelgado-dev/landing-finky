# Contexto del Proyecto: Landing IES — Migración a Angular

## Visión General

Este proyecto consiste en migrar **3 plantillas de landing pages estáticas** (HTML/CSS/JS) a una **aplicación Angular dinámica y unificada** que renderiza la plantilla correcta en base a una configuración centralizada (`ConfigService`).

El dominio del negocio es **Finky** — una fintech de financiación educativa — que construye landings personalizadas para cada institución educativa (IES) aliada, en co-branding con **B4M (Bridge For Mobility)**.

---

## Estructura del Repositorio

```
landing-ies/
├── uno/                   # Plantilla 1 original (HTML estático)
├── dos/                   # Plantilla 2 original (HTML estático)
├── tres/                  # Plantilla 3 original (HTML estático)
└── angular-app/           # App Angular — destino de la migración
    ├── src/
    │   ├── app/
    │   │   ├── app.ts              # Shell raíz — solo contiene <router-outlet>
    │   │   ├── app.routes.ts       # Rutas: / y /:slug
    │   │   ├── app.config.ts       # Providers: Router + HttpClient
    │   │   ├── pages/
    │   │   │   ├── under-construction/
    │   │   │   │   └── under-construction.component.ts  # Ruta /
    │   │   │   └── landing-page/
    │   │   │       └── landing-page.component.ts        # Ruta /:slug
    │   │   ├── components/
    │   │   │   ├── template-uno/   # Migración de /uno  ✅ validado
    │   │   │   │   ├── template-uno.ts
    │   │   │   │   ├── template-uno.html
    │   │   │   │   └── template-uno.css
    │   │   │   ├── template-dos/   # Migración de /dos
    │   │   │   │   ├── template-dos.ts
    │   │   │   │   ├── template-dos.html
    │   │   │   │   └── template-dos.css
    │   │   │   └── template-tres/  # Migración de /tres
    │   │   │       ├── template-tres.ts
    │   │   │       ├── template-tres.html
    │   │   │       └── template-tres.css
    │   │   └── services/
    │   │       ├── config.service.ts  # Servicio central de configuración
    │   │       └── config.ts          # (stub vacío, no usar)
    │   ├── assets/
    │   │   ├── images/            # Assets estáticos de las plantillas
    │   │   │   ├── icon_simulador.png
    │   │   │   ├── finker_1.png
    │   │   │   └── ...
    │   │   └── institutions.json  # ← Config de instituciones por slug
    │   ├── styles.css
    │   └── index.html
    ├── package.json
    ├── angular.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | ~21.2 | Framework principal |
| TypeScript | ~5.9 | Lenguaje |
| TailwindCSS | **3.4.x** | Utilidades CSS (disponible pero uso mínimo) |
| RxJS | ~7.8 | Reactividad (BehaviorSubject en ConfigService) |
| PostCSS / Autoprefixer | — | Build pipeline de estilos |

> **Importante — TailwindCSS v3:** El proyecto usa Tailwind **v3** (no v4). La v4 es incompatible con Angular CLI actual. Si se reinstala, usar `npm install -D tailwindcss@3`. El `styles.css` usa `@tailwind base/components/utilities`, NO `@import "tailwindcss"`.

> **Tailwind preflight desactivado:** `tailwind.config.js` tiene `corePlugins: { preflight: false }` para evitar que los resets de Tailwind sobreescriban los estilos portados de los originales.

---

## Arquitectura Angular

### Routing basado en URL (sistema de slug por institución)

El sistema de rutas determina qué institución/plantilla mostrar basándose en el **path de la URL**:

| Ruta | Componente | Resultado |
|---|---|---|
| `/` | `UnderConstructionComponent` | Página "En Construcción" |
| `/:slug` | `LandingPageComponent` | Carga config del slug desde `institutions.json` |

Ejemplos:
```
localhost:4200/       → Página en construcción
localhost:4200/uno    → Renderiza el Template 1 directamente (Pruebas)
localhost:4200/dos    → Renderiza el Template 2 directamente (Pruebas)
localhost:4200/tres   → Renderiza el Template 3 directamente (Pruebas)
localhost:4200/foo    → Slug no encontrado → Redirige a home (/)
```

### Flujo de carga por slug

```
URL /:slug
  └── LandingPageComponent.ngOnInit()
        ├── Lee slug del ActivatedRoute
        ├── GET /institutions.json  (HttpClient desde public/)
        ├── Busca institutions[slug.toLowerCase()]
        │     ├── Encontrado → configService._config.set(config) + applyColors()
        │     └── No encontrado → router.navigate(['/']) (redirige a home)
        └── Renderiza @switch(plantilla) → <app-template-X />
```

### Patrón de Renderizado Dinámico

El `AppComponent` (`app.ts`) es ahora solo un shell con `<router-outlet>`. El switch de plantillas vive en `LandingPageComponent`:

```typescript
// landing-page.component.ts
@switch (plantilla) {
  @case (1) { <app-template-uno /> }
  @case (2) { <app-template-dos /> }
  @case (3) { <app-template-tres /> }
}
```

### ConfigService (`src/app/features/landing/services/config.service.ts`)

Es el **único punto de verdad** de la aplicación. Se alimenta dinámicamente desde `public/institutions.json` via `HttpClient` en cada carga de ruta. No existe `DEFAULT_CONFIG` — si el slug no se encuentra, se redirige a `/`.

```typescript
// Flujo:
loadConfig(slug: string): Promise<boolean>
  → GET /institutions.json
  → _config.set(institutions[slug])
  → applyColors() → inyecta --color-oscuro y --color-claro en :root
```

> ⚡ **En caliente:** `public/institutions.json` se carga en runtime via HTTP. Editar el archivo y recargar la URL del slug aplica los cambios **sin recompilar**.

```typescript
export interface LandingConfig {
  plantilla: number;          // 1 | 2 | 3
  colores: {
    oscuro: string;           // Color primario institucional → --color-oscuro
    claro: string;            // Color secundario institucional → --color-claro
  };
  nombreUniversidad?: string; // Nombre corto (ej: "UCC", "Areandina") para textos de marketing
  idUniversidad?: string;     // ID único de la universidad (numérico o slug)
  banner: {
    pc: string;               // URL imagen desktop
    movil: string;            // URL imagen móvil
    titulo: string;           // Título principal del hero
    contenido: string;        // Subtítulo/Texto del hero
  };
  bullets: Array<{
    titulo: string;           // Etiqueta estadística (ej: "Pregrados", "Campus")
    desc: string;             // Valor estadístico (ej: "127", "215.640")
  }>;                         // Seccion de "Estadísticas de Impacto"
  oferta: string[];           // Lista de sedes u ofertas (Template 1)
}
```

### 🎨 Sistema de Branding Dinámico (Colores)

Los colores definidos en el JSON se inyectan en tiempo de ejecución en el `:root` como variables CSS globales:
- `--color-oscuro` → Color principal de la marca (Fondos clave, botones).
- `--color-claro` → Color secundario o de contraste (Textos oscuros, acentos, tarjetas).
- `--secondary-blue` y `--dark-bg` → Alias por retrocompatibilidad con clases antiguas.

Para garantizar la armonía en todos los perfiles de universidades, cada plantilla aplica estos colores a elementos específicos, manteniendo una regla estricta:

| Plantilla | Dónde se usa `--color-oscuro` | Dónde se usa `--color-claro` |
| :--- | :--- | :--- |
| **1 (Uno)** | **Fondo del banner principal** | Botón Simular, Título "Somos...", Cards Stats, Fondo Oferta Académica, Fondo del Simulador |
| **2 (Dos)** | Fondo Banner, Botón Simular, Título "Somos...", Divisores, Fondo Oferta, Fondo Simulador | Título Banner, Textos de Bullets, Títulos de Secciones, Fondo Tarjeta CTA, Borde de Cards, Etiquetas Nivel, Tabs Activas |
| **3 (Tres)** | Botón Simular, Título "Somos...", Divisores, Fondo Oferta, Fondo Simulador, Textos del Banner, Letras Bullets | **Fondo del Banner**, Títulos de Secciones, Fondo Tarjeta CTA, Borde de Cards, Etiquetas Nivel, Tabs Activas |

**Variables y Clases Globales Estandarizadas:**
- Las plantillas delegan sus fondos en el CSS dinámico (`background-color: var(--color-oscuro);`). Se limpiaron los `[style.background-color]` en línea para una arquitectura más limpia.
- Clases de texto como `.dark-blue-text` o `.finky-yellow-text` han sido desplazadas por `color: var(...)` nativo para lograr adaptación dinámica.

---

## Estándares de Diseño y Contenido

### 1. Sección Alianza Finky (Estandarizada) ✅
Todas las plantillas deben usar el copy oficial de Finky:
- **Título:** "Finky en alianza con [nombreUniversidad] te permite financiar tu semestre en cuotas mensuales"
- **Beneficios (Fijos):** Aprobación en 4 min, Sin codeudor, Sin historial, Proceso 100% digital, Inclusión financiera.
- **Footer:** "Para continuar con tu proceso de matrícula y enfocarte en lo más importante: estudiar."

### 2. Estadísticas Institucionales
Los `bullets` del JSON ya no son beneficios de Finky, sino **datos de la IES**. Se renderizan en una cuadrícula de tarjetas (`stat-card`) con el color `--color-oscuro`.

### 3. Layout de Botón Flotante
Para evitar superposición de contenido, los botones CTA de los banners no usan `position: absolute`. Se usa un contenedor con `z-index` y márgenes negativos (ej: `margin-bottom: -30px`) para dar el efecto de "flotar" sobre la siguiente sección sin romper el flujo del DOM.

---

## Las 3 Plantillas: Estado de Migración

### Plantilla 1 — `template-uno` ✅ Validada
- Estilo Areandina/B4M original.
- Stats dinámicos desde JSON.
- Alianza Finky actualizada.

### Plantilla 2 — `template-dos` ✅ Validada y Refactorizada (Premium)
- **Hero:** Refactorizado para evitar solapamiento de texto.
- **Oferta Académica Premium:** Nuevo sistema de Grid con tarjetas interactivas e iconos de duración/costo.
- **Filtrado:** Pestañas dinámicas (Angular Signals) para navegar entre niveles (Pregrado, Posgrado, etc.).
- **Banner CTA Amarillo:** Bloque especial para incentivar la simulación sin carrera definida.

### Plantilla 3 — `template-tres` 🔄 En proceso
- Estilo Ibéro/B4M.
- Requiere portar el diseño de oferta académica premium de la Template 2 en el futuro.

---

## Golden Rules Actualizadas

| Regla | Descripción |
|---|---|
| 1 | Banner desktop 1920×600px / móvil 768×400px |
| 2 | Logo requiere fondo blanco (o PNG transparente de alta calidad) |
| 3 | Título y contenido del hero se truncan para evitar desbordes |
| 4 | **Stats:** Los bullets deben representar cifras institucionales (No más de 6-8 recomendados) |
| 5 | Select de oferta o Cards de programas → scroll suave al simulador |
| 6 | **Co-Branding:** El nombre institucional se toma de `nombreUniversidad` para fluidez en copys |
| 7 | **Simulador:** El `idUniversidad` es obligatorio para que el iframe de Finky cargue la configuración correcta de la IES |

---

## Patrones de Código Angular Establecidos

### Componente de Plantilla (patrón a seguir)

```typescript
@Component({
  selector: 'app-template-X',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-X.html',
  styleUrl: './template-X.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-X-host' }   // ← necesario para CSS scoping
})
export class TemplateX {
  private configService = inject(ConfigService);
  public config = this.configService.config;  // ← Signal readonly directo

  public validatedBanner = computed(() => {
    const banner = this.config()?.banner;
    if (!banner) return null;
    return { ...banner, titulo: this.truncate(banner.titulo, 100), contenido: this.truncate(banner.contenido, 100) };
  });

  public validatedBullets = computed(() => {
    return (this.config()?.bullets || []).slice(0, 10);
  });

  private truncate(text: string, limit: number) { return text?.length > limit ? text.slice(0, limit) + '…' : text || ''; }
  public scrollToSimulador() { document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' }); }
}
```

> **Patrón actual (Angular Signals):** Los componentes `template-dos` usan `configService.config` como Signal readonly. No hay `Subscription` ni `ngOnDestroy` — la reactividad es automática.

### Template HTML Angular

- Usar `@if`, `@for`, `@switch / @case` (Angular 17+ control flow)
- Bindings de imagen: `[src]="config()?.banner?.pc"`
- Estilos dinámicos: `[style.backgroundImage]="'url(' + validatedBanner()?.pc + ')'"`
- Proteger con `*ngIf="config()"` o `@if (config())` en la etiqueta `<main>`

---

## Assets e Imágenes

```
angular-app/src/assets/images/
├── icon_simulador.png          ← Ícono del botón CTA (mano + dólar)
├── finker_1.png                ← Imagen sección alianza (template-uno)
├── ucc_campus_bg_*.png         ← Fondo del hero (template-uno)
├── chatear.png
└── ucc-logo-*.svg
```

Rutas en templates: `/assets/images/nombre.png` (absolutas desde raíz).

Logo Finky desde CDN:
```
https://finky.la/wp-content/uploads/2025/11/Diseno_sin_titulo__2___1_-removebg-preview-e1769455260406.png
```

Fuentes (en `src/index.html`):
```
Inter, Archivo Narrow, Bebas Neue — vía Google Fonts
```

---

## institutions.json — Configuración por Institución

Ubicado en `src/assets/institutions.json`. Es el **único archivo que hay que editar** para agregar o modificar una institución. No requiere tocar código ni recompilar.

```json
{
  "areandina": {
    "plantilla": 1,
    "colores": { "oscuro": "#00ACCA", "claro": "#FFFFFF" },
    "banner": {
      "pc": "/assets/images/campus.png",
      "movil": "",
      "titulo": "Título del banner (máx 100 chars)",
      "contenido": "Subtítulo del banner (máx 100 chars)"
    },
    "idUniversidad": "1",
    "bullets": [
      { "titulo": "Dos Palabras", "desc": "Máx 20 chars" }
    ],
    "oferta": ["Pregrado", "Posgrado"]
  },
  "otra-ies": {
    "plantilla": 2,
    ...
  }
}
```

**Reglas del JSON:**
- La clave es el slug de la URL (case-insensitive, se normaliza con `.toLowerCase()`)
- `plantilla` debe ser `1`, `2` o `3`
- `colores.oscuro` es el color primario configurable de toda la UI
- `bullets[].titulo` debe tener **exactamente 2 palabras** (Golden Rule #4)
- `bullets[].desc` máx **20 caracteres**
- Si el slug no existe en el JSON → se usa Template 2 con contenido genérico como fallback

---

## Cómo Agregar una Nueva Institución

1. Editar `src/assets/institutions.json`
2. Agregar una nueva entrada con el slug deseado
3. Guardar — el cambio aplica en caliente (no requiere recompilar)

```bash
# Para acceder:
localhost:4200/nombre-del-slug
```

---

## Cómo Cambiar la Plantilla o los Colores

Editar `public/institutions.json` directamente — es el único lugar a tocar:

```json
"mi-ies": {
  "plantilla": 2,
  "colores": {
    "oscuro": "#003151",   ← Color de fondo de secciones y tarjetas
    "claro": "#FFFFFF"
  }
}
```

Los colores se aplican instantáneamente al `:root` sin recompilar. Las secciones con `[style.background-color]="config()?.colores?.oscuro"` en el HTML también se actualizan automáticamente al recargar la URL del slug.

> ❌ **No existe `DEFAULT_CONFIG`** en el codebase actual. Todo viene del JSON.

---

## Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo (http://localhost:4200)
cd angular-app
ng serve

# Build de producción
ng build
```

---

## Pendientes / Notas de Migración

- [x] `services/config.ts` fue eliminado (era un stub vacío)
- [x] `app.html` fue limpiado (era código legacy)
- [x] La lógica del modal "Lina te llama" (`openModal()`, `closeModal()`) fue migrada al componente `FloatingWidgetComponent`
- [x] El widget flotante de WhatsApp + Lina fue migrado a un componente reutilizable `FloatingWidgetComponent`
- [ ] La plantilla 3 tiene programas con contenido fijo (Pack A2, B1, B2) — en el futuro debería ser parte de la config dinámica
- [ ] TailwindCSS disponible pero con uso mínimo — los estilos principales vienen del CSS portado de los originales
- [ ] Los CSS de template-dos y template-tres aún no han sido completamente validados visualmente contra sus originales (solo template-uno está validado)

---

## Convenciones de Estructura de Archivos

### Dónde va cada cosa

| Tipo de archivo | Carpeta | Ruta pública |
|---|---|---|
| Imágenes y recursos estáticos | `public/assets/images/` | `/assets/images/nombre.png` |
| Configuración de instituciones | `public/institutions.json` | `/institutions.json` |
| Favicon | `public/favicon.ico` | `/favicon.ico` |
| Estilos globales | `src/styles.css` | (compilado) |
| Componentes de página (rutas) | `src/app/pages/` | — |
| Componentes de plantilla | `src/app/components/` | — |
| Servicios | `src/app/services/` | — |

> **Regla de oro:** Todo lo que necesite ser accesible públicamente por URL va en `public/`. El código Angular va en `src/app/`.

### ¿Por qué `public/` y no `src/assets/`?

Este proyecto fue generado con Angular CLI moderno (v17+) que adoptó la carpeta `public/` como estándar (similar a Next.js y Vite). En `angular.json`, la única entrada de assets es:

```json
"assets": [{ "glob": "**/*", "input": "public" }]
```

Esto significa:
- `public/assets/images/logo.png` → disponible en `/assets/images/logo.png`
- `public/institutions.json` → disponible en `/institutions.json`
- **`src/assets/` no existe en este proyecto** (fue eliminada, era un residuo)

### Cómo agregar una imagen nueva

1. Colocar el archivo en `public/assets/images/`
2. Referenciarla en el template con ruta absoluta: `/assets/images/mi-imagen.png`
3. No requiere reiniciar `ng serve` — los archivos en `public/` se sirven en caliente

### Cómo agregar una nueva institución

1. Editar `public/institutions.json`
2. Agregar la entrada con el slug deseado
3. No requiere recompilar — el JSON se carga en runtime via `HttpClient`

### Convenciones de nombrado

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes de página | `kebab-case.component.ts` | `landing-page.component.ts` |
| Componentes de plantilla | `template-N.ts` | `template-uno.ts` |
| Imágenes | `kebab-case` descriptivo | `ucc_campus_bg.png` |
| Slugs de instituciones | `kebab-case` en minúsculas | `areandina`, `ucc`, `u-sabana` |
| Host classes CSS | `template-N-host` | `template-uno-host` |

### Lo que NO hacer

- ❌ **No poner imágenes en `src/`** — Angular no las sirve desde ahí
- ❌ **No crear `src/assets/`** — no está configurado en `angular.json`
- ❌ **No hardcodear colores en CSS** — usar `var(--color-oscuro)` y `var(--color-claro)`
- ❌ **No escribir CSS sin el prefijo del host** — usar `.template-uno-host .clase {}` siempre
- ❌ **No editar `DEFAULT_CONFIG` para cambiar de IES** — usar `public/institutions.json`
- ❌ **No olvidar `encapsulation: ViewEncapsulation.None` + `host: { class: 'template-X-host' }` en cada componente de plantilla**

