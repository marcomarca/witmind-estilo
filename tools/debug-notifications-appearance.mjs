import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { createServer } from "vite";

const OUTPUT_DIR = "C:\\Users\\witronix\\.gemini\\antigravity-ide\\brain\\8fc25e08-9262-467c-860b-226d939f94e7\\notifications_screenshots";
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Start Vite dev server for src/
const viteServer = await createServer({
  server: { port: 5195 },
});
await viteServer.listen();
console.log("Vite server running at http://localhost:5195");

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Users\\witronix\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const mockSensors = [
  {
    entity_id: "sensor.temperatura_rack",
    name: "Sensor Rack",
    display_name: "Sensor Rack Sistemas",
    area_name: "Sistemas",
    unit: "°C",
    value: 29.4,
    available: true,
    preferred: true,
  },
  {
    entity_id: "sensor.t_h_sensor_temperature",
    name: "Sensor Gerencia",
    display_name: "Oficina Gerencial",
    area_name: "Oficinas",
    unit: "°C",
    value: 23.4,
    available: true,
    preferred: true,
  },
  {
    entity_id: "sensor.t_h_sensor_2_temperature",
    name: "Sensor Taller",
    display_name: "Taller Witronix",
    area_name: "Producción",
    unit: "°C",
    value: 26.8,
    available: true,
    preferred: false,
  },
];

const mockTargets = [
  {
    key: "mobile_pixel_7",
    target_id: "phone_admin_1",
    name: "Pixel 7 Pro",
    ha_name: "Pixel 7 Pro",
    custom_name: "Celular Guardia",
    available: true,
    device_id: "dev_pixel_7",
    notify_entity_id: "notify.mobile_app_pixel_7",
    manufacturer: "Google",
    model: "Pixel 7 Pro",
    sw_version: "Android 14",
    area_name: "Recepción",
  },
  {
    key: "mobile_iphone_15",
    target_id: "phone_admin_2",
    name: "iPhone 15 Pro",
    ha_name: "iPhone 15 Pro",
    custom_name: "Gerencia General",
    available: true,
    device_id: "dev_iphone_15",
    notify_entity_id: "notify.mobile_app_iphone_15",
    manufacturer: "Apple",
    model: "iPhone 15,3",
    sw_version: "iOS 17.5.1",
    area_name: "Gerencia",
  },
  {
    key: "mobile_galaxy_tab",
    target_id: "phone_stale_3",
    name: "Galaxy Tab S8",
    ha_name: "Galaxy Tab S8",
    custom_name: "Tablet Sala Reuniones",
    available: false,
    device_id: "dev_tab_s8",
    notify_entity_id: "notify.mobile_app_galaxy_tab",
    manufacturer: "Samsung",
    model: "SM-X700",
    sw_version: "Android 13",
    area_name: "Showroom",
  },
];

