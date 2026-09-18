# PLAN MAESTRO DEFINITIVO — WITMIND CONTROL DE EDIFICIO (BMS)

> **Documento normativo para la IA implementadora**
>
> Este archivo define la arquitectura visual, funcional y de datos de la nueva vista **WITMIND — Control de Edificio**.
>
> La **fuente máxima de verdad es la imagen de referencia BMS/Witmind proporcionada por el usuario**.
>
> Los planos arquitectónicos reales proporcionados determinan la distribución física del edificio.
>
> Home Assistant y el proyecto actual determinan los datos y acciones reales disponibles.
>
> Si una decisión previa, un documento antiguo, una suposición de implementación o un componente heredado entra en conflicto con este plan, **debe prevalecer este plan**.
>
> El antiguo port de **Witmind Smart Metering** queda completamente fuera de alcance para esta tarea y no debe condicionar el diseño.

---

# 0. PRINCIPIO RECTOR

La implementación debe seguir esta regla:

> **La imagen BMS define cómo debe verse y organizarse la pantalla.  
> Los planos reales definen la arquitectura física.  
> Home Assistant define los datos reales.  
> No se debe inventar ninguna de esas tres capas.**

Cuando exista una duda:

```text
¿cómo debe verse?
→ consultar la imagen BMS

¿dónde está una habitación?
→ consultar los planos reales

¿qué valor debe mostrarse?
→ consultar entidades reales del proyecto
```

Nunca resolver estas dudas mediante imaginación.

---

# 1. OBJETIVO GENERAL

Construir una pantalla premium de **control y monitoreo de edificio** que replique fielmente:

- arquitectura visual;
- densidad;
- jerarquía;
- distribución;
- agrupación;
- interacción;
- lectura operativa;

de la imagen BMS de referencia.

La pantalla debe incluir:

- header superior;
- sidebar izquierda;
- gran visor central del plano;
- selector entre Planta Baja y Planta Alta;
- tabla/lista de circuitos por zona;
- alarmas/eventos;
- condiciones ambientales;
- clima exterior;
- consumo eléctrico;
- controles rápidos;
- datos reales de Home Assistant;
- diseño responsive;
- arquitectura preparada para evolución futura.

La solución debe sentirse como un **BMS / Building Management System premium**, no como un dashboard genérico.

---

# 2. ORDEN DE PRIORIDAD

La implementación debe respetar exactamente este orden:

```text
1. Imagen de referencia WITMIND Control de Edificio
2. Planos arquitectónicos reales proporcionados
3. Entidades y servicios reales existentes en Home Assistant / proyecto
4. Componentes, estilos y design system actuales de Witmind
5. Cualquier consideración secundaria
```

No diseñar la pantalla alrededor de sensores disponibles.

La lógica correcta es:

```text
La imagen exige un componente
        ↓
buscar qué dato real debe alimentarlo
        ↓
si existe, usarlo
        ↓
si no existe, dejarlo preparado o mostrar estado no disponible
```

No hacer:

```text
Tengo sensores disponibles
        ↓
voy a crear una interfaz alrededor de ellos
```

---

# 3. QUEDA ANULADO EL PORT ANTERIOR DE SMART METERING

Para esta tarea NO implementar automáticamente:

```text
Inicio
Consumo
Calidad
Economía
```

No crear:

```text
SmartMeteringPremium
SlidingNavigation de Smart Metering
dashboard de calidad eléctrica
dashboard económico
balance energético
paneles de factor de potencia
paneles de frecuencia
```

salvo que un elemento concreto de la imagen BMS lo requiera de forma directa.

Las 8 entidades MQTT eléctricas quedan como **fuentes auxiliares opcionales**, no como estructura de esta pantalla.

---

# 4. NO REDISEÑAR LA REFERENCIA

Esta tarea NO consiste en proponer una UX nueva.

Está prohibido:

- reorganizar cards por gusto;
- mover la columna derecha;
- eliminar información visible por considerarla redundante;
- convertir el dashboard en una landing page;
- sustituir la tabla inferior por otro patrón en desktop;
- simplificar la interfaz;
- crear cards gigantes con poco contenido;
- reinterpretar la estructura;
- convertir la referencia en un dashboard genérico;
- “mejorar” la composición antes de haberla replicado.

Primero debe reproducirse fielmente la arquitectura de la imagen.

Las mejoras futuras serán otra fase.

---

# 5. INSPECCIÓN OBLIGATORIA DEL PROYECTO ANTES DE ESCRIBIR CÓDIGO

Antes de modificar nada, la IA debe inspeccionar el proyecto existente y localizar:

