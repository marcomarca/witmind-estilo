import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "user-image1-849x978", width: 849, height: 978, narrow: false },
    { name: "user-image2-366x794", width: 366, height: 794, narrow: true },
    { name: "user-image3-desktop-wide", width: 1440, height: 900, narrow: false },
  ];

  const shotDir = path.resolve("artifacts/debug-user-res");
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.narrow,
      hasTouch: vp.narrow,
      deviceScaleFactor: 1,
    });
    
    // Clear localStorage before load
    await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.clear());

    await page.evaluate(({ width, height }) => {
      document.body.style.margin = "0";
      document.body.innerHTML = `<iframe id="panel" src="/witmind-ui.html?test=1" style="display:block;width:${width}px;height:${height}px;border:0"></iframe>`;
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
    await page.waitForTimeout(400);

    const panel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
    
    const info = await panel.evaluate((el) => {
      const root = el.shadowRoot;
      const getR = (sel) => {
        const node = root?.querySelector(sel);
        if (!node) return null;
        const r = node.getBoundingClientRect();
        return { width: r.width, height: r.height, left: r.left, top: r.top, right: r.right, bottom: r.bottom };
      };
      return {
        viewport: getR(".floor-viewport"),
        stage: getR(".floor-stage"),
        canvas: getR(".floor-canvas"),
        img: getR(".floor-picture img"),
      };
    });

    console.log(`\n=== VP: ${vp.name} (${vp.width}x${vp.height}) ===`);
    console.log(JSON.stringify(info, null, 2));

    await page.screenshot({ path: path.join(shotDir, `${vp.name}-full.png`) });
    const card = panel.locator(".floor-card");
    if (await card.count() > 0) {
      await card.screenshot({ path: path.join(shotDir, `${vp.name}-floor-card.png`) });
    }

    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