const mockRules = [
  {
    id: "rule_server_rack",
    name: "Alerta Servidor Rack",
    enabled: true,
    source: {
      entity_id: "sensor.temperatura_rack",
      display_name: "Sensor Rack Sistemas",
      area_name: "Sistemas",
    },
    condition: {
      type: "above",
      threshold: 28.0,
      for_seconds: 300,
      hysteresis: 0.5,
    },
    recipients: [
      {
        target_id: "phone_admin_1",
        name: "Pixel 7 Pro",
        custom_name: "Celular Guardia",
        notify_entity_id: "notify.mobile_app_pixel_7",
      },
      {
        target_id: "phone_admin_2",
        name: "iPhone 15 Pro",
        custom_name: "Gerencia General",
        notify_entity_id: "notify.mobile_app_iphone_15",
      },
    ],
    message: {
      title: "Rack Crítico",
      body: "{sensor} alcanzó {value} {unit}.",
      recovery_title: "Rack Normalizado",
      recovery_body: "{sensor} descendió a {value} {unit}.",
    },
    behavior: {
      notification_mode: "repeat",
      reminder_interval_seconds: 1800,
      notify_recovery: true,
    },
    runtime: {
      active: true,
      pending: false,
      sending: false,
      next_reminder_at: new Date(Date.now() + 620000).toISOString(),
      retry_at: null,
      last_error: null,
      last_sent: new Date(Date.now() - 1180000).toISOString(),
    },
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "rule_taller_seguro",
    name: "Confort Térmico Taller",
    enabled: true,
    source: {
      entity_id: "sensor.t_h_sensor_2_temperature",
      display_name: "Taller Witronix",
      area_name: "Producción",
    },
    condition: {
      type: "outside",
      lower: 18.0,
      upper: 27.5,
      for_seconds: 600,
      hysteresis: 1.0,
    },
    recipients: [
      {
        target_id: "phone_admin_1",
        name: "Pixel 7 Pro",
        custom_name: "Celular Guardia",
        notify_entity_id: "notify.mobile_app_pixel_7",
      },
    ],
    message: {
      title: "Temperatura Fuera de Rango",
      body: "Área taller a {value} {unit}.",
    },
    behavior: {
      notification_mode: "single",
      reminder_interval_seconds: 0,
      notify_recovery: false,
    },
    runtime: {
      active: false,
      pending: false,
      sending: false,
      next_reminder_at: null,
      retry_at: null,
      last_error: null,
      last_sent: null,
    },
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-02-10T10:00:00Z",
  },
  {
    id: "rule_gerencia_nocturna",
    name: "Climatización Gerencia",
    enabled: false,
    source: {
      entity_id: "sensor.t_h_sensor_temperature",
      display_name: "Oficina Gerencial",
      area_name: "Oficinas",
    },
    condition: {
      type: "above",
      threshold: 26.0,
      for_seconds: 0,
      hysteresis: 0.5,
    },
    recipients: [
      {
        target_id: "phone_admin_2",
        name: "iPhone 15 Pro",
        custom_name: "Gerencia General",
        notify_entity_id: "notify.mobile_app_iphone_15",
      },
    ],
    message: {
      title: "Aviso Temperatura Gerencia",
      body: "Temperatura actual: {value} {unit}.",
    },
    behavior: {
      notification_mode: "single",
      reminder_interval_seconds: 0,
      notify_recovery: false,
    },
    runtime: {
      active: false,
      pending: false,
      sending: false,
      next_reminder_at: null,
      retry_at: null,
      last_error: null,
      last_sent: null,
    },
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-03-01T08:00:00Z",
  },
];

const mockHistory = [
  {
    timestamp: new Date(Date.now() - 300000).toISOString(),
    event_type: "alert",
    status: "sent",
    rule_id: "rule_server_rack",
    rule_name: "Alerta Servidor Rack",
    recipient: "Celular Guardia",
    value: 29.4,
    error: null,
  },
  {
    timestamp: new Date(Date.now() - 301000).toISOString(),
    event_type: "alert",
    status: "sent",
    rule_id: "rule_server_rack",
    rule_name: "Alerta Servidor Rack",
    recipient: "Gerencia General",
    value: 29.4,
    error: null,
  },
  {
    timestamp: new Date(Date.now() - 2100000).toISOString(),
    event_type: "reminder",
    status: "sent",
    rule_id: "rule_server_rack",
    rule_name: "Alerta Servidor Rack",
    recipient: "Celular Guardia",
    value: 28.9,
    error: null,
  },
  {
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    event_type: "recovery",
    status: "sent",
    rule_id: "rule_server_rack",
    rule_name: "Alerta Servidor Rack",
    recipient: "Celular Guardia",
    value: 27.2,
    error: null,
  },
  {
    timestamp: new Date(Date.now() - 90000000).toISOString(),
    event_type: "alert",
    status: "failed",
    rule_id: "rule_server_rack",
    rule_name: "Alerta Servidor Rack",
    recipient: "Tablet Sala Reuniones",
    value: 29.8,
    error: "Service notify.mobile_app_galaxy_tab not found or device unregistered",
  },
];