- framework y librerías utilizadas;
- estructura del dashboard;
- rutas;
- componentes Witmind reutilizables;
- sistema de estilos;
- variables CSS;
- design tokens;
- iconos existentes;
- componentes de gráficos;
- componentes de tablas;
- toggles;
- segmented controls;
- sliders;
- botones;
- cards;
- responsive primitives;
- mecanismo actual de acceso a Home Assistant;
- suscripción a estados;
- servicios Home Assistant;
- helpers/utilidades existentes;
- entidades de temperatura;
- entidades de humedad;
- iluminación;
- HVAC;
- energía;
- circuitos;
- zonas;
- alarmas;
- registros/configuraciones existentes.

No asumir tecnologías.

No introducir una librería nueva si el proyecto ya resuelve esa necesidad.

No reemplazar una arquitectura existente únicamente porque otra sea más cómoda.

---

# 6. ESTRUCTURA GENERAL DE LA PANTALLA

La composición principal debe seguir esta referencia:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER SUPERIOR                                                              │
│ WITMIND | Oficinas | hora | clima | modo | alarmas | potencia total         │
├──────────────┬─────────────────────────────────────┬─────────────────────────┤
│              │                                     │ ALARMAS / EVENTOS       │
│              │ PLANO DEL EDIFICIO                  │                         │
│              │                                     ├─────────────────────────┤
│ SIDEBAR      │ [ Planta Baja | Planta Alta ]       │ CONDICIONES AMBIENTALES │
│              │                                     │                         │
│              │ PLANO ARQUITECTÓNICO                ├─────────────────────────┤
│              │                                     │ CONSUMO ELÉCTRICO       │
│              │                                     │                         │
│              ├─────────────────────────────────────┼─────────────────────────┤
│              │ CIRCUITOS POR ZONA                  │ CONTROLES RÁPIDOS       │
│              │                                     │                         │
└──────────────┴─────────────────────────────────────┴─────────────────────────┘
```

La pantalla debe ser densa, técnica y operativa.

---

# 7. DESIGN SYSTEM

Debe reutilizarse el sistema visual real de Witmind.

Antes de crear:

- card;
- botón;
- toggle;
- badge;
- segmented control;
- gráfico;
- panel;
- pill;
- header;
- sidebar;

buscar si ya existe.

No crear un design system paralelo.

La referencia estética es:

```text
dark navy / graphite
cards oscuras
bordes sutiles
accent naranja
verde para normal
amarillo para warning
rojo para crítico
azul/cyan para información
tipografía limpia y técnica
alta densidad informativa
```

Pero deben usarse los tokens existentes de Witmind.

No hardcodear colores si ya existen variables.

---

# 8. NO CONVERTIRLO EN UNA UI "GAMING"

Evitar:

- glows excesivos;
- neón fuerte;
- blur permanente;
- glassmorphism excesivo;
- sombras agresivas;
- animaciones constantes;
- parallax;
- efectos 3D;
- gradients decorativos innecesarios.

Debe parecer software BMS premium.

---

# 9. HEADER SUPERIOR

La cabecera debe replicar conceptualmente la referencia.

## 9.1 Zona izquierda

Mostrar:

```text
WITMIND
CONTROL DE EDIFICIO

Oficinas
Sistema de Gestión de Edificio · Control y Monitoreo
```

Jerarquía:

```text
marca
↓
nombre principal
↓
descripción secundaria
```

---

## 9.2 Zona derecha

Mostrar indicadores compactos equivalentes a:

```text
hora
fecha
clima exterior
temperatura exterior
modo del edificio
alarmas activas
potencia total
```

Ejemplo visual:

```text
15:51
18 Sep 2026

14.5 °C
Exterior

Modo
Normal

2
Alarmas activas

