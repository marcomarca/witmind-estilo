#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDING_ENTITIES, BUILDING_ZONES, normalizePowerToWatts } from "../src/building-config.ts";

const HA_STORAGE_DIR = "\\\\192.168.20.232\\config\\.storage";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const ORANGE = "\x1b[38;5;208m";

function loadStorageJson(filename) {
  const filePath = path.join(HA_STORAGE_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function run() {
  console.log(`${BOLD}${ORANGE}================================================================${RESET}`);
  console.log(`${BOLD}${ORANGE} WITMIND CONTROL DE EDIFICIO — TELEMETRÍA DE SENSORES EN VIVO ${RESET}`);
  console.log(`${BOLD}${ORANGE}================================================================${RESET}\n`);

  const restoreState = loadStorageJson("core.restore_state");
  const entityRegistry = loadStorageJson("core.entity_registry");

  if (!restoreState && !entityRegistry) {
    console.error(`${RED}[ERROR] No se pudo conectar a Home Assistant en ${HA_STORAGE_DIR}${RESET}`);
    console.error(`Verifica que la red o el recurso compartido Samba \\\\192.168.20.232\\config esté accesible.`);
    process.exit(1);
  }

  const registeredEntities = new Map();
  if (entityRegistry?.data?.entities) {
    for (const ent of entityRegistry.data.entities) {
      registeredEntities.set(ent.entity_id, ent);
    }
  }

  const liveStates = new Map();
  if (restoreState?.data) {
    for (const item of restoreState.data) {
      if (item?.state?.entity_id) {
        liveStates.set(item.state.entity_id, item.state);
      }
    }
  }

  function getEntityStatus(entityId) {
    if (!entityId) return { state: "N/A", formatted: "—", status: "none", unit: "" };
    const live = liveStates.get(entityId);
    const reg = registeredEntities.get(entityId);

    if (!live && !reg) {
      return { state: "NOT_FOUND", formatted: `${RED}No registrado en HA${RESET}`, status: "error" };
    }

    if (!live) {
      return { state: "NO_RESTORE", formatted: `${YELLOW}Registrado (sin estado reciente)${RESET}`, status: "warn", name: reg.original_name || reg.name };
    }

    const stateVal = live.state;
    const unit = live.attributes?.unit_of_measurement || "";
    const name = live.attributes?.friendly_name || reg?.original_name || entityId;

    let color = GREEN;
    if (stateVal === "off") color = DIM;
    else if (stateVal === "unavailable" || stateVal === "unknown") color = RED;
    else if (stateVal === "on") color = `${BOLD}${GREEN}`;

    return {
      state: stateVal,
      unit,
      name,
      formatted: `${color}${stateVal}${unit ? ` ${unit}` : ""}${RESET}`,
      status: (stateVal === "unavailable" || stateVal === "unknown") ? "error" : "ok",
      attributes: live.attributes,
    };
  }

  // 1. General Building Entities
  console.log(`${BOLD}${CYAN}--- CONDICIONES GENERALES DEL EDIFICIO ---${RESET}`);
  const weather = getEntityStatus(BUILDING_ENTITIES.weather);
  const showroomPower = getEntityStatus(BUILDING_ENTITIES.showroomPower);
  const showroomEnergy = getEntityStatus(BUILDING_ENTITIES.showroomEnergy);

  console.log(`  Clima Exterior   [${BUILDING_ENTITIES.weather}]: ${weather.formatted}`);
  console.log(`  Potencia General [${BUILDING_ENTITIES.showroomPower}]: ${showroomPower.formatted}`);
  console.log(`  Energía Total    [${BUILDING_ENTITIES.showroomEnergy}]: ${showroomEnergy.formatted}\n`);

  // 2. Zones by floor
  const floors = [
    { id: "ground", label: "PLANTA BAJA (Showroom)" },
    { id: "upper", label: "PLANTA ALTA (Taller)" },
  ];

  let totalAvailableCircuits = 0;
  let totalCircuits = 0;
  let totalActiveCircuits = 0;
  let totalNominalWatts = 0;

  for (const floor of floors) {
    console.log(`${BOLD}${ORANGE}====================================================${RESET}`);
    console.log(`${BOLD}${ORANGE} ${floor.label} ${RESET}`);
    console.log(`${BOLD}${ORANGE}====================================================${RESET}`);

    const zones = BUILDING_ZONES.filter((z) => z.floor === floor.id);

    for (const zone of zones) {
      console.log(`\n  ${BOLD}Zona: ${zone.label}${RESET} ${DIM}(id: ${zone.id})${RESET}`);

      // Environmental
      if (zone.temperature || zone.humidity) {
        const temp = getEntityStatus(zone.temperature);
        const hum = getEntityStatus(zone.humidity);
        console.log(`    Ambiente: Temp = ${temp.formatted} | Humedad = ${hum.formatted}`);
      }

      // Measured power
      if (zone.power) {
        const pwr = getEntityStatus(zone.power);
        console.log(`    Potencia Medida: ${pwr.formatted} ${DIM}(${zone.power})${RESET}`);
      }

      // Circuits
      if (zone.circuits?.length) {
        console.log(`    Circuitos (${zone.circuits.length}):`);
        for (const circuit of zone.circuits) {
          totalCircuits++;
          const cStatus = getEntityStatus(circuit.entity);
          if (cStatus.status !== "error") totalAvailableCircuits++;
          if (cStatus.state === "on") totalActiveCircuits++;
          if (circuit.watts) totalNominalWatts += circuit.watts;

          const wattsText = circuit.watts ? `${circuit.watts} W nominal` : "sin potencia nominal";
          console.log(`      * ${circuit.label.padEnd(24)} -> ${cStatus.formatted.padEnd(20)} [${DIM}${circuit.entity}${RESET}] (${wattsText})`);
        }
      }

      // Profile action
      if (zone.action) {
        console.log(`    Perfil Rápido: "${zone.action.label}" (${zone.action.onEntities?.length || 0} ON, ${zone.action.offEntities?.length || 0} OFF)`);
      }
    }
    console.log("");
  }

  // Summary
  console.log(`${BOLD}${CYAN}====================================================${RESET}`);
  console.log(`${BOLD}${CYAN} RESUMEN DE SALUD DE ENTIDADES ${RESET}`);
  console.log(`${BOLD}${CYAN}====================================================${RESET}`);
  console.log(`  Circuitos Totales Mapeados : ${totalCircuits}`);
  console.log(`  Circuitos Disponibles en HA: ${GREEN}${totalAvailableCircuits}${RESET} / ${totalCircuits}`);
  console.log(`  Circuitos Actualmente en ON: ${BOLD}${GREEN}${totalActiveCircuits}${RESET}`);
  console.log(`  Carga Nominal Total Conectada: ${YELLOW}${totalNominalWatts} W${RESET}`);
  console.log(`${DIM}Ejecuta este comando en cualquier momento para comprobar el estado real.${RESET}\n`);
}

run();
