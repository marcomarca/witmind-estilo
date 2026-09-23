import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const RESOLUTIONS = [
  { name: "res-1-849x978", width: 849, height: 978, narrow: false },
  { name: "res-2-366x794", width: 366, height: 794, narrow: true },
  { name: "res-3-desktop-1440x900", width: 1440, height: 900, narrow: false },
  { name: "res-4-desktop-ha-1200x900", width: 1200, height: 900, narrow: false },
  { name: "res-5-tablet-1024x768", width: 1024, height: 768, narrow: false },
  { name: "res-6-mobile-390x844", width: 390, height: 844, narrow: true },
];

const MOCK_HASS_STATES = {
  "switch.interruptor_inteligente_switch_1": { entity_id: "switch.interruptor_inteligente_switch_1", state: "on", attributes: { friendly_name: "Spots ventana" } },
  "switch.interruptor_inteligente_switch_2": { entity_id: "switch.interruptor_inteligente_switch_2", state: "on", attributes: { friendly_name: "Spots 2x3" } },
  "switch.interruptor_inteligente_switch_3": { entity_id: "switch.interruptor_inteligente_switch_3", state: "off", attributes: { friendly_name: "Spots 3x3" } },
  "switch.interruptor_inteligente_switch_4": { entity_id: "switch.interruptor_inteligente_switch_4", state: "off", attributes: { friendly_name: "Spots TV" } },
  "sensor.showroom_potencia_activa": { entity_id: "sensor.showroom_potencia_activa", state: "1155", attributes: { unit_of_measurement: "W" } },
  "sensor.t_h_sensor_temperature": { entity_id: "sensor.t_h_sensor_temperature", state: "31.3", attributes: { unit_of_measurement: "°C" } },
  "sensor.t_h_sensor_humidity": { entity_id: "sensor.t_h_sensor_humidity", state: "27", attributes: { unit_of_measurement: "%" } },
  "sensor.sensor_de_potencia_showroom_p": { entity_id: "sensor.sensor_de_potencia_showroom_p", state: "0", attributes: { unit_of_measurement: "W" } },
  "switch.oficina_mindtec_interruptor_1": { entity_id: "switch.oficina_mindtec_interruptor_1", state: "on", attributes: { friendly_name: "Mindtec" } },
  "switch.oficina_gerencial_interruptor_1": { entity_id: "switch.oficina_gerencial_interruptor_1", state: "off", attributes: { friendly_name: "Witronix" } },
  "switch.taller_interruptor_1": { entity_id: "switch.taller_interruptor_1", state: "on", attributes: { friendly_name: "Taller" } },
  "switch.b2_gang_interruptor_1": { entity_id: "switch.b2_gang_interruptor_1", state: "on", attributes: { friendly_name: "Sala multiuso" } },
  "sensor.t_h_sensor_2_temperature": { entity_id: "sensor.t_h_sensor_2_temperature", state: "22.5", attributes: { unit_of_measurement: "°C" } },
  "sensor.t_h_sensor_2_humidity": { entity_id: "sensor.t_h_sensor_2_humidity", state: "45", attributes: { unit_of_measurement: "%" } },
  "weather.forecast_casa": { entity_id: "weather.forecast_casa", state: "sunny", attributes: { temperature: 20.9 } },
};

