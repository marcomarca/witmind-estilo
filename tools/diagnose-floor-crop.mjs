import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const viewports = [
  { name: "desktop-1440x900", width: 1440, height: 900, isMobile: false },
  { name: "laptop-1024x768", width: 1024, height: 768, isMobile: false },
  { name: "tablet-820x900", width: 820, height: 900, isMobile: false },
  { name: "mobile-390x844", width: 390, height: 844, isMobile: true },
  { name: "mobile-375x667", width: 375, height: 667, isMobile: true },
];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.isMobile });
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
  await page.evaluate(({ width, height }) => {
    document.body.innerHTML = `<iframe id="panel" src="/witmind-ui.html?test=1" style="width:${width}px;height:${height}px;border:0"></iframe>`;
  }, vp);

  const frame = page.frameLocator("#panel");
  await frame.locator("witmind-ui-app").waitFor();

  await page.evaluate(({ isMobile }) => {
    const child = document.querySelector("#panel")?.contentWindow;
    child?.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_INIT",
      panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
      narrow: isMobile,
      theme: "dark",
      user: { is_admin: true, name: "QA" },
    }, "*");
  }, { isMobile: vp.isMobile });

  await page.waitForTimeout(300);

  const panel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
  const data = await panel.evaluate((el) => {
    const root = el.shadowRoot;
    const viewport = root?.querySelector(".floor-viewport")?.getBoundingClientRect();
    const stage = root?.querySelector(".floor-stage")?.getBoundingClientRect();
    const pic = root?.querySelector(".floor-picture")?.getBoundingClientRect();
    const img = root?.querySelector(".floor-stage img")?.getBoundingClientRect();
    const overlays = Array.from(root?.querySelectorAll(".zone-overlay") || []).map((o) => {
      const rect = o.getBoundingClientRect();
      const label = o.querySelector("strong")?.textContent?.trim();
      return { label, left: rect.left - (stage?.left || 0), top: rect.top - (stage?.top || 0), width: rect.width, height: rect.height };
    });
    return { viewport, stage, pic, img, overlays };
  });

  console.log(`=== ${vp.name} ===`);
  console.log("Viewport:", Math.round(data.viewport?.width), "x", Math.round(data.viewport?.height));
  console.log("Stage:", Math.round(data.stage?.width), "x", Math.round(data.stage?.height), "aspect:", (data.stage?.width / data.stage?.height).toFixed(3));
  console.log("Image:", Math.round(data.img?.width), "x", Math.round(data.img?.height), "aspect:", (data.img?.width / data.img?.height).toFixed(3));
  console.log("Overlays relative to stage:", data.overlays);
  
  // Take screenshot
  await page.screenshot({ path: `artifacts/screenshots/diag-${vp.name}.png` });

  await page.close();
}

await browser.close();
