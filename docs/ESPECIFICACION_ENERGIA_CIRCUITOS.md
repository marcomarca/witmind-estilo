# Especificación Técnica de Energía y Circuitos (Witmind)

Este documento contiene la verdad técnica de la instalación eléctrica, potencias nominales en Watts por zona/circuito y el modelo de cálculo de energía y dimerización implementado tanto en Home Assistant (sensores template) como en la interfaz web de Witmind.

---

## 1. Inventario de Potencias Nominales de la Instalación

| Zona | Circuitos | Potencia Total Documentada | Detalle por Circuito |
|---|:---:|:---:|---|
| **Showroom** | 10 | **1.495 W** | • `switch.interruptor_inteligente_switch_1` (Spots ventana): **100 W**<br>• `switch.interruptor_inteligente_switch_2` (Spots 2x3): **120 W**<br>• `switch.interruptor_inteligente_switch_3` (Spots 3x3): **180 W**<br>• `switch.interruptor_inteligente_switch_4` (Spots TV): **25 W**<br>• `switch.interruptor_inteligente_2_switch_1` (Paneles 3k/6k): **96 W**<br>• `switch.interruptor_inteligente_2_switch_2` (Colgantes): **10 W**<br>• `switch.interruptor_inteligente_2_switch_3` (Slims): **432 W**<br>• `switch.interruptor_inteligente_2_switch_4` (Downlights): **144 W**<br>• `switch.smart_relay_switch_4_switch` (Paneles relé): **288 W**<br>• `switch.smart_relay_switch_3_switch` (Reflector exterior): **100 W** |
| **Lobby** | 4 | **513 W** | • `switch.interruptor_inteligente_3_switch_1` (Central Colgante): **100 W**<br>• `switch.interruptor_inteligente_3_switch_2` (Spots 5W Decorativos): **40 W** (8×5 W)<br>• `switch.interruptor_inteligente_3_switch_3` (Tira LED): **168 W** (12×14 W)<br>• `switch.interruptor_inteligente_3_switch_4` (Spots 10W): **205 W** (9×20 W + 5×5 W) |
| **Oficinas** | 7 | **837 W** | • `switch.oficina_gerencial_interruptor_1` (Witronix LED): **48 W**<br>• `switch.oficina_mindtec_interruptor_1` (Mindtec): **48 W**<br>• `switch.oficina_grande_interruptor_1` (Oficina general 1): **192 W** (4×48 W)<br>• `switch.oficina_grande_interruptor_2` (Oficina general 2): **192 W** (4×48 W)<br>• `switch.b2_gang_interruptor_1` (Multifuncional): **96 W** (4×24 W)<br>• `switch.b2_gang_interruptor_2` (Pasillo): **117 W** (3×24 W + 3×15 W)<br>• `switch.taller_interruptor_1` (Taller): **144 W** (3×48 W) |
| **Sala de grabación** | 4 | **203 W** | • `switch.4gang_switch_sala_grabacion_interruptor_1` (Tiras LED): **42 W** (3×14 W)<br>• `switch.4gang_switch_sala_grabacion_interruptor_2` (Paneles): **96 W** (2×48 W)<br>• `switch.4gang_switch_sala_grabacion_interruptor_3` (Tracklight): **45 W** (3×15 W)<br>• `switch.4gang_switch_sala_grabacion_interruptor_4` (Spots): **20 W** (4×5 W) |
| **Edificio Total** | **25** | **3.048 W** | **25 circuitos con potencia nominal verificada (100% de cobertura)** |

---

## 2. Comportamiento de Acciones por Zona

- **Showroom**: 
  - **Encendido (Acción)**: Activa `scene.reunion` (Spots ventana + Spots 2x3 en `on`, los 8 circuitos restantes en `off`).
  - **Apagado**: Ejecuta apagado completo de los 10 circuitos del Showroom.
- **Lobby**: 
  - **Encendido (Acción)**: Activa `scene.regular` (Spots 10W en `on`, los 3 circuitos restantes en `off`).
  - **Apagado**: Ejecuta apagado completo de los 4 circuitos del Lobby.
- **Demás Zonas (Oficinas, Taller, Grabación)**:
  - **Encendido**: Enciende el 100% de los circuitos de la subzona.
  - **Apagado**: Apaga el 100% de los circuitos de la subzona.

---

## 3. Integración Nativa en Home Assistant

Para no depender exclusivamente de la interfaz frontend, se definen sensores template nativos en Home Assistant:
- `sensor.<zona>_luminarias_encendidas`: Conteo real de switches en estado `on`.
- `sensor.<zona>_luminarias_apagadas`: Conteo real de switches en estado `off`.
- `sensor.<zona>_potencia_estimada`: Potencia instantánea calculada en Watts (`unit_of_measurement: W`, `device_class: power`).
- `sensor.witmind_total_*`: Acumulados globales para el edificio completo.

---

## 4. Modelo de Cálculo Energético

1. **Tiempo de Uso**:
   - Se consulta a Home Assistant el historial de estados de los 25 switches (`history/history_during_period`).
   - Se procesan intervalos donde el estado fue `"on"` para calcular horas acumuladas por circuito en el período (24h, 7 días, 30 días).

2. **Consumo Estimado (kWh)**:
   - Para todos los 25 circuitos con potencia nominal documentada:
     $$\text{kWh} = \frac{\text{Potencia (Watts)} \times \text{Horas de uso}}{1000}$$

3. **Modelo de Ahorro por Dimerización (10% a 90%)**:
   - Simulación lineal basada en potencia instalada:
     $$\text{Ahorro (kWh)} = \text{Consumo Base} \times \frac{\text{Porcentaje}}{100}$$
     $$\text{Consumo Restante (kWh)} = \text{Consumo Base} - \text{Ahorro}$$
