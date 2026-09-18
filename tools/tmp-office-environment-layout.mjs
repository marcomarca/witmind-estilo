import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 758, height: 829 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:5174/witmind-ui.html", { waitUntil: "networkidle" });
await page.evaluate(() => {
  window.postMessage({
    protocol: 1,
    source: "witmind-ha",
    type: "WITMIND_INIT",
    panelConfig: { panel_id: "offices", panel_kind: "offices" },
    theme: "dark",
    user: { is_admin: true, name: "QA" },
  }, "*");
});
await page.waitForTimeout(250);
await page.evaluate(() => {
  const app = document.querySelector("witmind-ui-app");
  const workspace = app?.shadowRoot?.querySelector("witmind-workspace");
  const operations = workspace?.shadowRoot?.querySelector('section[data-panel-id="offices"] witmind-operations-panel');
  if (!operations) throw new Error("No se encontró el panel de oficinas");
  const entity = (entity_id, state) => ({ entity_id, state, attributes: {}, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() });
  operations.hass = {
    states: {
      "sensor.t_h_sensor_temperature": entity("sensor.t_h_sensor_temperature", "22.0"),
      "sensor.t_h_sensor_humidity": entity("sensor.t_h_sensor_humidity", "40.0"),
      "sensor.t_h_sensor_2_temperature": entity("sensor.t_h_sensor_2_temperature", "21.7"),
      "sensor.t_h_sensor_2_humidity": entity("sensor.t_h_sensor_2_humidity", "44.0"),
      "weather.forecast_casa": { ...entity("weather.forecast_casa", "clear-night"), attributes: { temperature: 10.4 } },
    },
    callService: async () => {},
  };
  operations.panel = operations.panel;
});
await page.waitForTimeout(200);

const measurements = await page.evaluate(() => {
  const app = document.querySelector("witmind-ui-app");
  const workspace = app?.shadowRoot?.querySelector("witmind-workspace");
  const operations = workspace?.shadowRoot?.querySelector('section[data-panel-id="offices"] witmind-operations-panel');
  const cards = [...operations.shadowRoot.querySelectorAll(".office-section")];
  return cards.filter((card) => card.querySelector(".area-meta")?.children.length).map((card) => {
    const heading = card.querySelector(".section-heading").getBoundingClientRect();
    const meta = card.querySelector(".area-meta").getBoundingClientRect();
    const grid = card.querySelector(".device-grid").getBoundingClientRect();
    return {
      name: card.querySelector("h2")?.textContent,
      rightInset: Math.round(heading.right - meta.right),
      alignedInHeader: meta.top >= heading.top && meta.bottom <= heading.bottom + 1,
      separatedFromControls: meta.bottom <= grid.top,
    };
  });
});

if (measurements.length !== 2 || measurements.some((item) => item.rightInset !== 0 || !item.alignedInHeader || !item.separatedFromControls)) {
  throw new Error(`Composición ambiental inválida: ${JSON.stringify(measurements)}`);
}

await page.screenshot({ path: "artifacts/office-environment-layout-758-dark.png", fullPage: true });
console.log(JSON.stringify(measurements, null, 2));
await browser.close();
