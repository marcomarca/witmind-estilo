export type BuildingFloor = "ground" | "upper";

export type BuildingCircuit = {
  entity: string;
  label: string;
  watts?: number;
};

export type BuildingZone = {
  id: string;
  floor: BuildingFloor;
  label: string;
  circuits: BuildingCircuit[];
  temperature?: string;
  humidity?: string;
  power?: string;
  showInTable?: boolean;
  action?: {
    label: string;
    serviceEntity?: string;
    onEntities: string[];
    offEntities: string[];
  };
};

export type BuildingZoneOverlay = {
  zoneId: string;
  left: number;
  top: number;
  width?: number;
};

export const normalizePowerToWatts = (value: number, unit?: string) => {
  if (!Number.isFinite(value)) return null;
  const normalizedUnit = String(unit || "W").trim().toLowerCase();
  if (normalizedUnit === "kw") return value * 1_000;
  if (normalizedUnit === "mw") return value * 1_000_000;
  if (normalizedUnit === "w") return value;
  return null;
};

export const BUILDING_ENTITIES = {
  weather: "weather.forecast_casa",
  showroomPower: "sensor.showroom_potencia_activa",
  showroomEnergy: "sensor.showroom_energia_activa",
  lobbyPower: "sensor.sensor_de_potencia_showroom_p",
} as const;

export const BUILDING_ZONES: BuildingZone[] = [
  {
    id: "ground.showroom",
    floor: "ground",
    label: "Showroom",
    power: BUILDING_ENTITIES.showroomPower,
    circuits: [
      { entity: "switch.interruptor_inteligente_switch_1", label: "Spots ventana", watts: 100 },
      { entity: "switch.interruptor_inteligente_switch_2", label: "Spots 2x3", watts: 120 },
      { entity: "switch.interruptor_inteligente_switch_3", label: "Spots 3x3", watts: 180 },
      { entity: "switch.interruptor_inteligente_switch_4", label: "Spots TV", watts: 25 },
      { entity: "switch.interruptor_inteligente_2_switch_1", label: "Paneles 3k/6k", watts: 96 },
      { entity: "switch.interruptor_inteligente_2_switch_2", label: "Colgantes", watts: 10 },
      { entity: "switch.interruptor_inteligente_2_switch_3", label: "Slims", watts: 432 },
      { entity: "switch.interruptor_inteligente_2_switch_4", label: "Downlights", watts: 144 },
      { entity: "switch.smart_relay_switch_4_switch", label: "Paneles", watts: 288 },
      { entity: "switch.smart_relay_switch_3_switch", label: "Reflector exterior" },
    ],
    action: {
      label: "Modo reunión",
      serviceEntity: "scene.reunion",
      onEntities: [
        "switch.interruptor_inteligente_switch_1",
        "switch.interruptor_inteligente_switch_2",
      ],
      offEntities: [
        "switch.interruptor_inteligente_switch_3",
        "switch.interruptor_inteligente_switch_4",
        "switch.interruptor_inteligente_2_switch_1",
        "switch.interruptor_inteligente_2_switch_2",
        "switch.interruptor_inteligente_2_switch_3",
        "switch.interruptor_inteligente_2_switch_4",
        "switch.smart_relay_switch_4_switch",
        "switch.smart_relay_switch_3_switch",
      ],
    },
  },
  {
    id: "ground.witronix_admin",
    floor: "ground",
    label: "Witronix Admin",
    temperature: "sensor.t_h_sensor_temperature",
    humidity: "sensor.t_h_sensor_humidity",
    showInTable: false,
    circuits: [],
  },
  {
    id: "ground.lobby",
    floor: "ground",
    label: "Lobby",
    power: BUILDING_ENTITIES.lobbyPower,
    circuits: [
      { entity: "switch.interruptor_inteligente_3_switch_1", label: "Central colgante" },
      { entity: "switch.interruptor_inteligente_3_switch_2", label: "Spots decorativos" },
      { entity: "switch.interruptor_inteligente_3_switch_3", label: "Tira LED" },
      { entity: "switch.interruptor_inteligente_3_switch_4", label: "Spots principales" },
    ],
    action: {
      label: "Modo invitados",
      onEntities: [
        "switch.interruptor_inteligente_3_switch_1",
        "switch.interruptor_inteligente_3_switch_2",
        "switch.interruptor_inteligente_3_switch_3",
        "switch.interruptor_inteligente_3_switch_4",
      ],
      offEntities: [],
    },
  },
  {
    id: "ground.grabacion",
    floor: "ground",
    label: "Grabación",
    circuits: [
      { entity: "switch.4gang_switch_sala_grabacion_interruptor_1", label: "Tira LED", watts: 24 },
      { entity: "switch.4gang_switch_sala_grabacion_interruptor_2", label: "Paneles", watts: 96 },
      { entity: "switch.4gang_switch_sala_grabacion_interruptor_3", label: "Spots", watts: 50 },
      { entity: "switch.4gang_switch_sala_grabacion_interruptor_4", label: "Otras luces", watts: 30 },
    ],
    action: {
      label: "Iluminación completa",
      onEntities: [
        "switch.4gang_switch_sala_grabacion_interruptor_1",
        "switch.4gang_switch_sala_grabacion_interruptor_2",
        "switch.4gang_switch_sala_grabacion_interruptor_3",
        "switch.4gang_switch_sala_grabacion_interruptor_4",
      ],
      offEntities: [],
    },
  },
  {
    id: "upper.witronix",
    floor: "upper",
    label: "Witronix",
    circuits: [{ entity: "switch.oficina_gerencial_interruptor_1", label: "Witronix LED", watts: 48 }],
  },
  {
    id: "upper.mindtec",
    floor: "upper",
    label: "Mindtec",
    circuits: [{ entity: "switch.oficina_mindtec_interruptor_1", label: "Iluminación Mindtec", watts: 48 }],
  },
  {
    id: "upper.office_large",
    floor: "upper",
    label: "Oficina grande",
    temperature: "sensor.t_h_sensor_2_temperature",
    humidity: "sensor.t_h_sensor_2_humidity",
    circuits: [
      { entity: "switch.oficina_grande_interruptor_1", label: "Oficina grande 1", watts: 168 },
      { entity: "switch.oficina_grande_interruptor_2", label: "Oficina grande 2", watts: 168 },
    ],
  },
  {
    id: "upper.sala_multiuso",
    floor: "upper",
    label: "Sala multiuso",
    circuits: [
      { entity: "switch.b2_gang_interruptor_1", label: "Multifuncional", watts: 96 },
      { entity: "switch.b2_gang_interruptor_2", label: "Pasillos", watts: 117 },
    ],
  },
  {
    id: "upper.taller",
    floor: "upper",
    label: "Taller",
    circuits: [{ entity: "switch.taller_interruptor_1", label: "Iluminación Taller", watts: 144 }],
  },
];

