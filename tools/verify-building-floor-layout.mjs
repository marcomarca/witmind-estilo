import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900, narrow: false },
  { name: "tablet", width: 1024, height: 900, narrow: false },
  { name: "mobile", width: 390, height: 844, narrow: true },
];

const round = (value) => Math.round(value * 100) / 100;

for (const viewport of viewports) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.narrow,
    hasTouch: viewport.narrow,
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
  await page.evaluate(({ width, height }) => {
    document.body.style.margin = "0";
    document.body.innerHTML = `<iframe id="panel" src="/witmind-ui.html?building-floor-layout-test=1" style="display:block;width:${width}px;height:${height}px;border:0"></iframe>`;
  }, viewport);

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
  }, "*"), viewport);
  await page.waitForTimeout(300);

  const panel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
  const measure = () => panel.evaluate((element) => {
    const root = element.shadowRoot;
    const rect = (selector) => {
      const box = root?.querySelector(selector)?.getBoundingClientRect();
      return box ? { width: box.width, height: box.height } : null;
    };
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      floorCard: rect(".floor-card"),
      floorViewport: rect(".floor-viewport"),
      circuitsCard: rect(".circuits-card"),
      circuitTable: rect(".circuit-table"),
    };
  });

  const ground = await measure();
  await panel.locator(".floor-selector button").nth(1).click();
  await page.waitForTimeout(250);
  const upper = await measure();

  const normalize = (value) => JSON.parse(JSON.stringify(value), (_key, item) => typeof item === "number" ? round(item) : item);
  const result = { ground: normalize(ground), upper: normalize(upper) };
  if (JSON.stringify(result.ground) !== JSON.stringify(result.upper)) {
    throw new Error(`${viewport.name}: floor layouts differ: ${JSON.stringify(result)}`);
  }
  if (viewport.narrow && result.ground.clientWidth !== viewport.width) {
    throw new Error(`${viewport.name}: viewport lost width: ${JSON.stringify(result)}`);
  }
  console.log(JSON.stringify({ viewport: viewport.name, ...result }));
  await page.close();
}

await browser.close();
