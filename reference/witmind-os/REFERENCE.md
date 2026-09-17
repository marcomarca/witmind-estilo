# Witmind OS — Golden Reference

Esta carpeta contiene la implementación ejecutable completa e independiente de la vista **Witmind OS** que fue aprobada visual y funcionalmente antes de iniciar Witmind Signature.

---

## 🎯 Propósito

Esta carpeta **NO** es la arquitectura objetivo del nuevo proyecto.

Es la **referencia visual y funcional Golden** que debe usarse para estudiar:
- **Tipografía y jerarquía:** Tipografía única `Manrope` con cifras tabulares (`tnum`).
- **Proporciones y espaciado:** Escala estricta de 4px/8px, alturas consistentes, densidades calibradas para pantallas de 1366x768 y 1440x900.
- **Radios de curvatura:** `14px` (elementos internos/botones), `22px` (tarjetas), `28px` (dock/superficies principales).
- **Tratamiento de superficies y materiales:** Arquitectura de 3 capas (Canvas Nivel 0 -> Contenido Nivel 1 -> Flotantes/Sheets Nivel 2) con glassmorphism sutil y bordes semitransparentes.
- **Disciplina del color de acento:** Naranja Witmind (`#f26522`) reservado exclusivamente para luz activa, acentos y estados primarios (5-8% de la superficie visual).
- **Semántica Dark / Light:** Mismo componente Web con alternancia de tokens cromáticos (`dark` #071118 vs `light/porcelain` #f3f3ef).
- **Interacciones:** Sheets de control granular, toggles de iluminación reactiva, control de medios, telemetría energética con gauge radial y gráfica de consumo por horas.

---

## 🚀 Cómo Ejecutar la Referencia

La referencia es 100% autónoma y no requiere compilación previa. Puede servirse con cualquier servidor estático desde esta misma carpeta:

```bash
# Con npx serve
npx serve .

# O con Python
python -m http.server 8080

# O con bun
bun x serve .
```

Una vez iniciado el servidor, abre:
- **Modo Oscuro:** `http://localhost:8080/dark.html`
- **Modo Claro:** `http://localhost:8080/light.html`

---

## 📂 Estructura de Archivos

```text
reference/witmind-os/
├── dark.html                  # Entrypoint autónomo para Witmind OS Oscuro
├── light.html                 # Entrypoint autónomo para Witmind OS Claro
├── manifest.json              # Metadatos de la referencia
├── REFERENCE.md               # Este documento
├── SOURCE-INVENTORY.md        # Inventario de origen de cada archivo
│
├── assets/
│   ├── witmind-os.js          # Implementación REAL del Web Component <showroom-witmind-os>
│   ├── reference.css          # Estilos de base y @font-face locales de Manrope
│   ├── fonts/                 # Archivos WOFF2 de Manrope (cero dependencias de Google Fonts)
│   │   ├── manrope-latin-wght-normal.woff2
│   │   └── manrope-latin-ext-wght-normal.woff2
│   └── images/                # Recursos gráficos locales
│
├── mock/
│   └── mock-hass.js           # Proveedor reactivo que simula Home Assistant
│
└── screenshots/               # Capturas Golden verificadas
    ├── dark-1366x768.png
    ├── light-1366x768.png
    ├── dark-1440x900.png
    ├── light-1440x900.png
    ├── dark-1920x1080.png
    └── light-1920x1080.png
```

---

## ⚠️ Instrucciones Críticas para el Modelo de IA (Witmind Signature)

> [!IMPORTANT]
> **NO diseñes a ciegas ni asumas estilos a partir de descripciones parciales.**
> 1. Abre y ejecuta `dark.html` y `light.html`.
> 2. Examina la implementación en `assets/witmind-os.js` para comprender exactamente cómo se construyeron los widgets, sombras, estados activos y densidades.
> 3. Revisa los screenshots en `screenshots/` para comprobar el balance visual exacto aceptado por el usuario.
> 4. Al crear la nueva arquitectura de componentes en Witmind Signature, preserva la fidelidad visual, carácter tipográfico y proporciones exactas de esta referencia.
