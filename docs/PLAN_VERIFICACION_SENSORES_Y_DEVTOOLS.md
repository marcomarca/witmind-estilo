# PLAN — SISTEMA DE TELEMETRÍA POR TERMINAL Y DEBUGGING CON CHROME DEVTOOLS (CLOSED LOOP)

> **Objetivo:** Cerrar el lazo de retroalimentación en tiempo real para no trabajar a ciegas, dotando al entorno de:
> 1. Un comando por terminal (`npm run ha:sensors` / `tools/inspect-ha-sensors.mjs`) que consulte y reporte el estado real, potencias, temperaturas y disponibilidad de las entidades del edificio.
> 2. Una sesión de debugging e inspección profunda vía **Chrome DevTools (CDP)** sobre la pestaña real (`http://192.168.20.232:8123/witmind-general`) para auditar la consola, errores, eventos WebSocket, Shadow DOM y elementos faltantes frente al [PLAN_MAESTRO_CONTROL_EDIFICIO_BMS.md](file:///c:/dev/automatizacion-estilo/docs/PLAN_MAESTRO_CONTROL_EDIFICIO_BMS.md).

---

## 1. Contexto y Problema Actual
- Hasta ahora, las pruebas unitarias validan modelos lógicos y el build empaqueta los assets, pero no existía una herramienta CLI directa que imprima la telemetría viva de Home Assistant en la consola.
- Para verificar el renderizado real de `witmind-general`, dependíamos de capturas aisladas en lugar de inspeccionar el árbol del DOM, los mensajes de error del WebView y el intercambio de `postMessage` entre el bridge (`witmind-ui-panel.js`) y la aplicación dentro del iframe.

---

## 2. Componente 1: Comando de Terminal para Estado de Sensores (`tools/inspect-ha-sensors.mjs`)

### Funcionalidad:
Crear una herramienta ejecutable con un comando simple:
```bash
npm run ha:sensors
```
o:
```bash
node tools/inspect-ha-sensors.mjs [--floor ground|upper] [--json]
```

### Qué evaluará el comando:
1. **Entidades Clave del BMS**:
   - Clima exterior: `weather.forecast_casa`
   - Medidores de potencia general y zonas: `sensor.showroom_potencia_activa`, `sensor.sensor_de_potencia_showroom_p`
   - Climatización y confort: `sensor.t_h_sensor_temperature`, `sensor.t_h_sensor_humidity`, `sensor.t_h_sensor_2_temperature`, `sensor.t_h_sensor_2_humidity`
   - Todos los circuitos de Planta Baja y Planta Alta (`switch.*`, `light.*`).
2. **Salida Formateada en Consola**:
   - Tabla clara con: `Zona`, `Entidad`, `Estado Actual`, `Valor / Unidad`, `Diagnóstico` (OK, Indisponible, Nominal, Falta Mapear).
   - Resumen de potencia total medida vs potencia nominal.
   - Indicador de estado del puente y de Home Assistant.

---

## 3. Componente 2: Inspección y Debugging con Chrome DevTools (CDP)

### Metodología:
Usar el protocolo Chrome DevTools / Playwright CDP para interactuar directamente con la pestaña de `http://192.168.20.232:8123/witmind-general`.

### Puntos de Auditoría:
1. **Inspección de Consola y Red**:
   - Capturar todos los mensajes `console.error`, `console.warn`, `console.log`.
   - Verificar si existen peticiones 404 de assets, fuentes, imágenes o llamadas fallidas a servicios.
2. **Auditoría del Shadow DOM y el Bridge**:
   - Inspeccionar el elemento `<witmind-ui-panel>` y su iframe interno.
   - Auditar el objeto `window.__hass` o `document.querySelector("home-assistant").hass` para contrastar los estados en memoria con lo mostrado en pantalla.
3. **Auditoría de Overlays y Geometría en Pantalla**:
   - Medir los rectángulos de colisión calculados (`getBoundingClientRect()`) de `.floor-stage`, `.floor-viewport` y cada `.zone-overlay`.
   - Confirmar si en la resolución actual del navegador existe superposición, corte o desajuste con los rótulos arquitectónicos.
4. **Detección de Brechas frente al Plan Maestro**:
   - Comparar los 29 puntos del `PLAN_MAESTRO_CONTROL_EDIFICIO_BMS.md` frente al árbol renderizado actual:
     - Gráficos históricos de potencia.
     - Lista de alarmas y eventos.
     - Controles rápidos (toggle maestro y perfiles operativos).
     - Comportamiento de swipe entre plantas.

---

## 4. Plan de Ejecución Paso a Paso

1. **Fase 1: Implementar Script de Telemetría por Terminal**:
   - Crear [`tools/inspect-ha-sensors.mjs`](file:///c:/dev/automatizacion-estilo/tools/inspect-ha-sensors.mjs).
   - Añadir script `"ha:sensors": "node tools/inspect-ha-sensors.mjs"` a [`package.json`](file:///c:/dev/automatizacion-estilo/package.json).
2. **Fase 2: Ejecutar Sesión de Debugging Chrome DevTools**:
   - Lanzar script automatizado con CDP / Playwright para conectarse o abrir `http://192.168.20.232:8123/witmind-general`.
   - Extraer logs de consola, estados de entities en vivo y métricas del DOM.
   - Generar informe de hallazgos y elementos faltantes.
3. **Fase 3: Cierre del Lazo y Correcciones**:
   - Presentar los datos vivos obtenidos al usuario.
   - Resolver los elementos pendientes identificados durante la sesión de DevTools.
