# Prompt estricto para actualizar paneles Witmind

Usa este prompt antes de cualquier migración o rediseño de un panel de Home Assistant:

> Implementa el panel solicitado respetando exactamente el lenguaje visual y de interacción del panel Showroom vigente. No inventes un dashboard paralelo ni entregues una sola vista genérica. Antes de editar, audita el componente de referencia y enumera sus vistas, navegación, estados, temas, entidades, acciones y comportamiento responsive. Después crea una matriz de aceptación y no cierres el trabajo hasta verificar cada fila.
>
> La matriz mínima obligatoria es: (1) entrada desde el menú de Home Assistant; (2) ruta y alias correctos; (3) carga sin pantalla en blanco; (4) tema oscuro; (5) tema claro; (6) header, menú hamburguesa y navegación; (7) todas las vistas solicitadas; (8) cada entidad real conectada; (9) estados on/off/unavailable/pending/error; (10) datos ambientales disponibles; (11) energía con carga inicial, actualización y error visible; (12) acciones sin refrescar toda la página; (13) responsive y desplazamiento; (14) consola sin errores; (15) release inmutable, backup y promoción; (16) validación final en navegador y en Home Assistant.
>
> Si una vista no tiene entidades reales, muéstrala estática, pero conserva la vista y su navegación. Si el usuario excluye escenas, no las inventes. Si existe una entidad de temperatura/humedad por zona, intégrala en esa zona. Antes de publicar, prueba explícitamente cada botón y cada pestaña; compara visualmente con Showroom y corrige cualquier diferencia evidente. Entrega únicamente cuando todas las filas estén comprobadas o documenta claramente el bloqueo restante.

## Aplicación actual

- General: Iluminación, Energía y Sistema; sin escenas.
- Oficinas: circuitos por zona y ambiente de Gerencia cuando las entidades están disponibles.
- Showroom: Inicio, Iluminación, Energía y Sistema.
- Cada release debe ser versionada, respaldada y promovida en `www/witmind-ui/current.json`.
