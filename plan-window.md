# PLAN MAESTRO — PORTEO DE SMART METERING A WITMIND PREMIUM

> **Documento normativo para la IA implementadora**
>
> Este archivo define la arquitectura, navegación, fuentes de datos, cálculos, jerarquía de bloques y restricciones del porteo.
> Si durante la implementación existe cualquier duda, contradicción o desviación visual/funcional, **este documento tiene prioridad**.
> La IA debe volver a revisar este plan antes de improvisar una solución.

---

## 0. OBJETIVO

Convertir la información de los dashboards clásicos de Home Assistant en una experiencia **Witmind Premium**, reutilizando los estilos, componentes, CSS y lógica visual ya existentes en Witmind.

La misión de este porteo **NO es copiar el diseño clásico de Home Assistant**.

La misión es:

1. conservar la información útil;
2. conservar la semántica de cada métrica;
3. utilizar las 8 entidades MQTT reales como fuente principal;
4. reconstruir los paneles con los componentes premium de Witmind;
5. integrar todas las subpantallas dentro de **una única vista**;
6. navegar entre dichas subpantallas mediante el **selector deslizante premium**;
7. evitar páginas, tabs o rutas independientes para cada sección;
8. no inventar sensores, valores ni relaciones inexistentes.

---

# 1. REGLAS ABSOLUTAS

Estas reglas son obligatorias.

## 1.1 No crear nuevas páginas para cada sección

Las diferentes pantallas del módulo Smart Metering:

- no son pestañas independientes de Home Assistant;
- no son dashboards diferentes;
- no son rutas diferentes;
- no deben cambiar la URL;
- no deben provocar una recarga completa;
- no deben desmontar todo el shell de Witmind.

Todas forman parte de **una única vista premium**.

---

## 1.2 La navegación interna se realiza con el selector premium deslizante

La referencia visual es el selector existente:

```text
Inicio | Iluminación | Energía | Sistema
```

Ese patrón debe reutilizarse para Smart Metering.

El selector superior y el contenido inferior forman parte del mismo componente lógico.

Al pulsar una opción:

```text
selector
   ↓
actualiza activeView
   ↓
el viewport se desplaza
   ↓
se muestra la nueva pantalla
```

Al realizar un swipe, si el sistema premium ya soporta gestos:

```text
swipe horizontal
   ↓
actualiza activeView
   ↓
el selector superior cambia automáticamente
```

Debe existir **una única fuente de estado**.

Nunca mantener por separado:

```text
selectedTab
sliderIndex
```

si ambos representan la misma pantalla.

Debe existir conceptualmente algo equivalente a:

```text
activeView
```

---

## 1.3 El shell general permanece fijo

Al cambiar de sección deben permanecer intactos:

- sidebar de Home Assistant;
- header global de Witmind;
- identidad/marca Witmind;
- indicadores globales;
- título/contexto del módulo;
- contenedor general;
- ruta actual.

Solo cambia el contenido del viewport central.

---

## 1.4 No inventar datos

Si una métrica no puede obtenerse de las entidades reales disponibles:

- no simularla;
- no calcularla con otra magnitud sin relación;
- no mostrar un valor ficticio;
- no sustituirla por un sensor parecido;
- no reinterpretar una entidad para rellenar espacio.

Si falta una fuente de datos, el componente debe:

- ocultarse;
- marcarse como no disponible;
- o quedar preparado para una futura entidad.

---

## 1.5 `unknown` y `unavailable` NO equivalen a cero

Nunca hacer:

```text
unavailable -> 0
unknown     -> 0
null        -> 0
```

Debe distinguirse entre:

- valor real `0`;
- `unknown`;
- `unavailable`;
- dato obsoleto;
- ausencia de histórico.

---

# 2. ENTIDADES MQTT AUTORIZADAS

El núcleo del Smart Metering se basa en exactamente estas 8 entidades:

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

No asumir que pertenecen a un `device` de Home Assistant.

La implementación debe funcionar directamente por `entity_id`.