const results = {
  viewports: {},
  overflows: [],
  touchTargetViolations: [],
  screenshots: [],
};

async function inspectViewport(width, height, name, theme = "dark") {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto("http://localhost:5195/witmind-ui.html", { waitUntil: "domcontentloaded" });

  // Setup mock hass and mount component
  await page.evaluate(
    ({ mockSensors, mockTargets, mockRules, mockHistory, theme }) => {
      const mockHass = {
        user: { is_admin: true, name: "Witmind Admin" },
        states: {
          "sensor.temperatura_rack": { state: "29.4", attributes: { unit_of_measurement: "°C" } },
          "sensor.t_h_sensor_temperature": { state: "23.4", attributes: { unit_of_measurement: "°C" } },
          "sensor.t_h_sensor_2_temperature": { state: "26.8", attributes: { unit_of_measurement: "°C" } },
        },
        connection: {
          sendMessagePromise: async (msg) => {
            if (msg.type === "witmind_notifications/rules/list") return mockRules;
            if (msg.type === "witmind_notifications/targets/list") return mockTargets;
            if (msg.type === "witmind_notifications/sensors/list") return mockSensors;
            if (msg.type === "witmind_notifications/history/list") return mockHistory;
            if (msg.type === "witmind_notifications/rules/toggle") return { enabled: msg.enabled };
            if (msg.type === "witmind_notifications/test") return { sent: true };
            if (msg.type === "witmind_notifications/targets/alias/set") return { ok: true };
            throw new Error(`Comando no mockeado: ${msg.type}`);
          },
          subscribeEvents: async () => () => {},
        },
      };

      const adminPanel = document.createElement("witmind-admin-panel");
      adminPanel.panel = { panel_kind: "notifications" };
      adminPanel.theme = theme;
      adminPanel.setAttribute("data-theme", theme);
      adminPanel.hass = mockHass;

      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.background = theme === "light" ? "#f4f7f7" : "#071118";
      document.body.replaceChildren(adminPanel);
    },
    { mockSensors, mockTargets, mockRules, mockHistory, theme }
  );

  await page.waitForTimeout(200);

  // 1. Screenshot Tab 1: Reglas
  const p1 = path.join(OUTPUT_DIR, `${name}_${theme}_01_reglas.png`);
  await page.screenshot({ path: p1, fullPage: true });
  results.screenshots.push(p1);

  // Check overflow & touch targets on Tab 1
  const metrics1 = await page.evaluate(() => {
    const admin = document.querySelector("witmind-admin-panel");
    const shadow = admin?.shadowRoot;
    const dash = shadow?.querySelector(".dashboard");

    const bodyW = document.body.clientWidth;
    const bodyScroll = document.body.scrollWidth;
    const dashW = dash?.clientWidth || 0;
    const dashScroll = dash?.scrollWidth || 0;

    // Check button sizes
    const smallButtons = [];
    const buttons = shadow?.querySelectorAll("button, .tab-btn, .filter-btn, .switch-button") || [];
    for (const b of buttons) {
      const rect = b.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && (rect.width < 32 || rect.height < 32)) {
        smallButtons.push({ text: b.textContent?.trim().slice(0, 20), w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    }

    return {
      bodyW,
      bodyScroll,
      hasOverflow: bodyScroll > bodyW + 1 || dashScroll > dashW + 1,
      dashW,
      dashScroll,
      smallButtons,
    };
  });

  if (metrics1.hasOverflow) {
    results.overflows.push({ viewport: `${name}_${theme}_tab1`, metrics: metrics1 });
  }
  if (metrics1.smallButtons.length > 0) {
    results.touchTargetViolations.push({ viewport: `${name}_${theme}`, buttons: metrics1.smallButtons });
  }

  // 2. Switch to Tab 2: Dispositivos
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('.tab-btn[data-tab="devices"]')?.click();
  });
  await page.waitForTimeout(100);
  const p2 = path.join(OUTPUT_DIR, `${name}_${theme}_02_dispositivos.png`);
  await page.screenshot({ path: p2, fullPage: true });
  results.screenshots.push(p2);

  // 3. Switch to Tab 3: Historial
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('.tab-btn[data-tab="history"]')?.click();
  });
  await page.waitForTimeout(100);
  const p3 = path.join(OUTPUT_DIR, `${name}_${theme}_03_historial.png`);
  await page.screenshot({ path: p3, fullPage: true });
  results.screenshots.push(p3);

  // 4. Open Wizard: Step 1 (Sensor)
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('.tab-btn[data-tab="rules"]')?.click();
  });
  await page.waitForTimeout(60);
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('button[data-action="new-rule"]')?.click();
  });
  await page.waitForTimeout(100);
  const p4 = path.join(OUTPUT_DIR, `${name}_${theme}_04_wizard_step1.png`);
  await page.screenshot({ path: p4, fullPage: true });
  results.screenshots.push(p4);

  // 5. Wizard Step 2 (Condición)
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('button[data-action="editor-next"]')?.click();
  });
  await page.waitForTimeout(100);
  const p5 = path.join(OUTPUT_DIR, `${name}_${theme}_05_wizard_step2.png`);
  await page.screenshot({ path: p5, fullPage: true });
  results.screenshots.push(p5);

  // 6. Wizard Step 3 (Destinatarios)
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('button[data-action="editor-next"]')?.click();
  });
  await page.waitForTimeout(100);
  const p6 = path.join(OUTPUT_DIR, `${name}_${theme}_06_wizard_step3.png`);
  await page.screenshot({ path: p6, fullPage: true });
  results.screenshots.push(p6);

  // Select a recipient, then go to Step 4 (Mensaje)
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    const opt = shadow?.querySelector('.target-option input[type="checkbox"]');
    if (opt) opt.click();
  });
  await page.waitForTimeout(60);
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('button[data-action="editor-next"]')?.click();
  });
  await page.waitForTimeout(100);
  const p7 = path.join(OUTPUT_DIR, `${name}_${theme}_07_wizard_step4.png`);
  await page.screenshot({ path: p7, fullPage: true });
  results.screenshots.push(p7);

  // Close Wizard
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('button[data-action="close-editor"]')?.click();
  });
  await page.waitForTimeout(60);

  // 8. Open Device Rename Dialog (from devices tab)
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('.tab-btn[data-tab="devices"]')?.click();
  });
  await page.waitForTimeout(60);
  await page.evaluate(() => {
    const shadow = document.querySelector("witmind-admin-panel")?.shadowRoot;
    shadow?.querySelector('button[data-action="rename-target"]')?.click();
  });
  await page.waitForTimeout(80);
  const p8 = path.join(OUTPUT_DIR, `${name}_${theme}_08_dialog_rename.png`);
  await page.screenshot({ path: p8, fullPage: true });
  results.screenshots.push(p8);

  await context.close();
  console.log(`✓ Completed inspection for ${name} (${theme})`);
}

try {
  // Inspect Desktop Dark & Light
  await inspectViewport(1440, 900, "desktop_1440", "dark");
  await inspectViewport(1440, 900, "desktop_1440", "light");

  // Inspect Tablet (iPad 768px portrait)
  await inspectViewport(768, 1024, "tablet_768", "dark");

  // Inspect Mobile (iPhone 14 390px)
  await inspectViewport(390, 844, "mobile_390", "dark");
  await inspectViewport(390, 844, "mobile_390", "light");

  console.log("\n=== INSPECTION SUMMARY ===");
  console.log("Total screenshots captured:", results.screenshots.length);
  console.log("Overflow occurrences:", results.overflows.length);
  if (results.overflows.length > 0) {
    console.log("Overflow details:", JSON.stringify(results.overflows, null, 2));
  }
  console.log("Touch target issues:", results.touchTargetViolations.length);
  if (results.touchTargetViolations.length > 0) {
    console.log("Touch target sample:", JSON.stringify(results.touchTargetViolations.slice(0, 2), null, 2));
  }
} finally {
  await browser.close();
  await viteServer.close();
}
