import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 389, height: 844 }, isMobile: true, hasTouch: true });
await page.goto("http://127.0.0.1:5174/witmind-ui.html?mobile-card-swipe=1", { waitUntil: "domcontentloaded" });
await page.locator("witmind-ui-app").waitFor();

await page.evaluate(() => {
  window.__serviceCalls = 0;
  window.addEventListener("message", (event) => {
    if (event.data?.type === "WITMIND_CALL_SERVICE") window.__serviceCalls += 1;
  });
  window.postMessage({
    protocol: 1,
    source: "witmind-ha",
    type: "WITMIND_INIT",
    panelConfig: { panel_id: "lobby", panel_kind: "lobby" },
    navigationMode: "carousel",
    narrow: true,
    theme: "dark",
    user: { is_admin: true, name: "QA" },
  }, "*");
});
await page.waitForTimeout(200);

const activePanel = () => page.locator("witmind-workspace").evaluate((workspace) =>
  workspace.shadowRoot?.querySelector('.dot[aria-current="page"]')?.getAttribute("data-panel"),
);

const swipe = async (locator, fromRatio, toRatio) => {
  const box = await locator.boundingBox();
  if (!box) throw new Error("No se encontró una tarjeta visible para iniciar el gesto");
  const y = box.y + box.height / 2;
  const startX = box.x + box.width * fromRatio;
  const endX = box.x + box.width * toRatio;
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: startX, y }] });
  for (let step = 1; step <= 8; step += 1) {
    const x = startX + ((endX - startX) * step) / 8;
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y }] });
    await page.waitForTimeout(16);
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await cdp.detach();
  await page.waitForTimeout(350);
};

const lobbyScene = page.locator('showroom-panel button[data-action="run-scene"]').first();
await swipe(lobbyScene, 0.86, 0.14);
const afterLeft = await activePanel();
if (afterLeft !== "offices") {
  await browser.close();
  throw new Error(`El gesto iniciado sobre una tarjeta no avanzó: ${afterLeft}`);
}

const officeSwitch = page.locator('witmind-operations-panel button[data-action="toggle-switch"]').first();
await swipe(officeSwitch, 0.14, 0.86);
const afterRight = await activePanel();
const serviceCalls = await page.evaluate(() => window.__serviceCalls);

const result = { viewport: "389x844", afterLeft, afterRight, serviceCalls };
if (afterLeft !== "offices" || afterRight !== "lobby" || serviceCalls !== 0) {
  throw new Error(`El gesto sobre controles no es seguro: ${JSON.stringify(result)}`);
}

console.log(JSON.stringify(result));
await browser.close();