async function testAll() {
  const browser = await chromium.launch({ headless: true });
  const shotDir = path.resolve("artifacts/test-resolutions");
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

  let allPassed = true;

  for (const floor of [
    { id: "ground", label: "Planta Baja", expectedAspect: 1.5000 },
    { id: "upper", label: "Planta Alta", expectedAspect: 1448 / 1086 },
  ]) {
    console.log(`\n======================================================`);
    console.log(`TESTING FLOOR: ${floor.label} (Expected Aspect: ${floor.expectedAspect.toFixed(4)})`);
    console.log(`======================================================`);

    for (const res of RESOLUTIONS) {
      const page = await browser.newPage({
        viewport: { width: res.width, height: res.height },
        isMobile: res.narrow,
        hasTouch: res.narrow,
        deviceScaleFactor: 1,
      });

      await page.goto("http://127.0.0.1:5174/witmind-ui.html?test=1", { waitUntil: "networkidle" });

      await page.evaluate(({ narrow }) => {
        localStorage.clear();
        window.postMessage({
          protocol: 1,
          source: "witmind-ha",
          type: "WITMIND_INIT",
          panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
          narrow,
          theme: "dark",
          user: { is_admin: true, name: "QA" },
        }, "*");
      }, { narrow: res.narrow });

      await page.waitForTimeout(300);

      const app = page.locator("witmind-ui-app");
      await app.waitFor();

      const panel = app.locator("witmind-workspace").locator("witmind-building-panel");
      await panel.evaluate((el, { states, floorId }) => {
        el.hass = { states };
        el._setFloor(floorId);
      }, { states: MOCK_HASS_STATES, floorId: floor.id });
      await page.waitForTimeout(300);

      const metrics = await panel.evaluate((el) => {
        const root = el.shadowRoot;
        const stage = root?.querySelector(".floor-stage");
        const sRect = stage?.getBoundingClientRect();
        const img = root?.querySelector(".floor-picture img");
        const iRect = img?.getBoundingClientRect();
        const vRect = root?.querySelector(".floor-viewport")?.getBoundingClientRect();
        const overlays = Array.from(root?.querySelectorAll(".zone-overlay") || []);

        return {
          viewport: { width: Math.round(vRect?.width || 0), height: Math.round(vRect?.height || 0) },
          stage: { width: Math.round(sRect?.width || 0), height: Math.round(sRect?.height || 0) },
          img: { width: Math.round(iRect?.width || 0), height: Math.round(iRect?.height || 0) },
          aspectRatio: sRect && sRect.height > 0 ? (sRect.width / sRect.height).toFixed(4) : null,
          imgVisibleInViewport: sRect && vRect ? (
            sRect.left >= vRect.left - 1 &&
            sRect.right <= vRect.right + 1 &&
            sRect.top >= vRect.top - 1 &&
            sRect.bottom <= vRect.bottom + 1
          ) : false,
          imgMatchesStage: sRect && iRect ? (
            Math.abs(sRect.width - iRect.width) < 2 &&
            Math.abs(sRect.height - iRect.height) < 2
          ) : false,
          overlays: overlays.map((o) => {
            const oRect = o.getBoundingClientRect();
            return {
              name: o.querySelector("strong")?.textContent?.trim(),
              relLeft: Math.round(((oRect.left - sRect.left) / sRect.width) * 100),
              relTop: Math.round(((oRect.top - sRect.top) / sRect.height) * 100),
            };
          }),
        };
      });

      const isARCorrect = metrics.aspectRatio && Math.abs(parseFloat(metrics.aspectRatio) - floor.expectedAspect) < 0.01;
      const isOk = isARCorrect && metrics.imgVisibleInViewport && metrics.imgMatchesStage;
      if (!isOk) allPassed = false;

      console.log(`Res ${res.name.padEnd(20)} | VP: ${String(metrics.viewport.width).padStart(4)}x${String(metrics.viewport.height).padEnd(4)} | Stage: ${String(metrics.stage.width).padStart(4)}x${String(metrics.stage.height).padEnd(4)} (AR: ${metrics.aspectRatio}, exp: ${floor.expectedAspect.toFixed(4)}) | Fits: ${metrics.imgVisibleInViewport} | Match: ${metrics.imgMatchesStage} | Overlays: ${metrics.overlays.length}`);

      const card = panel.locator(".floor-card");
      if (await card.count() > 0) {
        await card.screenshot({ path: path.join(shotDir, `${floor.id}-${res.name}-floor-card.png`) });
      }

      await page.close();
    }
  }

  await browser.close();
  if (!allPassed) {
    console.error("\n❌ Some resolutions failed verification.");
    process.exit(1);
  } else {
    console.log("\n✅ ALL floors & resolutions passed 100% verification with zero cropping!");
  }
}

testAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
