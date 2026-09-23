import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const MOCK_HASS_STATES = {
  "switch.oficina_gerencial_interruptor_1": { entity_id: "switch.oficina_gerencial_interruptor_1", state: "on", attributes: { friendly_name: "Witronix LED" } },
  "switch.oficina_mindtec_interruptor_1": { entity_id: "switch.oficina_mindtec_interruptor_1", state: "off", attributes: { friendly_name: "Mindtec" } },
  "sensor.t_h_sensor_2_temperature": { entity_id: "sensor.t_h_sensor_2_temperature", state: "24.5", attributes: { unit_of_measurement: "°C" } },
  "sensor.t_h_sensor_2_humidity": { entity_id: "sensor.t_h_sensor_2_humidity", state: "45", attributes: { unit_of_measurement: "%" } },
  "switch.oficina_grande_interruptor_1": { entity_id: "switch.oficina_grande_interruptor_1", state: "on", attributes: { friendly_name: "Oficina Grande 1" } },
  "switch.oficina_grande_interruptor_2": { entity_id: "switch.oficina_grande_interruptor_2", state: "off", attributes: { friendly_name: "Oficina Grande 2" } },
  "switch.b2_gang_interruptor_1": { entity_id: "switch.b2_gang_interruptor_1", state: "on", attributes: { friendly_name: "Multifuncional" } },
  "switch.b2_gang_interruptor_2": { entity_id: "switch.b2_gang_interruptor_2", state: "off", attributes: { friendly_name: "Pasillos" } },
  "switch.taller_interruptor_1": { entity_id: "switch.taller_interruptor_1", state: "off", attributes: { friendly_name: "Taller" } },
  "weather.forecast_casa": { entity_id: "weather.forecast_casa", state: "sunny", attributes: { temperature: 21 } },
};

async function run() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "desktop", width: 1440, height: 900, narrow: false },
    { name: "mobile", width: 390, height: 844, narrow: true },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.narrow,
      hasTouch: vp.narrow,
      deviceScaleFactor: 1,
    });
    await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
    await page.evaluate(({ width, height }) => {
      document.body.style.margin = "0";
      document.body.innerHTML = `<iframe id="panel" src="/witmind-ui.html?upper-test=1" style="display:block;width:${width}px;height:${height}px;border:0"></iframe>`;
    }, vp);

    const frame = page.frameLocator("#panel");
    await frame.locator("witmind-ui-app").waitFor();
    await page.evaluate(({ narrow }) => document.querySelector("#panel")?.contentWindow?.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_INIT",
      panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
      narrow,
      theme: "dark",
      user: { is_admin: true, name: "QA" },
    }, "*"), { narrow: vp.narrow });
    await page.waitForTimeout(300);

    const panel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
    
    // Inject mock hass and switch to upper floor
    await panel.evaluate((element, states) => {
      element.hass = { states };
    }, MOCK_HASS_STATES);
    
    // Click "Planta Alta" button
    const upperBtn = panel.locator(".floor-selector button:has-text('Planta Alta')");
    await upperBtn.click();
    await page.waitForTimeout(300);

    const shotDir = path.resolve("artifacts/debug-shots");
    if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });
    
    const cardHandle = await panel.locator(".floor-card");
    if (await cardHandle.count() > 0) {
      await cardHandle.screenshot({ path: path.join(shotDir, `${vp.name}-upper-floor.png`) });
    }

    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
