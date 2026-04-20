# Contexto del Proyecto: Landing IES

## ¿Qué es el proyecto?
Es una plataforma dinámica de **Landing Pages** para **Finky** (Fintech de educación). Su propósito es proporcionar una interfaz personalizada ("White-label") para cada Institución de Educación Superior (IES) aliada, permitiendo a los estudiantes simular sus créditos y solicitar contacto comercial.

## ¿Qué hace?
1.  **Identificación Dinámica**: Detecta el aliado educativo a través del subdominio (ej: `ucc.finky.la`) o un slug en la URL.
2.  **Personalización Automática**: Carga la configuración específica de la universidad (logos, colores institucionales, banners y oferta académica).
3.  **Simulación de Créditos**: Integra un simulador financiero de Finky mediante iframes configurados dinámicamente.
4.  **Generación de Leads**: Centraliza las solicitudes de contacto a través del servicio "Lina" (modal de llamada automática) y accesos directos a WhatsApp.

## Stack Tecnológico & Arquitectura
*   **Kernel**: [Angular 21](https://angular.dev/) utilizando **Standalone Components**.
*   **Arquitectura**: "Screaming Architecture" orientada a dominios (`site` para el portal principal, `institutional` para las landings white-label).
*   **Control Flow**: Uso obligatorio de la sintaxis `@if`, `@for`, `@switch`.
*   **Reactividad**: [Angular Signals](https://angular.dev/guide/signals) para la gestión del estado global.

## Sistema de Diseño (Premium Edition)
Para mantener la coherencia visual "Premium", todos los componentes deben seguir estos lineamientos:
*   **Tipografía**: 
    *   `Outfit`: Para títulos y elementos de visualización (Display).
    *   `Plus Jakarta Sans`: Para textos de cuerpo y lectura.
*   **Colores Core**: 
    *   `#f16c2d` (Finky Orange): Acentos y acciones primarias.
    *   `#0f172a` (Deep Navy): Color base para fondos oscuros y contrastes.
    *   `#3e2a7e` (Secondary Purple): Color de soporte para elementos institucionales.
*   **Patrones Visuales**:
    *   **Glassmorphism**: Uso de `backdrop-filter: blur(20px)` y bordes translúcidos.
    *   **Animaciones**: Revelaciones escalonadas (`reveal`) con delays de 100ms-400ms.
    *   **Sombras**: Estilo "Premium Shadow" (suaves, profundas y con baja opacidad).

## Organización de Carpetas
*   `src/app/features/site`: Portal principal (Que es Finky, Home Portal).
*   `src/app/features/institutional`: Landings personalizadas para cada IES.
*   `src/app/shared`: Componentes compartidos (Header, Footer, Simulador).