789 W
Potencia total
```

Los valores de la imagen son únicamente referencia visual.

No hardcodearlos como datos reales.

---

# 10. LOS VALORES DE LA IMAGEN BMS NO SON DATOS REALES

Números como:

```text
789 W
48 W
336 W
144 W
23.1 °C
38 %
28.3 °C
+35 %
-12 %
```

son ejemplos de la imagen.

Está prohibido convertirlos en valores operativos.

La imagen define:

- posición;
- jerarquía;
- tipo de información;
- distribución;
- densidad;
- comportamiento visual.

Los valores deben provenir de entidades reales.

Si no existe una entidad real correspondiente:

```text
No disponible
```

o dejar el componente preparado.

---

# 11. SIDEBAR

La sidebar debe contener módulos equivalentes a:

```text
Inicio
Eléctrico
Clima (HVAC)
Iluminación
Seguridad
Energía
Reportes
Configuración
```

La opción activa en esta pantalla:

```text
Inicio
```

Si Witmind ya dispone de sidebar, reutilizarla.

No crear una nueva sin necesidad.

---

# 12. LAYOUT PRINCIPAL

Distribución aproximada:

```text
columna principal: 65–70 %
columna derecha:   30–35 %
```

Columna principal:

```text
Plano del edificio
Circuitos por zona
```

Columna derecha:

```text
Alarmas / Eventos
Condiciones ambientales
Consumo eléctrico
Controles rápidos
```

---

# 13. EL PLANO ES EL ELEMENTO DOMINANTE

El plano debe ocupar la mayor superficie visual de la pantalla.

No reducirlo a una card pequeña.

La referencia principal debe mantenerse:

```text
PLANO DEL EDIFICIO
```

con un visor amplio y operativo.

---

# 14. LA IMAGEN BMS Y LOS PLANOS TIENEN FUNCIONES DIFERENTES

La imagen BMS:

```text
define la interfaz
```

Los planos proporcionados:

```text
definen la arquitectura real
```

No copiar el plano ficticio que aparece dentro de la imagen BMS.

Sí copiar:

- tamaño relativo del visor;
- ubicación;
- selector de planta;
- estilo;
- overlays futuros;
- comportamiento.

Dentro del visor se deben usar únicamente los planos reales proporcionados.

---

# 15. SOLO EXISTEN DOS PLANTAS

Actualmente:

```text
Planta Baja
Planta Alta
```

No crear:

```text
Planta 1
Planta 2
Planta 3
Azotea
Sótano
```

Modelo:

```text
activeFloor = "ground" | "upper"
```

---

# 16. REGLA DE IDENTIDAD DE PLANTAS

Debe mantenerse permanentemente:

```text
Planta Baja = Showroom
Planta Alta = Taller
```

Si se intercambian, la implementación es incorrecta.

---

# 17. SELECTOR DE PLANTA

Usar un segmented control premium:

```text
[ Planta Baja ]  Planta Alta
```

o:

```text
Planta Baja  [ Planta Alta ]
```

No usar un dropdown si solo existen dos opciones.

---

# 18. CAMBIO ENTRE PLANTAS

El cambio ocurre dentro del mismo visor.

No:

- cambiar URL;
- abrir otra página;
- cambiar dashboard;
- recargar Home Assistant;
- desmontar toda la pantalla.

Debe existir un único:

```text
FloorPlanViewport
```

con dos estados internos.

---

# 19. SWIPE ENTRE PLANTAS

Si la infraestructura ya soporta gestos:

```text
swipe izquierda:
Planta Baja -> Planta Alta

swipe derecha:
Planta Alta -> Planta Baja
```

El selector y el swipe deben compartir exactamente el mismo estado.

---

# 20. TRANSICIÓN

Preferir:

```text
deslizamiento horizontal
```

Conceptualmente equivalente a:

```text
translateX(...)
```

Evitar:

```text
flip
rotaciones
3D
zoom agresivo
parallax
```

---

# 21. PLANTA BAJA

La Planta Baja contiene:

```text
SHOWROOM
WITRONIX ADMIN
ALMACÉN central
LOBBY
BAÑO
COCINA
COMEDOR
GRABACIÓN
ALMACÉN superior derecho
ALMACÉN inferior derecho
ESCALERAS / circulación
```

La geometría real debe salir del plano proporcionado.

---

# 22. PLANTA ALTA

La Planta Alta contiene:

```text
TALLER
MINDTEC
WITRONIX
BAÑO oeste
BAÑO este
ÁREA INFANTIL
SALA MULTIUSO
MINDTEC ADMIN
ESCALERAS / circulación
```

La geometría real debe salir del plano proporcionado.

---

# 23. PLANOS ARQUITECTÓNICOS REALES

Los planos proporcionados son la autoridad arquitectónica.

No:

- inventar habitaciones;
- eliminar habitaciones;
- mover habitaciones arbitrariamente;
- cambiar nombres sin necesidad;
- crear un edificio genérico;
- reemplazar los planos por otro diseño;
- aproximar paredes mediante divs sin necesidad.

---

# 24. PRIMERA IMPLEMENTACIÓN DEL PLANO

En esta fase:

```text
usar las imágenes reales proporcionadas
```

No reconstruir el plano mediante HTML/CSS.

No redibujar paredes manualmente.

No inventar SVG.

Requisitos:

```text
mantener aspect ratio
centrar horizontalmente
centrar verticalmente
usar contain
no recortar
no deformar
```

---

# 25. ARQUITECTURA PREPARADA PARA SVG FUTURO

Diseñar:

```text
FloorPlanViewport
    └── FloorRenderer
        ├── ImageRenderer
        └── SvgRenderer [futuro]
