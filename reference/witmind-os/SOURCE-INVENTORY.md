# Witmind OS — Source Inventory & Provenance

Este inventario documenta la procedencia exacta de cada archivo incluido en la **Golden Reference** exportada desde el proyecto original (`C:\dev\automatizacionv1`).

| Archivo Exportado | Archivo Original en Origen | Rol / Propósito |
| :--- | :--- | :--- |
| `dark.html` | `showroom-witmind-os.html` | Entrypoint limpio para la vista Dark sin barras de depuración. |
| `light.html` | `showroom-witmind-os-light.html` | Entrypoint limpio para la vista Light (`theme="light"`). |
| `assets/witmind-os.js` | `mock/showroom-witmind-os.js` | Implementación real completa del Custom Element `<showroom-witmind-os>` (2339 líneas, Shadow DOM, tokens, CSS, templates SVG e interactividad). |
| `mock/mock-hass.js` | `mock/mock-hass.js` | Proveedor reactivo de Home Assistant (estados, servicios, suscripciones, estadísticas y eventos). |
| `assets/reference.css` | Generado a partir de estilos globales | Reseteo CSS, configuración tabular y carga de fuentes locales. |
| `assets/fonts/manrope-*.woff2` | `node_modules/@fontsource-variable/manrope/files/` | Tipografía Variable Manrope servida 100% localmente sin internet. |
| `manifest.json` | Generado por script | Descriptor de metadatos de la Golden Reference. |
| `REFERENCE.md` | Generado por script | Documentación de diseño, uso e instrucciones para la IA de Signature. |
| `screenshots/*.png` | Generados vía Playwright Chromium | Capturas Golden estabilizadas en resoluciones 1366x768, 1440x900 y 1920x1080. |
