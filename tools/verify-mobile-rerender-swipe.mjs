import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 389, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto("http://127.0.0.1:5174/witmind-ui.html?mobile-rerender-swipe=1", { waitUntil: "domcontentloaded" });
  await page.locator("witmind-ui-app").waitFor();
  await page.evaluate(() => window.postMessage({
    protocol: 1,
    source: "witmind-ha",
    type: "WITMIND_INIT",
    panelConfig: { panel_id: "lobby", panel_kind: "lobby" },
    narrow: true,
    theme: "dark",
    user: { is_admin: true, name: "QA" },
  }, "*"));
  await page.waitForTimeout(200);

  const scene = page.locator('showroom-panel button[data-action="run-scene"]').first();
  const box = await scene.boundingBox();
  if (!box) throw new Error("No se encontró la tarjeta de escena");
  const y = box.y + box.height / 2;
  const startX = box.x + box.width * 0.86;
  const endX = box.x + box.width * 0.14;
  await scene.evaluate((target, point) => {
    window.__witmindTouchTarget = target;
    const touch = new Touch({ identifier: 71, target, clientX: point.x, clientY: point.y });
    target.dispatchEvent(new TouchEvent("touchstart", { touches: [touch], targetTouches: [touch], changedTouches: [touch], bubbles: true, composed: true, cancelable: true }));
  }, { x: startX, y });
  // Reproduce la condición del WebView: el panel hijo actualiza su Shadow DOM
  // y el bridge entrega una configuración equivalente pero con metadatos
  // transitorios después de apoyar el dedo, antes del primer movimiento.
  await page.locator("showroom-panel").evaluate((panel) => panel.render());
  await page.evaluate(() => window.postMessage({
    protocol: 1,
    source: "witmind-ha",
    type: "WITMIND_INIT",
    panelConfig: { panel_id: "lobby", panel_kind: "lobby", runtime_revision: Date.now() },
    narrow: true,
    theme: "dark",
    user: { is_admin: true, name: "QA" },
  }, "*"));
  await page.setViewportSize({ width: 389, height: 843 });
  for (let step = 1; step <= 8; step += 1) {
    const x = startX + ((endX - startX) * step) / 8;
    await page.evaluate((point) => {
      const target = window.__witmindTouchTarget;
      const touch = new Touch({ identifier: 71, target, clientX: point.x, clientY: point.y });
      window.dispatchEvent(new TouchEvent("touchmove", { touches: [touch], targetTouches: [touch], changedTouches: [touch], bubbles: true, composed: true, cancelable: true }));
    }, { x, y });
    await page.waitForTimeout(16);
  }
  await page.evaluate((point) => {
    const target = window.__witmindTouchTarget;
    const touch = new Touch({ identifier: 71, target, clientX: point.x, clientY: point.y });
    window.dispatchEvent(new TouchEvent("touchend", { touches: [], targetTouches: [], changedTouches: [touch], bubbles: true, composed: true, cancelable: true }));
  }, { x: endX, y });
  await page.waitForTimeout(350);

  const result = await page.locator("witmind-workspace").evaluate((workspace) => ({
    active: workspace.shadowRoot?.querySelector('.dot[aria-current="page"]')?.getAttribute("data-panel"),
    transform: workspace.shadowRoot?.querySelector("[data-track]")?.style.transform,
  }));
  if (result.active !== "offices") throw new Error(`El rerender interrumpió el gesto: ${JSON.stringify(result)}`);
  console.log(JSON.stringify({ viewport: "389x844→843", ...result }));
} finally {
  await browser.close();
}
