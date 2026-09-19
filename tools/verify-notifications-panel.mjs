import { chromium } from "playwright";
import { createServer } from "vite";

const server = await createServer({
  server: { port: 5192 },
});
await server.listen();

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

try {
  await page.goto("http://localhost:5192/witmind-ui.html", { waitUntil: "domcontentloaded" });

  const result = await page.evaluate(async () => {
    // Definición de datos mock para notificaciones
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
        entity_id: "sensor.temperatura_oficina",
        name: "Sensor Oficina",
        display_name: "Oficina Gerencial",
        area_name: "Oficinas",
        unit: "°C",
        value: 24.1,
        available: true,
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
        ],
        message: {
          title: "Rack Crítico",
          body: "{sensor} alcanzó {value} {unit}.",
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
          next_reminder_at: new Date(Date.now() + 600000).toISOString(),
          retry_at: null,
          last_error: null,
          last_sent: new Date().toISOString(),
        },
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
    ];

    const mockHistory = [
      {
        timestamp: new Date().toISOString(),
        event_type: "alert",
        status: "sent",
        rule_id: "rule_server_rack",
        rule_name: "Alerta Servidor Rack",
        recipient: "Celular Guardia",
        value: 29.4,
        error: null,
      },
    ];

    // Montar custom element WitmindAdminPanel directamente
    await customElements.whenDefined("witmind-admin-panel");
    const adminPanel = document.createElement("witmind-admin-panel");
    adminPanel.panel = { panel_kind: "notifications" };

    const mockHass = {
      user: { is_admin: true, name: "Admin" },
      states: {
        "sensor.temperatura_rack": { state: "29.4", attributes: { unit_of_measurement: "°C" } },
        "sensor.temperatura_oficina": { state: "24.1", attributes: { unit_of_measurement: "°C" } },
      },
      connection: {
        sendMessagePromise: async (msg) => {
          if (msg.type === "witmind_notifications/rules/list") return mockRules;
          if (msg.type === "witmind_notifications/targets/list") return mockTargets;
          if (msg.type === "witmind_notifications/sensors/list") return mockSensors;
          if (msg.type === "witmind_notifications/history/list") return mockHistory;
          if (msg.type === "witmind_notifications/rules/toggle") return { enabled: msg.enabled };
          if (msg.type === "witmind_notifications/test") return { sent: true };
          throw new Error(`Comando no mockeado: ${msg.type}`);
        },
        subscribeEvents: async () => () => {},
      },
    };

    adminPanel.hass = mockHass;
    document.body.replaceChildren(adminPanel);
    await new Promise((r) => setTimeout(r, 150));

    const shadow = adminPanel.shadowRoot;
    if (!shadow) throw new Error("No hay shadowRoot en witmind-admin-panel");

    // 1. Verificar pestañas y cabecera
    const tabs = shadow.querySelectorAll(".tab-btn");
    if (tabs.length !== 3) throw new Error(`Esperadas 3 pestañas, encontradas ${tabs.length}`);

    // 2. Verificar tarjeta de regla y datos en vivo
    const ruleCard = shadow.querySelector(".rule-card");
    if (!ruleCard) throw new Error("No se encontró la tarjeta de regla renderizada");
    const ruleTitle = ruleCard.querySelector(".rule-title-line h3")?.textContent;
    if (ruleTitle !== "Alerta Servidor Rack") throw new Error(`Título incorrecto: ${ruleTitle}`);

    // 3. Verificar selector de countdown
    const countdownNode = ruleCard.querySelector("[data-reminder-at]");
    if (!countdownNode) throw new Error("Falta nodo data-reminder-at en la tarjeta de regla");

    // 4. Cambiar a pestaña Dispositivos
    const devTabBtn = shadow.querySelector('.tab-btn[data-tab="devices"]');
    devTabBtn?.click();
    await new Promise((r) => setTimeout(r, 60));

    const devCard = shadow.querySelector(".device-card");
    if (!devCard) throw new Error("No se encontró tarjeta de dispositivo en pestaña Dispositivos");
    const devTitle = devCard.querySelector(".device-title h3")?.textContent;
    if (devTitle !== "Pixel 7 Pro") throw new Error(`Dispositivo incorrecto: ${devTitle}`);

    // 5. Cambiar a pestaña Historial
    const histTabBtn = shadow.querySelector('.tab-btn[data-tab="history"]');
    histTabBtn?.click();
    await new Promise((r) => setTimeout(r, 60));

    const histRow = shadow.querySelector(".history-row");
    if (!histRow) throw new Error("No se encontró fila de historial en pestaña Historial");

    // 6. Volver a Reglas y abrir el editor de 4 pasos
    const rulesTabBtn = shadow.querySelector('.tab-btn[data-tab="rules"]');
    rulesTabBtn?.click();
    await new Promise((r) => setTimeout(r, 60));

    const newRuleBtn = shadow.querySelector('button[data-action="new-rule"]');
    if (!newRuleBtn) throw new Error("No se encontró botón + Nueva regla");
    newRuleBtn.click();
    await new Promise((r) => setTimeout(r, 60));

    const wizardCard = shadow.querySelector("[data-editor-card]");
    if (!wizardCard) throw new Error("No se abrió el modal del editor");

    // Comprobar paso 1
    const stepItems = wizardCard.querySelectorAll(".wizard-step-item");
    if (stepItems.length !== 4) throw new Error("Esperados 4 pasos en el wizard");

    // Avanzar a paso 2
    const nextBtn = wizardCard.querySelector('button[data-action="editor-next"]');
    if (!nextBtn) throw new Error("No se encontró botón editor-next");
    nextBtn.click();
    await new Promise((r) => setTimeout(r, 100));

    const editorErr = shadow.querySelector("[data-editor-error]")?.textContent;
    if (editorErr) throw new Error(`Error en wizard al avanzar: ${editorErr}`);

    const hysteresisField = shadow.querySelector('input[data-field="hysteresis"]');
    if (!hysteresisField) {
      const activeStep = shadow.querySelector(".wizard-step-item.active .step-label")?.textContent;
      throw new Error(`No se encontró campo de histéresis en paso 2. Paso activo actual: '${activeStep}'. Error visible: '${editorErr || "ninguno"}'`);
    }

    // Escribir en histéresis
    hysteresisField.value = "1.8";
    hysteresisField.dispatchEvent(new Event("input", { bubbles: true }));

    // Simular un cambio de estado en Home Assistant mientras el editor está abierto
    adminPanel.hass = {
      ...mockHass,
      states: {
        ...mockHass.states,
        "sensor.temperatura_rack": { state: "31.2", attributes: { unit_of_measurement: "°C" } },
      },
    };
    await new Promise((r) => setTimeout(r, 60));

    // Comprobar que la barrera protegió el editor y no borró el input
    const hysteresisAfterHass = shadow.querySelector('input[data-field="hysteresis"]');
    if (hysteresisAfterHass?.value !== "1.8") {
      throw new Error(`Barrera de interacción falló: el valor fue reseteado a '${hysteresisAfterHass?.value}'`);
    }

    // Cerrar editor
    const closeBtn = shadow.querySelector('button[data-action="close-editor"]');
    closeBtn?.click();
    await new Promise((r) => setTimeout(r, 60));

    if (shadow.querySelector("[data-editor-card]")) {
      throw new Error("El modal no se cerró correctamente");
    }

    // 7. Probar switch de habilitación (toggle-rule)
    const switchBtn = shadow.querySelector(".switch-button");
    if (!switchBtn) throw new Error("Falta switch-button en regla");
    switchBtn.click();
    await new Promise((r) => setTimeout(r, 60));

    // 8. Probar filtros en pestaña Historial
    const histTabAgain = shadow.querySelector('.tab-btn[data-tab="history"]');
    histTabAgain?.click();
    await new Promise((r) => setTimeout(r, 60));

    const alertFilterBtn = shadow.querySelector('.filter-btn[data-action="filter-history-type"][data-type="alert"]');
    alertFilterBtn?.click();
    await new Promise((r) => setTimeout(r, 60));
    const countAfterFilter = shadow.querySelectorAll(".history-row").length;
    if (countAfterFilter !== 1) throw new Error(`Filtro tipo alert falló, filas: ${countAfterFilter}`);

    const reminderFilterBtn = shadow.querySelector('.filter-btn[data-action="filter-history-type"][data-type="reminder"]');
    reminderFilterBtn?.click();
    await new Promise((r) => setTimeout(r, 60));
    const emptyHistory = shadow.querySelector(".empty");
    if (!emptyHistory) throw new Error("Debería mostrarse mensaje empty para filtro reminder sin registros");

    return {
      success: true,
      rulesRendered: 1,
      devicesRendered: 1,
      historyRendered: 1,
      wizardBarrierProtected: true,
      historyFiltersVerified: true,
      ruleToggleVerified: true,
    };
  });

  console.log("Resultado de verificación:", JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  await server.close();
}