```

Debe ser posible sustituir la imagen por SVG sin rehacer la pantalla.

---

# 26. CAPAS FUTURAS DEL PLANO

Preparar conceptualmente:

```text
FloorPlanViewport
│
├── ArchitecturalLayer
├── ZoneLayer
├── DeviceLayer
├── EnvironmentalLayer
├── EnergyLayer
├── AlarmLayer
└── InteractionLayer
```

No implementar datos falsos.

---

# 27. OVERLAYS SOBRE EL PLANO

La imagen BMS contiene tarjetas flotantes sobre zonas.

En la primera implementación:

- solo añadir overlays si la zona puede asociarse correctamente a entidades reales;
- no inventar potencia;
- no inventar temperatura;
- no inventar estado;
- no colocar overlays arbitrariamente;
- la ausencia de overlay es preferible a información falsa.

Los overlays deben estar desacoplados de la imagen base.

---

# 28. HOTSPOTS FUTUROS

Cada zona debe quedar preparada para ser interactiva.

Futuro:

```text
click habitación
        ↓
seleccionar zona
        ↓
mostrar contexto
```

Posibles datos:

```text
estado
luces
temperatura
humedad
potencia
alarmas
acciones
```

Solo si existen entidades reales.

---

# 29. COTAS ARQUITECTÓNICAS

Las cotas visibles en los planos son referencia geométrica.

No convertir valores como:

```text
5.81
5.50
3.24
2.33
4.01
```

en KPIs operativos.

---

# 30. CIRCUITOS POR ZONA

Debajo del plano:

```text
CIRCUITOS POR ZONA
```

Formato tabla/lista.

Columnas:

```text
Zona
Estado
Potencia
Circuitos
Acciones
```

Ejemplo visual:

```text
Gerencia                  Normal      48 W      1 / 1    toggle
Mindtec                   Normal      48 W      1 / 1    toggle
Oficinas grandes          Normal     336 W      2 / 2    toggle
Pasillos                  Apagada      0 W      0 / 2    toggle
Taller                    Normal     144 W      1 / 1    toggle
```

Estos valores son solo referencia visual.

---

# 31. TABLA SENSIBLE A LA PLANTA

Cuando:

```text
activeFloor = ground
```

mostrar zonas/circuitos de Planta Baja.

Cuando:

```text
activeFloor = upper
```

mostrar Planta Alta.

Solo cuando exista una relación real entre zona y entidad.

---

# 32. ESTADOS DE CIRCUITO

Soportar como mínimo:

```text
normal
apagado
warning
fault
unavailable
```

Cada estado debe incluir:

- icono;
- texto;
- color semántico.

No depender únicamente del color.

---

# 33. ACCIONES DE CIRCUITOS

La columna Acciones puede usar toggles.

Estados:

```text
on
off
loading
disabled
unavailable
error
```

No simular éxito si Home Assistant no confirmó la acción.

---

# 34. ALARMAS / EVENTOS

Primera card de la columna derecha:

```text
ALARMAS / EVENTOS
```

Header:

```text
ALARMAS / EVENTOS                 Ver todas →
```

Cada fila debe incluir:

```text
icono
severidad
título
timestamp
dato/contexto
```

Ejemplo visual:

```text
Temperatura alta en Taller
Hoy 14:32                         28.3 °C

Consumo inusual en Oficinas
Hoy 12:17                         +35 %

Modo mantenimiento programado
Hoy 10:04                         HVAC
```

Los valores son referencia visual.

---

# 35. SEVERIDADES

Soportar:

```text
critical
warning
info
```

No depender solo del color.

---

# 36. ALARMAS POR CONTEXTO

Soportar:

```text
global
ground
upper
```

Las alarmas globales pueden permanecer visibles.

Las alarmas locales pueden priorizarse según `activeFloor`.

---

# 37. CONDICIONES AMBIENTALES

Card:

```text
CONDICIONES AMBIENTALES
```

Debe mostrar KPIs equivalentes a la imagen:

```text
Temperatura interior
Humedad promedio
Temperatura exterior
Condición climática
```

Ejemplo visual:

```text
23.1 °C
Interior promedio

38 %
Humedad promedio

14.5 °C
Exterior

Parcialmente nublado
```

---

# 38. CLIMA EXTERIOR

Entidad real:

```text
weather.forecast_casa
```

Nombre visible:

```text
WTX - MDTC
```

Integración:

```text
Meteorologisk institutt (Met.no)
```

Usarla como fuente para:

- temperatura exterior;
- condición meteorológica;
- icono;
- atributos adicionales cuando sean necesarios.

---

# 39. TRADUCCIÓN DE ESTADOS CLIMÁTICOS

Ejemplos:

```text
sunny         -> Soleado
cloudy        -> Nublado
partlycloudy  -> Parcialmente nublado
rainy         -> Lluvioso
pouring       -> Lluvia intensa
clear-night   -> Despejado de noche
fog           -> Niebla
windy         -> Ventoso
snowy         -> Nevado
```

No asumir que solo existen tres estados.

---

# 40. CONDICIONES INTERIORES

Temperatura y humedad interior deben salir de entidades reales existentes en el proyecto.

No usar:

```text
weather.forecast_casa
```

como temperatura interior.

No inventar sensores.

---

# 41. CONSUMO ELÉCTRICO

Card:

```text
CONSUMO ELÉCTRICO
```

Debe replicar la estructura de la imagen:

```text
valor grande actual
descriptor
comparación/tendencia
gráfico horario
```

Ejemplo visual:

```text
789 W
Total del edificio

