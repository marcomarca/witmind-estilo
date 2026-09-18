import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => {
  document.body.style.margin = "0";
  document.body.innerHTML = '<iframe id="panel" src="/witmind-ui.html?building-live-test=1" style="display:block;width:1440px;height:900px;border:0"></iframe>';
});
const frame = page.frameLocator("#panel");
await frame.locator("witmind-ui-app").waitFor();
await page.evaluate(() => document.querySelector("#panel")?.contentWindow?.postMessage({
  protocol: 1,
  source: "witmind-ha",
  type: "WITMIND_INIT",
  panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
  narrow: false,
  theme: "dark",
  user: { is_admin: true, name: "QA" },
}, "*"));

const panel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
await panel.waitFor();
await panel.evaluate((element) => {
  const state = (entity_id, value, unit, name) => ({ entity_id, state: String(value), attributes: { unit_of_measurement: unit, friendly_name: name } });
  const on = (entity_id) => state(entity_id, "on", undefined, entity_id);
  const off = (entity_id) => state(entity_id, "off", undefined, entity_id);
  const showroom = [
    "switch.interruptor_inteligente_switch_1", "switch.interruptor_inteligente_switch_2",
    "switch.interruptor_inteligente_switch_3", "switch.interruptor_inteligente_switch_4",
    "switch.interruptor_inteligente_2_switch_1", "switch.interruptor_inteligente_2_switch_2",
    "switch.interruptor_inteligente_2_switch_3", "switch.interruptor_inteligente_2_switch_4",
    "switch.smart_relay_switch_4_switch", "switch.smart_relay_switch_3_switch",
  ];
  const lobby = [1, 2, 3, 4].map((index) => `switch.interruptor_inteligente_3_switch_${index}`);
  const recording = [1, 2, 3, 4].map((index) => `switch.4gang_switch_sala_grabacion_interruptor_${index}`);
  const upper = [
    "switch.oficina_gerencial_interruptor_1", "switch.oficina_mindtec_interruptor_1",
    "switch.oficina_grande_interruptor_1", "switch.oficina_grande_interruptor_2",
    "switch.b2_gang_interruptor_1", "switch.b2_gang_interruptor_2", "switch.taller_interruptor_1",
  ];
  const states = Object.fromEntries([
    ...showroom.map((entity, index) => [entity, index < 2 ? on(entity) : off(entity)]),
    ...lobby.map((entity, index) => [entity, index < 2 ? on(entity) : off(entity)]),
    ...recording.map((entity, index) => [entity, index === 0 ? on(entity) : off(entity)]),
    ...upper.map((entity, index) => [entity, index % 2 ? off(entity) : on(entity)]),
    ["scene.reunion", state("scene.reunion", "2026-09-18T00:00:00+00:00")],
    ["sensor.showroom_potencia_activa", state("sensor.showroom_potencia_activa", 1.0817, "kW", "Showroom Potencia Activa")],
    ["sensor.sensor_de_potencia_showroom_p", state("sensor.sensor_de_potencia_showroom_p", 82, "W", "Sensor de Potencia Lobby P")],
    ["sensor.t_h_sensor_temperature", state("sensor.t_h_sensor_temperature", 24.1, "°C")],
    ["sensor.t_h_sensor_humidity", state("sensor.t_h_sensor_humidity", 41, "%")],
    ["sensor.t_h_sensor_2_temperature", state("sensor.t_h_sensor_2_temperature", 23.2, "°C")],
    ["sensor.t_h_sensor_2_humidity", state("sensor.t_h_sensor_2_humidity", 37, "%")],
    ["weather.forecast_casa", { entity_id: "weather.forecast_casa", state: "sunny", attributes: { temperature: 14.5 } }],
  ]);
  window.__buildingCalls = [];
  element.hass = {
    states,
    callService: async (domain, service, data) => { window.__buildingCalls.push({ domain, service, data }); },
  };
});
await page.waitForTimeout(250);

const groundText = await panel.locator(".floor-overlays").innerText();
const groundTable = await panel.locator(".circuit-table").innerText();
if (!groundText.includes("Witronix Admin") || !groundText.includes("24,1 °C") || !groundText.includes("41 %")) throw new Error(`ground climate: ${groundText}`);
if (!groundText.includes("1.082 W") || !groundText.includes("82 W")) throw new Error(`ground measured power: ${groundText}`);
if (!groundTable.includes("Showroom") || !groundTable.includes("Lobby") || !groundTable.includes("Grabación")) throw new Error(`ground table: ${groundTable}`);

await panel.locator(".floor-selector button").nth(1).click();
await page.waitForTimeout(180);
const upperText = await panel.locator(".floor-overlays").innerText();
if (!upperText.includes("Oficina grande") || !upperText.includes("23,2 °C") || !upperText.includes("37 %")) throw new Error(`upper climate: ${upperText}`);
if (upperText.includes("Witronix Admin") || upperText.includes("1.082 W")) throw new Error(`mixed floors: ${upperText}`);

await page.screenshot({ path: "artifacts/building-control-live-overlays.png", fullPage: true });
await panel.locator(".floor-selector button").nth(0).click();
await panel.evaluate((element) => {
  element.hass.states["switch.interruptor_inteligente_switch_2"].state = "off";
  window.__buildingCalls = [];
  element.requestUpdate();
});
await page.waitForTimeout(100);
await panel.locator(".circuit-row .toggle").nth(0).click();
await panel.locator(".circuit-row .toggle").nth(1).click();
await panel.locator(".circuit-row .toggle").nth(2).click();
const calls = await panel.evaluate(() => window.__buildingCalls);
if (calls[0]?.domain !== "scene" || calls[0]?.data?.entity_id !== "scene.reunion") throw new Error(`meeting scene: ${JSON.stringify(calls)}`);
if (calls[1]?.service !== "turn_off" || calls[1]?.data?.entity_id?.length !== 8) throw new Error(`meeting off profile: ${JSON.stringify(calls)}`);
if (calls[2]?.service !== "turn_on" || calls[2]?.data?.entity_id?.length !== 2) throw new Error(`meeting on profile: ${JSON.stringify(calls)}`);
if (calls[3]?.service !== "turn_on" || calls[3]?.data?.entity_id?.length !== 4) throw new Error(`lobby invite profile: ${JSON.stringify(calls)}`);
if (calls[4]?.service !== "turn_on" || calls[4]?.data?.entity_id?.length !== 4) throw new Error(`recording profile: ${JSON.stringify(calls)}`);
console.log(JSON.stringify({ groundText, upperText, calls }));
await browser.close();
