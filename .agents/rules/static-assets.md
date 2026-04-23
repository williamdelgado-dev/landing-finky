# Regla: Archivos Estáticos y Assets

## Ubicación de Assets
Todos los archivos estáticos (imágenes, íconos, fuentes, etc.) se encuentran en la carpeta `public/` en la raíz del proyecto.

```
public/
├── favicon.ico
└── assets/
    └── images/          ← Imágenes del proyecto
        ├── lina/        ← Avatares del chatbot
        ├── testimonials/← Fotos de testimonios
        └── universities/← Logos de universidades
```

## Reglas Obligatorias

1.  **Nunca uses `src/assets/`**. En Angular 17+, los assets estáticos viven en `public/`. La carpeta `src/assets/` NO existe en este proyecto.
2.  **Referencia en código**: Al referenciar un asset en templates HTML o CSS, usa rutas absolutas desde la raíz del servidor:
    ```html
    <!-- ✅ Correcto -->
    <img src="/assets/images/finkylogo.jpg" />

    <!-- ❌ Incorrecto -->
    <img src="../../assets/images/finkylogo.jpg" />
    <img src="src/assets/images/finkylogo.jpg" />
    ```
3.  **Al generar o guardar imágenes nuevas**, siempre colocarlas en `public/assets/images/` (o una subcarpeta apropiada), nunca en `src/`, `tmp/`, ni en el escritorio.
4.  **Imágenes dinámicas de IES (banners, logos)**: Estas se cargan desde URLs remotas (AWS S3) a través de la API. No se almacenan localmente como assets estáticos excepto para pruebas.

## Medidas Recomendadas para Assets de IES

### Banner Institucional (banner.pc)
Las dimensiones varían por plantilla. La imagen se carga desde la API, no desde `public/`:

| Plantilla   | Dimensión Ideal       | Aspect Ratio |
|-------------|-----------------------|--------------|
| Template 1  | **1920 × 700 px**     | ~2.74:1      |
| Template 2  | **1920 × 1080 px**    | 16:9         |
| Template 3  | **1160 × 860 px**     | ~4:3         |

### Banner Móvil (banner.movil)
- **640 × 1120 px** (9:16 vertical)

### Logo/Ícono Institucional (iconUniversity)
- **Horizontal**: 1024 × 256 px (PNG transparente o SVG)
- **Cuadrado**: 512 × 512 px (PNG transparente o SVG)
- Se renderiza a 45px de alto en desktop y 32px en móvil.

## Formatos Preferidos
- **Logos**: SVG (prioridad) o PNG con fondo transparente.
- **Banners/Fotos**: WebP (prioridad) o JPG optimizado. Evitar PNG para fotos (peso excesivo).
- **Íconos UI**: Material Icons (ya integrado) o SVG inline.