export const BUILDING_ZONE_OVERLAYS: Record<BuildingFloor, BuildingZoneOverlay[]> = {
  ground: [
    { zoneId: "ground.witronix_admin", left: 8, top: 12, width: 22 },
    { zoneId: "ground.showroom", left: 8, top: 54, width: 23 },
    { zoneId: "ground.lobby", left: 39, top: 48, width: 22 },
    { zoneId: "ground.grabacion", left: 67, top: 57, width: 22 },
  ],
  upper: [
    { zoneId: "upper.office_large", left: 8, top: 22, width: 25 },
    { zoneId: "upper.witronix", left: 8, top: 55, width: 20 },
    { zoneId: "upper.mindtec", left: 8, top: 9, width: 20 },
    { zoneId: "upper.sala_multiuso", left: 37, top: 58, width: 23 },
    { zoneId: "upper.taller", left: 48, top: 16, width: 18 },
  ],
};

export const BUILDING_ENTITY_IDS = [...new Set([
  BUILDING_ENTITIES.weather,
  BUILDING_ENTITIES.showroomPower,
  BUILDING_ENTITIES.showroomEnergy,
  ...BUILDING_ZONES.flatMap((zone) => [
    zone.temperature,
    zone.humidity,
    zone.power,
    zone.action?.serviceEntity,
    ...(zone.action?.onEntities || []),
    ...(zone.action?.offEntities || []),
    ...zone.circuits.map((circuit) => circuit.entity),
  ]),
].filter((value): value is string => Boolean(value)))];