-12 %
vs. ayer
```

No hardcodear estos valores.

---

# 42. LAS 8 ENTIDADES MQTT SON SOLO FUENTES AUXILIARES

Entidades disponibles:

```text
sensor.showroom_voltaje
sensor.showroom_corriente
sensor.showroom_potencia_activa
sensor.showroom_potencia_reactiva
sensor.showroom_factor_de_potencia
sensor.showroom_frecuencia
sensor.showroom_energia_activa
sensor.showroom_energia_reversa
```

Estas entidades NO definen la arquitectura de esta pantalla.

Usarlas únicamente si un elemento visible de la interfaz necesita ese dato.

---

# 43. USO POSIBLE DE POTENCIA

Para una card de potencia/consumo puede utilizarse:

```text
sensor.showroom_potencia_activa
```

solo si su alcance coincide con el significado del bloque.

Si mide únicamente Showroom:

```text
NO etiquetar como "Total del edificio"
```

---

# 44. USO POSIBLE DE ENERGÍA

Para un gráfico de consumo puede usarse:

```text
sensor.showroom_energia_activa
```

solo si corresponde al alcance del bloque.

Si es contador acumulativo:

```text
consumo_periodo =
energia_fin - energia_inicio
```

No sumar estados del contador.

---

# 45. NO AÑADIR MÉTRICAS POR EL SIMPLE HECHO DE EXISTIR

No añadir automáticamente:

```text
voltaje
corriente
factor de potencia
frecuencia
potencia reactiva
balance energético
costes
proyecciones
```

si la interfaz BMS no las necesita.

---

# 46. CONTROLES RÁPIDOS

Última card derecha:

```text
CONTROLES RÁPIDOS
```

Grid sugerido:

```text
Encender todas las luces
Apagar todas las luces
Modo ahorro
Modo mantenimiento
```

Cada control debe incluir:

- icono;
- título;
- descripción;
- estado;
- feedback.

---

# 47. HOME ASSISTANT ES LA FUENTE DE VERDAD OPERATIVA

No duplicar estados reales en variables manuales salvo estado puramente visual.

Para datos:

```text
usar entidades reales
```

Para acciones:

```text
usar servicios reales de Home Assistant
```

La UI debe reaccionar a cambios reales de Home Assistant.

Evitar mantener copias locales que puedan quedar desincronizadas.

---

# 48. SERVICIOS HOME ASSISTANT

Antes de ejecutar una acción:

```text
comprobar entidad
comprobar disponibilidad
ejecutar servicio
esperar respuesta / confirmar
mostrar feedback
manejar error
```

No simular éxito.

---

# 49. ENTIDADES DE OTRAS ZONAS

El proyecto ya contiene entidades de otras ubicaciones.

No crear duplicados.

Antes de hardcodear un `entity_id`:

1. revisar el proyecto;
2. localizar mapeos existentes;
3. reutilizar entidades reales;
4. asociarlas a la zona correcta.

---

# 50. REGISTRO CENTRAL DE ZONAS

Preferir una estructura equivalente a:

```text
zoneRegistry
```

Ejemplo conceptual:

```text
zoneRegistry = {
  "ground.showroom": {
    floor: "ground",
    label: "Showroom",
    entities: {
      lights: ...,
      temperature: ...,
      humidity: ...,
      power: ...
    }
  },

  "upper.taller": {
    floor: "upper",
    label: "Taller",
    entities: {
      lights: ...,
      temperature: ...,
      humidity: ...,
      power: ...
    }
  }
}
```

La sintaxis debe adaptarse a la arquitectura real del proyecto.

---

# 51. IDENTIFICADORES DE ZONA

Planta Baja:

```text
ground.witronix_admin
ground.showroom
ground.almacen_central
ground.lobby
ground.bano
ground.cocina
ground.comedor
ground.grabacion
ground.almacen_norte
ground.almacen_sur
```

Planta Alta:

```text
upper.mindtec
upper.witronix
upper.bano_oeste
upper.taller
upper.bano_este
upper.area_infantil
upper.sala_multiuso
upper.mindtec_admin
```

Los nombres pueden adaptarse a la convención del repositorio.

---

# 52. DATOS SENSIBLES A LA PLANTA

Al cambiar `activeFloor`, preparar actualización de:

```text
plano
zonas
circuitos
alarmas
condiciones interiores
acciones
```

No forzar que un dato global pase a ser local.

---

# 53. ESTADOS DE DATOS

Cada bloque debe contemplar:

```text
loading
ready
stale
unavailable
error
```

La pantalla no debe romperse si una entidad desaparece temporalmente.

---

# 54. `UNKNOWN` Y `UNAVAILABLE`

Nunca hacer:

```text
unknown -> 0
unavailable -> 0
null -> 0
```

Un cero real es un dato distinto.

---

# 55. ESTADO ONLINE

No deducir disponibilidad porque un valor sea distinto de cero.

Usar:

```text
availability
last_updated
heartbeat
estado real de entidad
```

según lo disponible.

---

# 56. ACTUALIZACIÓN EN TIEMPO REAL

La UI debe reaccionar a cambios de Home Assistant sin recargar.

Reutilizar websocket/eventos o el mecanismo reactivo existente.

No introducir polling agresivo si no hace falta.

---

# 57. HISTÓRICOS

Los gráficos deben utilizar histórico real de Home Assistant o la capa histórica existente.

No crear series sintéticas para rellenar visualmente.

---

# 58. RESPONSIVE

## Desktop grande

Mantener:

```text
sidebar
+
columna principal
+
columna derecha
```

## Tablet

Reducir tamaños sin perder jerarquía.

## Móvil

Orden recomendado:

```text
header
selector planta
plano
circuitos
alarmas
condiciones
consumo
controles
```

La tabla puede convertirse en cards compactas.

---

# 59. DENSIDAD VISUAL

La referencia es deliberadamente densa.

No convertirla en:

```text
una card gigante
+
mucho espacio vacío
+
pocos números
```

En desktop deben coexistir visualmente:

```text
plano
circuitos
alarmas
ambiente
consumo
acciones
```

---

# 60. ACCESIBILIDAD

Incluir:

```text
focus visible
aria-label
disabled
labels textuales
```

No usar color como único indicador.

---

# 61. COMPONENTES PROPUESTOS

Arquitectura conceptual:

```text
BuildingControlPage
│
├── BuildingHeader
├── BuildingSidebar
│
└── DashboardGrid
    │
    ├── MainColumn
    │   ├── FloorPlanCard
    │   │   ├── FloorHeader
    │   │   ├── FloorSelector
    │   │   └── FloorPlanViewport
    │   │
    │   └── ZoneCircuitsCard
    │
    └── SideColumn
        ├── AlertsCard
        ├── EnvironmentalCard
        ├── ElectricalConsumptionCard
        └── QuickControlsCard
