# Auditoría de paneles Witmind — 2026-09-18

## Comprobado

- General carga desde su entrada y arranca en Iluminación.
- General expone únicamente Iluminación, Energía y Sistema; no muestra escenas.
- General reutiliza la lógica de energía y sistema de Showroom.
- Oficinas muestra los siete circuitos reales y potencia nominal.
- Gerencia muestra temperatura y humedad con `sensor.t_h_sensor_temperature` y `sensor.t_h_sensor_humidity`.
- Oficinas grandes conserva sus sensores ambientales.
- Tema claro/oscuro, header, tarjetas e interruptores usan el contrato visual de Showroom.
- Build, TypeScript, tests y bridge pasan.
- Release estable publicada: `0.4.8`.

## Comportamiento intencional

El enlace lateral de Home Assistant permanece en el panel de entrada mientras el usuario desliza entre páginas. El dock inferior indica la página visible. Por eso, si se entra por Lobby y se desliza hasta Oficinas, el menú puede seguir resaltando Lobby aunque el contenido sea Oficinas.

## Pendiente opcional

Si se desea que el resaltado lateral cambie con cada deslizamiento, habrá que sincronizar la URL de Home Assistant con `witmind-panel-change`. Eso cambiaría el contrato actual de navegación fusionada y debe decidirse antes de implementarlo.
