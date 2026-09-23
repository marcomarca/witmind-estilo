# ADR: Navegación Unificada WITMIND en Home Assistant

## Declaración de Arquitectura de Navegación

> **Regla de oro:**
> - **Home Assistant = navegación global entre paneles:** La barra lateral de Home Assistant (fuera del iframe de WITMIND) es la única y absoluta autoridad para cambiar entre vistas (`Control de Edificio`, `Lobby`, `Oficinas`, `Showroom`, etc.).
> - **WITMIND building = navegación interna de cinco anclas:** La vista del plano no posee sidebar vertical propia. Utiliza exclusivamente una tira horizontal pegajosa (`nav.section-nav`) con 5 botones (`Plano`, `Circuitos`, `Ambiente`, `Alarmas`, `Consumo`) que realizan scroll suave a las tarjetas de la misma página.
> - **Workspace en modo `host` desactiva el carrusel global:** Cuando la aplicación se inicializa mediante el protocolo `WITMIND_INIT` emitido por el bridge de Home Assistant, `witmind-workspace` opera en `navigationMode: "host"`, montando únicamente el panel solicitado, ocultando la barra dock de puntos y desactivando por completo los gestos de swipe entre paneles.
> - **Modo autónomo `carousel` preservado:** Cuando la aplicación se ejecuta de forma independiente (`window.parent === window`), opera en `navigationMode: "carousel"` preservando la experiencia de carrusel para pruebas y laboratorio.

## Contexto y Decisión

En versiones anteriores a la `0.7.0`, `witmind-building-panel` incluía un `<aside class="sidebar">` de 200px con su propia navegación de 8 botones. Esto provocaba una doble barra lateral visible junto al menú de Home Assistant y reducía el espacio disponible para visualizar el plano arquitectónico interactivo. Asimismo, al arrastrar la pantalla horizontalmente en dispositivos móviles o desktop, el workspace cambiaba de vista a otro panel, perdiendo la sincronización con la URL de Home Assistant.

A partir de la versión `0.7.0`:
1. Se elimina la barra lateral interna de `witmind-building-panel`, ganando el 100% del ancho útil para el plano, circuitos y tarjetas de supervisión.
2. Se introducen 5 accesos horizontales sticky con destinos únicos en el DOM.
3. Se implementa `navigationMode: host` en `witmind-workspace` y `witmind-app`.
