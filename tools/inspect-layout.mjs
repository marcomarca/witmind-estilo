import { chromium } from "playwright";

async function inspect() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 849, height: 978 } });
  await page.goto("http://127.0.0.1:5174/witmind-ui.html?inspect=1", { waitUntil: "networkidle" });

  await page.evaluate(() => {
    window.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_INIT",
      panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
      narrow: false,
      theme: "dark",
      user: { is_admin: true, name: "QA" },
    }, "*");
  });
  await page.waitForTimeout(600);

  const data = await page.evaluate(() => {
    const app = document.querySelector("witmind-ui-app");
    const ws = app?.shadowRoot?.querySelector("witmind-workspace");
    const panel = ws?.shadowRoot?.querySelector("witmind-building-panel");
    const root = panel?.shadowRoot;

    const viewport = root?.querySelector(".floor-viewport");
    const stage = root?.querySelector(".floor-stage");
    const canvas = root?.querySelector(".floor-canvas");
    const picture = root?.querySelector(".floor-picture");
    const img = root?.querySelector(".floor-picture img");
    const overlays = Array.from(root?.querySelectorAll(".zone-overlay") || []);

    const vRect = viewport?.getBoundingClientRect();
    const sRect = stage?.getBoundingClientRect();
    const cRect = canvas?.getBoundingClientRect();
    const pRect = picture?.getBoundingClientRect();
    const iRect = img?.getBoundingClientRect();

    return {
      viewportRect: vRect ? { w: vRect.width, h: vRect.height, l: vRect.left, t: vRect.top } : null,
      stageRect: sRect ? { w: sRect.width, h: sRect.height, l: sRect.left, t: sRect.top } : null,
      canvasRect: cRect ? { w: cRect.width, h: cRect.height, l: cRect.left, t: cRect.top } : null,
      pictureRect: pRect ? { w: pRect.width, h: pRect.height, l: pRect.left, t: pRect.top } : null,
      imgRect: iRect ? { w: iRect.width, h: iRect.height, l: iRect.left, t: iRect.top } : null,
      imgNatural: img ? { w: img.naturalWidth, h: img.naturalHeight } : null,
      canvasStyleTransform: canvas?.getAttribute("style"),
      canvasComputedStyle: canvas ? {
        transform: window.getComputedStyle(canvas).transform,
        width: window.getComputedStyle(canvas).width,
        height: window.getComputedStyle(canvas).height,
      } : null,
      stageComputedStyle: stage ? {
        width: window.getComputedStyle(stage).width,
        height: window.getComputedStyle(stage).height,
        aspectRatio: window.getComputedStyle(stage).aspectRatio,
        display: window.getComputedStyle(stage).display,
      } : null,
      overlays: overlays.map((o) => ({
        text: o.textContent?.trim(),
        style: o.getAttribute("style"),
        rect: o.getBoundingClientRect(),
      })),
      layoutStore: panel?._layoutStore,
    };
  });

  console.log("INSPECT DATA:\n", JSON.stringify(data, null, 2));
  await browser.close();
}

inspect().catch(console.error);