---

# 3. MODELO LÓGICO DE DATOS

| Variable lógica | Entidad | Unidad esperada | Naturaleza |
|---|---|---:|---|
| Voltaje | `sensor.showroom_voltaje` | V | instantánea |
| Corriente | `sensor.showroom_corriente` | A | instantánea |
| Potencia activa | `sensor.showroom_potencia_activa` | W / kW | instantánea |
| Potencia reactiva | `sensor.showroom_potencia_reactiva` | var / kvar | instantánea |
| Factor de potencia | `sensor.showroom_factor_de_potencia` | 0–1 | instantánea |
| Frecuencia | `sensor.showroom_frecuencia` | Hz | instantánea |
| Energía activa/importada | `sensor.showroom_energia_activa` | kWh | acumulativa |
| Energía reversa/exportada | `sensor.showroom_energia_reversa` | kWh | acumulativa |

La unidad real reportada por Home Assistant debe respetarse.

Las conversiones:

```text
W <-> kW
var <-> kvar
Wh <-> kWh
```

solo deben realizarse en la capa de presentación cuando sea necesario.

---

# 4. ESTRUCTURA GENERAL DEL MÓDULO

La arquitectura conceptual es:

```text
SmartMeteringPremium
│
├── GlobalShell
│   ├── Sidebar
│   ├── WitmindHeader
│   └── GlobalStatus
│
├── ModuleHeader
│   ├── Eyebrow / categoría
│   ├── Título Smart Metering
│   └── SlidingNavigation
│
└── SlidingViewport
    ├── View 0 — Inicio
    ├── View 1 — Consumo
    ├── View 2 — Calidad
    └── View 3 — Economía
```

---

# 5. NAVEGACIÓN PREMIUM OBLIGATORIA

## 5.1 Selector

Usar el componente visual premium equivalente a:

```text
┌────────────────────────────────────────────┐
│ Inicio | Consumo | Calidad | Economía      │
└────────────────────────────────────────────┘
```

La opción activa debe emplear el tratamiento visual premium existente.

No recrear estilos desde cero si Witmind ya dispone de ese componente.

---

## 5.2 Comportamiento

Modelo lógico mínimo:

```text
activeView = 0 | 1 | 2 | 3
```

Correspondencia:

```text
0 = Inicio
1 = Consumo
2 = Calidad
3 = Economía
```

El viewport puede comportarse conceptualmente como:

```text
translateX(-activeView * 100%)
```

La implementación técnica concreta puede variar, siempre que conserve el comportamiento.

---

## 5.3 Sincronización

Regla obligatoria:

```text
selector activo === pantalla visible
```

Nunca pueden quedar desincronizados.

Ejemplo correcto:

```text
click "Calidad"
    ↓
activeView = 2
    ↓
el slider muestra Calidad
    ↓
"Calidad" aparece activa
```

Ejemplo correcto con swipe:

```text
swipe a la izquierda
    ↓
activeView pasa de 1 a 2
    ↓
aparece Calidad
    ↓
el selector marca Calidad
```

---

# 6. VIEW 0 — INICIO / TIEMPO REAL

Es la pantalla operativa principal.

Debe contener:

```text
Acometida general
Estado del medidor
Última actualización

Demanda actual

Voltaje
Corriente
Potencia activa
Potencia reactiva
Factor de potencia
Frecuencia

Histórico reciente de potencia activa
```

---

## 6.1 Encabezado del medidor

Contenido:

```text
Acometida general
Smart Metering
```

Indicadores secundarios:

```text
En línea
Actualizado hace XX s
HH:mm
```

### Estado de conectividad

No derivar "En línea" de un valor eléctrico.

Derivarlo de la frescura de los datos.

Conceptualmente:

```text
online:
último update dentro del timeout válido

stale:
último update demasiado antiguo, pero existe

offline:
no existen actualizaciones durante el límite crítico
```

---

## 6.2 Demanda actual

Fuente:

```text
sensor.showroom_potencia_activa
```

