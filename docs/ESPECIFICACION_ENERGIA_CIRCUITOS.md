# Especificación Técnica de Energía y Circuitos (Witmind)

Este documento contiene la verdad técnica de la instalación eléctrica, potencias nominales en Watts por zona/circuito y el modelo de cálculo de energía y dimerización implementado en Home Assistant.

---

## 1. Inventario de Potencias Nominales de la Instalación

| Zona | Circuitos | Potencia Total Documentada | Detalle por Circuito |
|---|:---:|:---:|---|
| **Showroom** | 10 | **1.395 W** | • Spots ventana, 2x3, 3x3, TV: 4 circuitos<br>• Paneles 3k/6k, Colgantes, Slims, Downlights, Relé Paneles: 5 circuitos (~1.395 W total conocido)<br>• Reflector exterior: pendiente de medición (no inventar valor) |
| **Oficinas** | 7 | **789 W** | • `switch.oficina_gerencial_interruptor_1`: 48 W (4×12 W nominal)<br>• `switch.oficina_mindtec_interruptor_1`: 48 W (1×48 W nominal)<br>• `switch.oficina_grande_interruptor_1`: 168 W (4×42 W nominal)<br>• `switch.oficina_grande_interruptor_2`: 168 W (4×42 W nominal)<br>• `switch.b2_gang_interruptor_1`: 96 W (4×24 W nominal Multifuncional)<br>• `switch.b2_gang_interruptor_2`: 117 W (3×24 W + 3×15 W nominal Pasillos)<br>• `switch.taller_interruptor_1`: 144 W (3×48 W nominal Taller) |
| **Sala de grabación** | 4 | **200 W** | • Tira LED: 24 W<br>• Paneles: 96 W<br>• Spots: 50 W<br>• Otras luces: 30 W |
| **Lobby** | 4 | *Pendiente* | • Central Colgante, Spots 5W, Tira LED, Spots 10W (Aparecen en tiempo de uso, pero consumo en kWh no inventa potencias ficticias) |
| **Edificio Total** | **25** | **2.384 W** | **20 circuitos con potencia conocida documentada** |

---

## 2. Modelo de Cálculo Energético

1. **Tiempo de Uso**:
   - Se consulta a Home Assistant el historial de estados de los 25 switches (`history/history_during_period`).
   - Se procesan intervalos donde el estado fue `"on"` para calcular horas acumuladas por circuito en el período (24h, 7 días, 30 días).

2. **Consumo Estimado (kWh)**:
   - Para circuitos con potencia conocida:
     $$\text{kWh} = \frac{\text{Potencia (Watts)} \times \text{Horas de uso}}{1000}$$
   - Los circuitos sin potencia documentada (Lobby, Reflector) se contabilizan en tiempo de uso, pero **se excluyen del acumulado de kWh** para no falsear los datos.

3. **Modelo de Ahorro por Dimerización (10% a 90%)**:
   - Simulación lineal basada en potencia instalada:
     $$\text{Ahorro (kWh)} = \text{Consumo Base} \times \frac{\text{Porcentaje}}{100}$$
     $$\text{Consumo Restante (kWh)} = \text{Consumo Base} - \text{Ahorro}$$
   - Representa un escenario teórico de optimización energética documentado.