```

---

# 62. NO DISTRIBUIR ENTITY IDS POR TODA LA UI

Evitar:

```text
componentA -> hardcoded entity
componentB -> hardcoded entity
componentC -> hardcoded entity
```

Preferir:

```text
entitiesConfig
zoneRegistry
buildingConfig
```

o el mecanismo equivalente existente.

---

# 63. ORDEN DE IMPLEMENTACIÓN

Seguir este orden:

```text
1. Revisar cuidadosamente la imagen BMS.
2. Revisar ambos planos.
3. Auditar el proyecto existente.
4. Identificar componentes Witmind reutilizables.
5. Identificar entidades Home Assistant existentes.
6. Construir/integrar layout general.
7. Integrar header.
8. Integrar sidebar.
9. Construir columna principal.
10. Crear selector Planta Baja / Planta Alta.
11. Integrar ambos planos reales.
12. Crear Circuitos por Zona.
13. Crear Alarmas / Eventos.
14. Integrar weather.forecast_casa.
15. Crear Condiciones Ambientales.
16. Crear Consumo Eléctrico.
17. Usar entidades MQTT solo si corresponden.
18. Crear Controles Rápidos.
19. Conectar entidades reales de otras zonas.
20. Añadir loading/error/unavailable.
21. Responsive.
22. Validación visual contra la imagen.
23. Autorrevisión final.
```

---

# 64. DEFINICIÓN DE TERMINADO

La tarea NO está terminada solo porque el layout aparezca.

Antes de finalizar deben existir:

- [ ] header construido;
- [ ] sidebar integrada;
- [ ] layout equivalente a la referencia;
- [ ] selector Planta Baja / Planta Alta funcional;
- [ ] ambos planos reales integrados;
- [ ] cambio de planta sin navegación de página;
- [ ] tabla Circuitos por Zona;
- [ ] Alarmas / Eventos;
- [ ] Condiciones Ambientales;
- [ ] clima exterior desde `weather.forecast_casa`;
- [ ] Consumo Eléctrico;
- [ ] Controles Rápidos;
- [ ] conexión con entidades reales disponibles;
- [ ] estados loading/error/unavailable;
- [ ] responsive;
- [ ] ausencia de datos ficticios;
- [ ] ausencia de arquitectura heredada de Smart Metering;
- [ ] comparación visual final contra la imagen BMS.

Si falta alguno, continuar trabajando.

---

# 65. CRITERIOS DE ACEPTACIÓN VISUAL

- [ ] La composición se parece claramente a la imagen de referencia.
- [ ] El plano es el bloque dominante.
- [ ] Existe columna lateral derecha.
- [ ] Existe tabla inferior.
- [ ] La sidebar conserva la lógica de la referencia.
- [ ] El header mantiene alta densidad operativa.
- [ ] La UI no parece un dashboard genérico.
- [ ] La densidad visual es similar a la referencia.
- [ ] Se reutiliza Witmind Premium.
- [ ] No se introduce Smart Metering como módulo paralelo.

---

# 66. CRITERIOS DE ACEPTACIÓN DE PLANTAS

- [ ] Existen exactamente dos plantas.
- [ ] Planta Baja = Showroom.
- [ ] Planta Alta = Taller.
- [ ] Ambas viven en el mismo viewport.
- [ ] Cambiar planta no cambia URL.
- [ ] Cambiar planta no recarga.
- [ ] Selector y swipe comparten estado.
- [ ] Los planos no se deforman.
- [ ] Los planos no se recortan arbitrariamente.
- [ ] La arquitectura permite SVG futuro.

---

# 67. CRITERIOS DE ACEPTACIÓN DE DATOS

- [ ] `weather.forecast_casa` alimenta clima exterior.
- [ ] Sensores interiores salen del proyecto real.
- [ ] No se inventan valores.
- [ ] `unknown` no se convierte en `0`.
- [ ] `unavailable` no se convierte en `0`.
- [ ] Las 8 entidades MQTT solo se usan si hace falta.
- [ ] No se añaden paneles eléctricos no pedidos.
- [ ] No se asigna potencia Showroom a otras zonas sin evidencia.
- [ ] Los históricos son reales.
- [ ] Los contadores acumulativos usan deltas cuando corresponda.

---

# 68. ERRORES QUE DEBEN RECTIFICARSE AUTOMÁTICAMENTE

## Error: crear vistas heredadas de Smart Metering

```text
Inicio / Consumo / Calidad / Economía
```

### Corrección

Eliminar esa arquitectura de esta pantalla.

---

## Error: diseñar alrededor de las 8 entidades MQTT

### Corrección

Volver a la imagen BMS.

---

## Error: crear una página por planta

### Corrección

Usar `activeFloor` dentro de un único `FloorPlanViewport`.

---

## Error: hardcodear valores vistos en la imagen

### Corrección

Conectar entidad real o mostrar `No disponible`.

---

## Error: usar clima exterior como temperatura interior

### Corrección

`weather.forecast_casa` es exterior.

---

## Error: reconstruir el plano con HTML/CSS aproximado

### Corrección

Usar los planos reales proporcionados.

---

## Error: inventar overlays

### Corrección

Mostrar solo overlays con datos reales.

---

## Error: rediseñar la referencia

### Corrección

Volver a replicar la imagen antes de introducir mejoras.

---

# 69. PROTOCOLO DE AUTOCORRECCIÓN

Antes de entregar:

```text
1. Volver a mirar la imagen BMS.
2. Comparar layout y proporciones.
3. Confirmar que el plano domina visualmente.
4. Confirmar la columna lateral derecha.
5. Confirmar la tabla inferior.
6. Confirmar Planta Baja = Showroom.
7. Confirmar Planta Alta = Taller.
8. Confirmar weather.forecast_casa para exterior.
9. Buscar componentes heredados de Smart Metering.
10. Buscar datos inventados.
11. Buscar números copiados de la imagen.
12. Buscar métricas añadidas solo porque existen sensores.
13. Buscar entidades duplicadas.
14. Verificar reutilización de Witmind.
15. Verificar loading/error/unavailable.
16. Verificar responsive.
17. Corregir cualquier desviación.
18. Solo entonces considerar terminada la tarea.
```

---

# 70. REGLA DE PRIORIDAD DE FUENTES

Si existe contradicción entre:

```text
una suposición visual
```

y:

```text
la imagen BMS
```

prevalece la imagen BMS.

Si existe contradicción entre:

```text
una suposición arquitectónica
```

y:

```text
los planos
```

prevalecen los planos.

Si existe contradicción entre:

```text
un valor supuesto
```

y:

```text
Home Assistant
```

prevalece Home Assistant.

Si existe contradicción entre:

```text
una implementación improvisada
```

y:

```text
este documento
```

prevalece este documento.

---

# 71. RESUMEN NO NEGOCIABLE

```text
IMAGEN BMS = MÁXIMA PRIORIDAD
+
PLANOS REALES = ARQUITECTURA REAL
+
PLANTA BAJA = SHOWROOM