Contenido:

```text
Demanda actual

0.98 kW
```

Debajo:

```text
Min
Avg
Max
```

Y un gráfico temporal de potencia activa.

El periodo puede ser una ventana corta configurable.

---

## 6.3 Grid de métricas instantáneas

Mostrar seis KPIs:

```text
┌────────────────────┬────────────────────┐
│ Tensión            │ Corriente          │
│ xxx V              │ x.xx A             │
├────────────────────┼────────────────────┤
│ Potencia activa    │ Potencia reactiva  │
│ x.xx kW            │ x.xx kvar          │
├────────────────────┼────────────────────┤
│ Factor potencia    │ Frecuencia         │
│ 0.xxx              │ xx.xx Hz           │
└────────────────────┴────────────────────┘
```

Mapeo:

```text
Tensión
-> sensor.showroom_voltaje

Corriente
-> sensor.showroom_corriente

Potencia activa
-> sensor.showroom_potencia_activa

Potencia reactiva
-> sensor.showroom_potencia_reactiva

Factor de potencia
-> sensor.showroom_factor_de_potencia

Frecuencia
-> sensor.showroom_frecuencia
```

Estas tarjetas muestran el último estado válido.

---

# 7. VIEW 1 — CONSUMO / ENERGÍA

Esta pantalla agrupa:

```text
Demanda · 24 h
Consumo por hora
Consumo diario · 7 días
Consumo del mes
Energía activa/importada
Energía reversa/exportada
Balance energético
```

---

## 7.1 Demanda · 24 h

Fuente:

```text
sensor.showroom_potencia_activa
```

Mostrar:

```text
valor actual
Min
Avg
Max
gráfico últimas 24 horas
```

---

## 7.2 Consumo por hora

Fuente:

```text
sensor.showroom_energia_activa
```

IMPORTANTE:

Esta entidad es un contador acumulativo.

No sumar todos los estados históricos.

El consumo horario se obtiene mediante diferencia:

```text
consumo_hora =
energia_fin_hora - energia_inicio_hora
```

Visualización:

```text
Consumo por hora
X.XX kWh

[barras por hora]
```

Cada barra representa kWh consumidos durante esa hora.

---

## 7.3 Consumo diario — 7 días

Fuente:

```text
sensor.showroom_energia_activa
```

Cálculo:

```text
consumo_dia =
energia_fin_dia - energia_inicio_dia
```

Visual:

```text
D-6 | D-5 | D-4 | D-3 | D-2 | ayer | hoy
```

Cada barra representa consumo de ese día.

Puede mostrar:

```text
Min
Max
```

calculados sobre los consumos diarios válidos.

---

## 7.4 Consumo acumulado del mes

Cálculo:

```text
consumo_mes =
energia_activa_actual - energia_activa_inicio_mes
```

Nunca mostrar como "consumo del mes" el contador absoluto de toda la vida del medidor.

---

## 7.5 Balance energético

Fuentes:

```text
sensor.showroom_energia_activa
sensor.showroom_energia_reversa
```

Mostrar:

```text
Energía activa/importada
XXXX.XX kWh

Energía reversa/exportada
XXXX.XX kWh
```

Valor derivado opcional:

```text
balance_neto =
energia_activa - energia_reversa
```

Debe etiquetarse claramente como balance neto.

No confundirlo con consumo bruto.

---

# 8. VIEW 2 — CALIDAD ELÉCTRICA

Contenido:

```text
Tensión histórica
Corriente histórica
Factor de potencia histórico
Frecuencia histórica
Potencia activa vs reactiva
```

---

## 8.1 Tensión

Fuente:

```text
sensor.showroom_voltaje
```

Mostrar:

```text
Tensión
valor actual

Min
Avg
Max

gráfico histórico
```

Periodo base recomendado:

```text
24 h
```

Puede permitirse:

```text
24 h
48 h
7 días
```

si la arquitectura premium lo contempla.

---

## 8.2 Corriente

Fuente:

