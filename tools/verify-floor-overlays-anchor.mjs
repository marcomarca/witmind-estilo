import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const screenshotsDir = path.resolve("artifacts", "screenshots");
fs.mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

const resolutions = [
  { name: "desktop-1440x900", width: 1440, height: 900, isMobile: false },
  { name: "laptop-1024x768", width: 1024, height: 768, isMobile: false },
  { name: "tablet-820x900", width: 820, height: 900, isMobile: false },
  { name: "mobile-390x844", width: 390, height: 844, isMobile: true },
  { name: "mobile-375x667", width: 375, height: 667, isMobile: true },
];

console.log("Iniciando verificación de aspecto del plano y anclaje inerte de overlays...");

const mockStates = {
  "sensor.showroom_potencia_activa": { state: "1082", attributes: { unit_of_measurement: "W" } },
  "sensor.sensor_de_potencia_showroom_p": { state: "82", attributes: { unit_of_measurement: "W" } },
  "switch.oficina_gerencial_interruptor_1": { state: "on" },
  "switch.interruptor_inteligente_switch_1": { state: "on" },
  "switch.interruptor_inteligente_switch_2": { state: "on" },
  "switch.interruptor_inteligente_3_switch_1": { state: "on" },
  "switch.interruptor_inteligente_3_switch_4": { state: "on" },
  "switch.4gang_switch_sala_grabacion_interruptor_1": { state: "on" },
  "switch.taller_interruptor_1": { state: "on" },
  "switch.oficina_grande_interruptor_1": { state: "on" },
  "switch.b2_gang_interruptor_1": { state: "on" },
  "sensor.t_h_sensor_temperature": { state: "24.1", attributes: { unit_of_measurement: "°C" } },
  "sensor.t_h_sensor_humidity": { state: "41", attributes: { unit_of_measurement: "%" } },
  "sensor.t_h_sensor_2_temperature": { state: "23.2", attributes: { unit_of_measurement: "°C" } },
  "sensor.t_h_sensor_2_humidity": { state: "37", attributes: { unit_of_measurement: "%" } },
};