---

# 74. CORRECCIÓN OPERATIVA 0.6.2 — DATOS REALES, PERFILES Y OVERLAYS

Esta sección prevalece sobre cualquier mapeo provisional anterior del primer prototipo BMS.

## 74.1 Contrato de potencia

- `sensor.showroom_potencia_activa` es la medición física del Showroom y publica en `kW`; la UI debe normalizarla a `W` antes de presentarla.
- `sensor.sensor_de_potencia_showroom_p` es la medición física del Lobby, registrada en Home Assistant como “Sensor de Potencia Lobby P”.
- Sala de grabación no tiene medidor físico identificado. Su potencia actual se calcula únicamente con los estados reales de sus cuatro switches y las potencias documentadas (24 + 96 + 50 + 30 W), rotulándola como cálculo por circuitos.
- En oficinas, sala multiuso y taller se aplica la misma regla: estado real del switch multiplicado por potencia nominal documentada. Nunca se rotula como medición física.
- Toda entidad con unidad `kW` se convierte a `W`; `unknown` y `unavailable` nunca se convierten en cero.

## 74.2 Contrato de los switches de Planta Baja

| Zona | Encendido | Apagado | Estado activo |
|---|---|---|---|
| Showroom | Activa `scene.reunion` y fuerza exclusivamente Spots ventana + Spots 2x3; el resto queda apagado. | Apaga los diez circuitos del Showroom. | Solo cuando el perfil Reunión coincide exactamente. |
| Lobby | Activa el perfil Invitados/Visita: los cuatro circuitos principales encendidos. | Apaga los cuatro circuitos. | Solo cuando los cuatro circuitos están encendidos. |
| Grabación | Enciende sus cuatro circuitos. | Apaga sus cuatro circuitos. | Solo cuando los cuatro circuitos están encendidos. |