```text
sensor.showroom_corriente
```

Mostrar:

```text
Corriente
valor actual

Min
Avg
Max

gráfico histórico
```

Mantener, si es posible, la misma ventana temporal que tensión.

---

## 8.3 Factor de potencia

Fuente:

```text
sensor.showroom_factor_de_potencia
```

Mostrar:

```text
Factor de potencia
valor actual

Min
Avg
Max

gráfico histórico
```

No truncar valores bajos solo para hacer el gráfico visualmente más bonito.

Si se añaden estados como:

```text
normal
bajo
crítico
```

los umbrales deben ser configurables.

---

## 8.4 Frecuencia

Fuente:

```text
sensor.showroom_frecuencia
```

Mostrar:

```text
Frecuencia
valor actual
Min
Avg
Max
histórico
```

---

## 8.5 Activa vs reactiva

Fuentes:

```text
sensor.showroom_potencia_activa
sensor.showroom_potencia_reactiva
```

Mostrar las dos series sobre el mismo periodo.

Leyenda:

```text
Potencia activa
Potencia reactiva
```

Reglas:

- no aplicar `abs()` automáticamente;
- conservar el signo de la reactiva;
- no falsear escalas;
- si es necesario, usar doble eje Y;
- los tooltips deben mostrar el dato real.

---

# 9. VIEW 3 — ECONOMÍA

Esta pantalla reutiliza los datos energéticos, pero necesita configuración económica adicional.

Las 8 entidades MQTT NO contienen precio de energía.

Por tanto deben existir parámetros externos:

```text
tarifa_kwh
moneda
coste_referencia_mensual
consumo_referencia_mensual
```

Si no existen, los bloques que dependan de ellos deben aparecer como no configurados, no como cero.

---

## 9.1 Lo que llevo gastado

Cálculo:

```text
energia_consumida_mes =
energia_activa_actual - energia_activa_inicio_mes

coste_actual =
energia_consumida_mes * tarifa_kwh
```

Mostrar:

```text
Lo que llevo gastado

Bs X.XX
XX.XX kWh consumidos
```

La moneda debe ser configurable.

---

## 9.2 Precio de energía

Mostrar:

```text
Bs X.XX / kWh
Precio de la energía
```

Este dato es configuración externa.

No inferirlo del consumo.

---

## 9.3 Proyección de fin de mes

Mostrar:

```text
Cómo va a terminar el mes

Coste estimado final
Energía estimada final
Promedio de consumo por día
```

Cálculo base:

```text
promedio_diario =
energia_consumida_mes / dias_transcurridos

energia_estimada_mes =
promedio_diario * dias_del_mes

coste_estimado =
energia_estimada_mes * tarifa_kwh
```

Debe quedar claro que se trata de una estimación.

---

## 9.4 Ahorro

Requiere una referencia externa.

Cálculos posibles:

```text
ahorro =
coste_referencia_mes - coste_proyectado_mes

porcentaje_ahorro =
ahorro / coste_referencia_mes * 100

ahorro_anual_proyectado =
ahorro_mensual_estimado * 12
```

Mostrar:

```text
Cuánto se está ahorrando

Ahorro económico
Porcentaje de ahorro
Proyección anual
```

Debe quedar diferenciado si el valor es:

```text
medido
calculado
estimado
comparado contra referencia
```

---

# 10. CAPTURAS QUE SOLO SON REFERENCIA DE LAYOUT

Algunas capturas originales contienen datos que NO pueden obtenerse de las 8 entidades autorizadas.

Deben utilizarse solo como referencia de estructura visual.

---

## 10.1 Circuitos medidos

Elementos como:

```text
Reflector exterior
Paneles
```

con consumos independientes requieren sensores específicos por circuito.

No intentar separar el consumo general en circuitos mediante estimaciones.

Para implementarlo realmente en el futuro harían falta entidades equivalentes a:

```text
sensor.reflector_potencia
sensor.reflector_energia

sensor.paneles_potencia
sensor.paneles_energia
```