for (const res of resolutions) {
  const page = await browser.newPage({
    viewport: { width: res.width, height: res.height },
    isMobile: res.isMobile,
    hasTouch: res.isMobile,
  });

  await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
  await page.evaluate(({ width, height }) => {
    document.body.style.margin = "0";
    document.body.innerHTML = `<iframe id="panel" src="/witmind-ui.html?anchor-test=1" style="display:block;width:${width}px;height:${height}px;border:0"></iframe>`;
  }, res);

  const frame = page.frameLocator("#panel");
  await frame.locator("witmind-ui-app").waitFor();

  await page.evaluate(({ states, isMobile }) => {
    const child = document.querySelector("#panel")?.contentWindow;
    child?.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_INIT",
      panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
      narrow: isMobile,
      theme: "dark",
      user: { is_admin: true, name: "QA Auditor" },
    }, "*");
    child?.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_STATES",
      states,
    }, "*");
  }, { states: mockStates, isMobile: res.isMobile });

  await page.waitForTimeout(300);

  const buildingPanel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
  await buildingPanel.waitFor();

  // Medir planta baja
  const groundMetrics = await buildingPanel.evaluate((el) => {
    const root = el.shadowRoot;
    const viewport = root?.querySelector(".floor-viewport")?.getBoundingClientRect();
    const stage = root?.querySelector(".floor-stage")?.getBoundingClientRect();
    const canvas = root?.querySelector(".floor-canvas")?.getBoundingClientRect();
    const img = root?.querySelector(".floor-stage img")?.getBoundingClientRect();
    const overlays = Array.from(root?.querySelectorAll(".zone-overlay") || []).map((o) => {
      const rect = o.getBoundingClientRect();
      const label = o.querySelector("strong")?.textContent?.trim();
      const leftPct = ((rect.left - (canvas?.left || 0)) / (canvas?.width || 1)) * 100;
      const topPct = ((rect.top - (canvas?.top || 0)) / (canvas?.height || 1)) * 100;
      return { label, leftPct: Math.round(leftPct * 10) / 10, topPct: Math.round(topPct * 10) / 10, width: rect.width, height: rect.height };
    });

    return {
      viewportWidth: viewport?.width || 0,
      viewportHeight: viewport?.height || 0,
      stageWidth: stage?.width || 0,
      stageHeight: stage?.height || 0,
      stageAspect: (stage?.width || 0) / (stage?.height || 1),
      imgWidth: img?.width || 0,
      imgHeight: img?.height || 0,
      overlays,
      // Verificar que el stage esté contenido dentro del viewport
      fitsInViewport: (stage?.width || 0) <= (viewport?.width || 0) + 1 && (stage?.height || 0) <= (viewport?.height || 0) + 1,
    };
  });

  if (!groundMetrics.fitsInViewport) {
    throw new Error(`[${res.name}] Error: .floor-stage desborda .floor-viewport: stage=${groundMetrics.stageWidth}x${groundMetrics.stageHeight}, viewport=${groundMetrics.viewportWidth}x${groundMetrics.viewportHeight}`);
  }

  const expectedAspect = 1536 / 1024;
  const aspectDiff = Math.abs(groundMetrics.stageAspect - expectedAspect);
  if (aspectDiff > 0.02) {
    throw new Error(`[${res.name}] Error: Aspect ratio de Planta Baja incorrecto: obtenido=${groundMetrics.stageAspect.toFixed(3)}, esperado=${expectedAspect.toFixed(3)}`);
  }

  // Tomar captura de pantalla de evidencia
  const screenshotPath = path.join(screenshotsDir, `floor-${res.name}-ground.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });

  // Cambiar a planta alta
  await buildingPanel.locator(".floor-selector button:has-text('Planta Alta')").click();
  await page.waitForTimeout(250);

  const upperMetrics = await buildingPanel.evaluate((el) => {
    const root = el.shadowRoot;
    const viewport = root?.querySelector(".floor-viewport")?.getBoundingClientRect();
    const stage = root?.querySelector(".floor-stage")?.getBoundingClientRect();
    const canvas = root?.querySelector(".floor-canvas")?.getBoundingClientRect();
    const img = root?.querySelector(".floor-stage img")?.getBoundingClientRect();
    const overlays = Array.from(root?.querySelectorAll(".zone-overlay") || []).map((o) => {
      const rect = o.getBoundingClientRect();
      const label = o.querySelector("strong")?.textContent?.trim();
      const leftPct = ((rect.left - (canvas?.left || 0)) / (canvas?.width || 1)) * 100;
      const topPct = ((rect.top - (canvas?.top || 0)) / (canvas?.height || 1)) * 100;
      return { label, leftPct: Math.round(leftPct * 10) / 10, topPct: Math.round(topPct * 10) / 10, width: rect.width, height: rect.height };
    });

    return {
      viewportWidth: viewport?.width || 0,
      viewportHeight: viewport?.height || 0,
      stageWidth: stage?.width || 0,
      stageHeight: stage?.height || 0,
      stageAspect: (stage?.width || 0) / (stage?.height || 1),
      overlays,
      fitsInViewport: (stage?.width || 0) <= (viewport?.width || 0) + 1 && (stage?.height || 0) <= (viewport?.height || 0) + 1,
    };
  });

  if (!upperMetrics.fitsInViewport) {
    throw new Error(`[${res.name}] Error: .floor-stage de Planta Alta desborda .floor-viewport`);
  }

  const expectedUpperAspect = 1448 / 1086;
  const upperAspectDiff = Math.abs(upperMetrics.stageAspect - expectedUpperAspect);
  if (upperAspectDiff > 0.02) {
    throw new Error(`[${res.name}] Error: Aspect ratio de Planta Alta incorrecto: obtenido=${upperMetrics.stageAspect.toFixed(3)}, esperado=${expectedUpperAspect.toFixed(3)}`);
  }

  const upperScreenshotPath = path.join(screenshotsDir, `floor-${res.name}-upper.png`);
  await page.screenshot({ path: upperScreenshotPath, fullPage: false });

  await page.close();
}

console.log("✓ Aspect ratio (contain) verificado sin desbordamiento ni recorte en todas las resoluciones.");

// Verificación de sincronización inerte en zoom y pan de modo edición
console.log("Verificando sincronización inerte en zoom/pan de .floor-canvas...");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    document.body.innerHTML = '<iframe id="panel" src="/witmind-ui.html?zoom-test=1" style="width:1440px;height:900px;border:0"></iframe>';
  });
  const frame = page.frameLocator("#panel");
  await frame.locator("witmind-ui-app").waitFor();

  await page.evaluate(({ states }) => {
    const child = document.querySelector("#panel")?.contentWindow;
    child?.postMessage({
      protocol: 1, source: "witmind-ha", type: "WITMIND_INIT",
      panelConfig: { panel_id: "general", panel_kind: "general" },
      theme: "dark", user: { is_admin: true, name: "QA" },
    }, "*");
    child?.postMessage({
      protocol: 1, source: "witmind-ha", type: "WITMIND_STATES",
      states,
    }, "*");
  }, { states: mockStates });

  await page.waitForTimeout(300);

  const buildingPanel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");

  // Activar modo edición
  const pencil = buildingPanel.locator(".pencil-btn");
  await pencil.click();
  await page.waitForTimeout(200);

  // Posiciones iniciales de overlays
  const initialOverlays = await buildingPanel.evaluate((el) => {
    const root = el.shadowRoot;
    const canvas = root?.querySelector(".floor-canvas")?.getBoundingClientRect();
    return Array.from(root?.querySelectorAll(".zone-overlay") || []).map((o) => {
      const rect = o.getBoundingClientRect();
      const label = o.querySelector("strong")?.textContent?.trim();
      const leftPct = ((rect.left - (canvas?.left || 0)) / (canvas?.width || 1)) * 100;
      const topPct = ((rect.top - (canvas?.top || 0)) / (canvas?.height || 1)) * 100;
      return { label, leftPct: Math.round(leftPct * 10) / 10, topPct: Math.round(topPct * 10) / 10 };
    });
  });

  // Aplicar zoom +15%
  const zoomIn = buildingPanel.locator(".btn-ctrl[title='Acercar zoom']");
  await zoomIn.click();
  await zoomIn.click();
  await zoomIn.click();
  await page.waitForTimeout(200);

  // Mover imagen hacia la derecha (+1) y abajo (+1)
  const moveRight = buildingPanel.locator(".btn-ctrl[title='Mover imagen a la derecha']");
  await moveRight.click();
  await moveRight.click();
  const moveDown = buildingPanel.locator(".btn-ctrl[title='Mover imagen hacia abajo']");
  await moveDown.click();
  await page.waitForTimeout(200);

  // Medir que las posiciones de los overlays respecto a la imagen (en canvas) siguen siendo EXACTAMENTE las mismas
  const transformedOverlays = await buildingPanel.evaluate((el) => {
    const root = el.shadowRoot;
    const canvas = root?.querySelector(".floor-canvas")?.getBoundingClientRect();
    return Array.from(root?.querySelectorAll(".zone-overlay") || []).map((o) => {
      const rect = o.getBoundingClientRect();
      const label = o.querySelector("strong")?.textContent?.trim();
      const leftPct = ((rect.left - (canvas?.left || 0)) / (canvas?.width || 1)) * 100;
      const topPct = ((rect.top - (canvas?.top || 0)) / (canvas?.height || 1)) * 100;
      return { label, leftPct: Math.round(leftPct * 10) / 10, topPct: Math.round(topPct * 10) / 10 };
    });
  });

  for (let i = 0; i < initialOverlays.length; i++) {
    const init = initialOverlays[i];
    const trans = transformedOverlays[i];
    if (Math.abs(init.leftPct - trans.leftPct) > 0.5 || Math.abs(init.topPct - trans.topPct) > 0.5) {
      throw new Error(`Overlay ${init.label} se desacopló de la imagen tras transformar lienzo: inicial=(${init.leftPct}, ${init.topPct}), transformado=(${trans.leftPct}, ${trans.topPct})`);
    }
  }

  console.log("✓ Overlays permanecen 100% inertes y fijados sobre el plano ante zoom y pan.");
  await page.close();
}

await browser.close();
console.log("Todas las pruebas de aspecto del plano y anclaje inerte finalizaron con ÉXITO.");