El switch no debe interpretar “algún circuito encendido” como perfil activo ni encender indiscriminadamente todos los circuitos del Showroom.

## 74.3 Contrato de ambiente

- `sensor.t_h_sensor_2_temperature` y `sensor.t_h_sensor_2_humidity`: Oficina Grande, ubicada operativamente sobre el sector WITRONIX/MINDTEC de Planta Alta.
- `sensor.t_h_sensor_temperature` y `sensor.t_h_sensor_humidity`: Witronix Admin de Planta Baja.
- No se usa clima exterior como ambiente interior.

## 74.4 Overlays sobre los planos

Los planos continúan siendo las imágenes arquitectónicas originales. Sobre ellos se superponen cards compactas, ancladas por coordenadas porcentuales a cada planta, con solo:

- cantidad de circuitos encendidos / disponibles;
- potencia actual normalizada;
- temperatura y humedad donde exista sensor real.

No se muestran voltaje, corriente, energía acumulada, datos ficticios ni cards pertenecientes a la otra planta.

## 74.5 Verificación obligatoria

1. Probar que Showroom ON deja únicamente el perfil Reunión.
2. Probar que Lobby ON deja únicamente el perfil Invitados/Visita.
3. Probar que Grabación ON enciende sus cuatro circuitos.
4. Probar que OFF apaga exclusivamente la zona correspondiente.
5. Verificar conversión `kW -> W` del medidor Showroom.
6. Verificar el medidor de Lobby y la ausencia de cero ficticio.
7. Verificar overlays distintos y correctos para Planta Baja y Planta Alta.
8. Conservar dimensiones idénticas entre ambas plantas.
+
PLANTA ALTA = TALLER
+
MISMO VISOR PARA AMBAS PLANTAS
+
weather.forecast_casa = CLIMA EXTERIOR
+
ENTIDADES EXISTENTES = DATOS REALES
+
8 MQTT = SOLO SI SON NECESARIAS
+
NO SMART METERING COMO MÓDULO AQUÍ
+
NO DATOS INVENTADOS
+
NO NÚMEROS HARDCODEADOS DE LA REFERENCIA
+
REUTILIZAR WITMIND PREMIUM
+
HOME ASSISTANT = FUENTE OPERATIVA
```

---

# 72. INSTRUCCIÓN FINAL PARA LA IA IMPLEMENTADORA

No improvises cuando ya existe una fuente de verdad.

Antes de crear:

- una entidad;
- un componente;
- un estilo;
- una ruta;
- una métrica;
- una asociación de zona;
- una acción;
- un overlay;

revisa primero:

1. la imagen BMS;
2. los planos;
3. este plan;
4. el proyecto existente;
5. las entidades Home Assistant disponibles;
6. los componentes Witmind existentes.

La tarea consiste en **replicar fielmente la experiencia BMS de referencia usando la arquitectura física real y los datos reales del proyecto**.

Nada del antiguo port de Smart Metering debe condicionar esta pantalla.