---

## 10.2 Climatización

La captura con:

```text
temperatura
humedad
consumo de climatización
temperatura vs consumo
```

necesita sensores HVAC/ambiente específicos.

No derivar temperatura o humedad de sensores eléctricos.

---

## 10.3 Confort térmico / oficinas

Comparativas de:

```text
temperatura oficina A
temperatura oficina B
humedad oficina A
humedad oficina B
```

requieren sensores ambientales independientes.

Las capturas sirven únicamente para reutilizar:

- jerarquía;
- composición;
- densidad;
- relación KPI + histórico;
- comparación de series.

---

# 11. COMPONENTES VISUALES REUTILIZABLES

La implementación debe favorecer primitivas reutilizables.

## 11.1 KPI compacto

Formato conceptual:

```text
[icono]  232.6 V
         Tensión
```

Uso:

- voltaje;
- corriente;
- potencia;
- frecuencia;
- energía;
- coste.

---

## 11.2 KPI histórico

Formato:

```text
Título

Valor actual

Min       Avg       Max

[gráfico temporal]
```

Uso:

- potencia activa;
- tensión;
- corriente;
- factor de potencia;
- frecuencia.

---

## 11.3 Comparador

Formato:

```text
Título

Serie A
Serie B

[gráfico combinado]
```

Uso:

```text
Activa vs reactiva
```

---

## 11.4 KPI calculado

Formato:

```text
Título

Valor calculado

Descripción breve de cómo se obtiene
```

Uso:

- consumo mensual;
- coste actual;
- proyección;
- ahorro.

---

# 12. CAPA DE DATOS

La UI no debe repetir lógica de agregación en cada tarjeta.

Debe existir conceptualmente:

```text
Home Assistant / MQTT
        │
        ▼
Raw Electrical Data
        │
        ├── voltage
        ├── current
        ├── activePower
        ├── reactivePower
        ├── powerFactor
        ├── frequency
        ├── importedEnergy
        └── reverseEnergy
        │
        ▼
Historical Aggregation
        │
        ├── min
        ├── max
        ├── average
        ├── hourlyDelta
        ├── dailyDelta
        ├── monthlyDelta
        └── historySeries
        │
        ▼
Derived Metrics
        │
        ├── consumptionToday
        ├── consumptionMonth
        ├── projectedConsumption
        ├── currentCost
        ├── projectedCost
        └── savings
        │
        ▼
Premium UI Components
```

---

# 13. REGLAS DE HISTÓRICO

## 13.1 Instantáneos

Para:

```text
voltaje
corriente
potencia activa
potencia reactiva
factor de potencia
frecuencia
```

los históricos pueden representarse directamente como series temporales.

---

## 13.2 Contadores acumulativos

Para:

```text
energia activa
energia reversa
```

los históricos deben transformarse en diferencias para obtener consumo de periodos.

Nunca:

```text
SUM(estados del contador)
```

Sí:

```text
valor_fin - valor_inicio
```

---

## 13.3 Reset de contador

La implementación debe contemplar resets.

Si:

```text
valor_nuevo < valor_anterior
```

no asumir automáticamente consumo negativo.

Debe detectarse un posible:

- reinicio del dispositivo;
- reset del contador;
- cambio de fuente;
- discontinuidad.

---

# 14. MIN / AVG / MAX

Reglas:

```text
- ignorar null;
- ignorar unknown;
- ignorar unavailable;
- no convertir ausencias a cero;
- usar únicamente muestras válidas;
- mantener la unidad original;
```

La media debe calcularse sobre los datos realmente disponibles en el periodo.

---

# 15. RESPONSIVE

La estructura de escritorio puede usar varias columnas, pero el orden semántico debe mantenerse.

Ejemplo escritorio:

```text
┌──────────────┬──────────────┬──────────────┐
│ estado       │ evolución    │ calidad      │
└──────────────┴──────────────┴──────────────┘
```

Ejemplo móvil:

```text
estado
↓
KPIs
↓
gráficos principales
↓
comparativas
↓
métricas secundarias
```

El sistema de navegación deslizante debe seguir funcionando en móvil.

---

# 16. NO COPIAR LOS ESTILOS CLÁSICOS DE HOME ASSISTANT

Está prohibido utilizar las capturas clásicas como referencia estética final.

De ellas solo se extrae:

- qué información existe;
- agrupación lógica;
- métricas;
- periodos;
- comparativas;
- relaciones entre datos.

La apariencia final debe utilizar:

- estilos Witmind Premium;
- componentes Witmind existentes;
- espaciado Witmind;
- tipografía Witmind;
- tokens Witmind;
- CSS Witmind;
- interacciones Witmind.

---

# 17. NO REIMPLEMENTAR LO QUE YA EXISTE EN WITMIND

Antes de crear un componente nuevo, revisar si Witmind ya tiene:

- segmented control;
- slider;
- cards;
- KPI;
- chart wrapper;
- pills;
- header;
- icons;
- containers;
- responsive primitives.

Si existe, reutilizarlo.

No duplicar un componente premium solo para Smart Metering.

---

# 18. MATRIZ DE FUENTES

| Bloque | Fuente |
|---|---|
| Demanda actual | `sensor.showroom_potencia_activa` |
| Voltaje actual | `sensor.showroom_voltaje` |
| Corriente actual | `sensor.showroom_corriente` |
| Potencia activa actual | `sensor.showroom_potencia_activa` |
| Potencia reactiva actual | `sensor.showroom_potencia_reactiva` |
| Factor de potencia actual | `sensor.showroom_factor_de_potencia` |
| Frecuencia actual | `sensor.showroom_frecuencia` |
| Demanda 24 h | histórico de `sensor.showroom_potencia_activa` |
| Consumo horario | delta de `sensor.showroom_energia_activa` |
| Consumo diario | delta de `sensor.showroom_energia_activa` |
| Consumo mensual | delta de `sensor.showroom_energia_activa` |
| Energía importada | `sensor.showroom_energia_activa` |
| Energía reversa | `sensor.showroom_energia_reversa` |
| Activa vs reactiva | potencia activa + reactiva |
| Coste | consumo × tarifa configurada |
| Proyección | histórico + tarifa + calendario |
| Ahorro | referencia externa vs consumo/coste |

---

# 19. ARQUITECTURA FINAL ESPERADA

```text
SmartMeteringPremium
│
├── Header
│   ├── Identidad Witmind
│   ├── Estado global
│   └── Resumen superior
│
├── ModuleHeading
│   ├── SMART METERING
│   └── Acometida general
│
├── SlidingNavigation
│   ├── Inicio
│   ├── Consumo
│   ├── Calidad
│   └── Economía
│
└── SlidingViewport
    │
    ├── Inicio
    │   ├── MeterStatus
    │   ├── CurrentDemand
    │   ├── Voltage
    │   ├── Current
    │   ├── ActivePower
    │   ├── ReactivePower
    │   ├── PowerFactor
    │   └── Frequency
    │
    ├── Consumo
    │   ├── Demand24h
    │   ├── HourlyConsumption
    │   ├── DailyConsumption7d
    │   ├── MonthlyConsumption
    │   └── EnergyBalance
    │
    ├── Calidad
    │   ├── VoltageHistory
    │   ├── CurrentHistory
    │   ├── PowerFactorHistory
    │   ├── FrequencyHistory
    │   └── ActiveReactiveComparison
    │
    └── Economía
        ├── CurrentSpend
        ├── Tariff
        ├── MonthProjection
        ├── Savings
        └── DailyConsumption
```

---

# 20. CRITERIOS DE ACEPTACIÓN

La implementación solo puede considerarse correcta si cumple TODOS los puntos siguientes:

- [ ] Existe una sola vista Smart Metering.
- [ ] No se crean páginas separadas para Inicio, Consumo, Calidad y Economía.
- [ ] El selector premium controla el contenido central.
- [ ] El cambio de sección no recarga la página.
- [ ] El cambio de sección no modifica la ruta.
- [ ] El shell general permanece fijo.
- [ ] Selector y slider comparten el mismo estado.
- [ ] Los 8 `entity_id` indicados son la fuente de verdad eléctrica.
- [ ] No se exige que las entidades pertenezcan a un device.
- [ ] No se inventan entidades.
- [ ] No se inventan valores.
- [ ] `unknown` y `unavailable` no se convierten a cero.
- [ ] Potencia activa y reactiva conservan sus signos reales.
- [ ] Energía acumulativa se transforma mediante deltas para consumos.
- [ ] Los consumos horarios son deltas horarios.
- [ ] Los consumos diarios son deltas diarios.
- [ ] El consumo mensual es un delta desde inicio de mes.
- [ ] Existe detección de reset/discontinuidad del contador.
- [ ] Min/Avg/Max ignoran muestras inválidas.
- [ ] Los datos económicos dependen de configuración externa.
- [ ] Sin tarifa no se inventa ningún coste.
- [ ] Sin referencia no se inventa ningún ahorro.
- [ ] Las capturas de climatización/oficinas se usan solo como referencia estructural.
- [ ] Los estilos clásicos de Home Assistant no se copian.
- [ ] Se reutilizan los componentes premium existentes de Witmind.
- [ ] La interfaz es responsive.
- [ ] La navegación mantiene coherencia mediante click y swipe cuando este último exista.

---

# 21. ERRORES QUE DEBEN CORREGIRSE AUTOMÁTICAMENTE

Si la implementación incurre en cualquiera de estos errores, debe volver a este documento y rectificar:

### Error: crear cuatro tabs/rutas independientes

Corrección:

```text
convertirlas en cuatro views del mismo SlidingViewport
```

### Error: usar una entidad de energía acumulativa directamente como consumo horario

Corrección:

```text
calcular delta entre inicio y fin de cada hora
```

### Error: mostrar `unavailable` como `0`

Corrección:

```text
mostrar estado no disponible
```

### Error: inventar temperatura/humedad

Corrección:

```text
eliminar el dato hasta disponer de entidades reales
```

### Error: crear CSS nuevo imitando Home Assistant

Corrección:

```text
usar el sistema premium existente de Witmind
```

### Error: separar selector y slider en dos estados

Corrección:

```text
unificar ambos bajo activeView
```

### Error: navegar a otra URL al cambiar de sección

Corrección:

```text
cambiar solo activeView dentro del mismo módulo
```

### Error: sumar estados históricos de energía

Corrección:

```text
usar diferencias del contador acumulativo
```

---

# 22. PROTOCOLO DE AUTOCORRECCIÓN PARA LA IA

Antes de entregar cualquier implementación, la IA debe hacer esta revisión:

```text
1. Volver a leer este PLAN MAESTRO.
2. Comparar el código contra la sección "REGLAS ABSOLUTAS".
3. Verificar la matriz de fuentes.
4. Verificar que no existen datos inventados.
5. Verificar que la navegación usa una sola vista y activeView.
6. Verificar que los contadores acumulativos usan deltas.
7. Verificar que la capa visual usa Witmind Premium.
8. Ejecutar mentalmente los criterios de aceptación.
9. Corregir cualquier punto incumplido.
10. Solo entonces considerar terminada la tarea.
```

Si existe una contradicción entre:

```text
una decisión tomada durante la implementación
```

y:

```text
este archivo
```

debe prevalecer este archivo.

---

# 23. REGLA FINAL

La implementación debe conservar este principio:

> **Una sola experiencia Witmind Premium, múltiples vistas internas deslizables, ocho entidades eléctricas reales como fuente de verdad y cero datos inventados.**

Las capturas originales de Home Assistant sirven para descubrir **qué información hay que portar**.

Las capturas de Witmind Premium definen **cómo debe integrarse esa información en la experiencia final**.

No confundir ambos papeles.
