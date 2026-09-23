import { chromium } from "playwright";

const RESOLUTIONS = [
  { name: "849x978", width: 849, height: 978 },
  { name: "366x794", width: 366, height: 794 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1200x900", width: 1200, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "390x844", width: 390, height: 844 },
];

const CSS_CANDIDATES = [
  {
    name: "Candidate 1: Flex with width auto, height 100%, max-width 100%, aspect-ratio",
    css: `
      .floor-viewport {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50vh;
        min-height: 280px;
        max-height: 560px;
        padding: 10px;
        overflow: hidden;
      }
      .floor-stage {
        position: relative;
        aspect-ratio: 1.5;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
        width: auto;
        margin: auto;
      }
      .floor-canvas {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .floor-picture, .floor-picture img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    `
  },
  {
    name: "Candidate 2: Grid place-items center with width min(100%, calc(viewport-height * 1.5))",
    css: `
      .floor-viewport {
        position: relative;
        display: grid;
        place-items: center;
        height: 50vh;
        min-height: 280px;
        max-height: 560px;
        padding: 10px;
        overflow: hidden;
      }
      .floor-stage {
        position: relative;
        aspect-ratio: 1.5;
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .floor-canvas {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .floor-picture, .floor-picture img {
        display: block;
        width: 100%;
        height: 100%;
      }
    `
  },
  {
    name: "Candidate 3: SVG viewBox container approach / exact CSS aspect scaling",
    css: `
      .floor-viewport {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: clamp(280px, 48vh, 560px);
        padding: 10px;
        overflow: hidden;
      }
      .floor-stage {
        position: relative;
        aspect-ratio: 1.5;
        max-width: 100%;
        max-height: 100%;
        /* If height-constrained vs width-constrained: */
        width: min(100%, calc((clamp(280px, 48vh, 560px) - 20px) * 1.5));
        height: auto;
        margin: auto;
      }
      .floor-canvas {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .floor-picture, .floor-picture img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    `
  },
  {
    name: "Candidate 4: Dual max constraint: width auto; height auto; max-width 100%; max-height 100%; aspect-ratio 1.5; inside inline-size container",
    css: `
      .floor-viewport {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: clamp(280px, 50vh, 580px);
        padding: 12px;
        overflow: hidden;
      }
      .floor-stage {
        position: relative;
        aspect-ratio: 1.5 / 1;
        width: auto;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
      .floor-canvas {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .floor-picture, .floor-picture img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    `
  }
];

async function runTest() {
  const browser = await chromium.launch({ headless: true });

  for (const cand of CSS_CANDIDATES) {
    console.log(`\n======================================================`);
    console.log(`TESTING ${cand.name}`);
    console.log(`======================================================`);

    for (const res of RESOLUTIONS) {
      const page = await browser.newPage({ viewport: { width: res.width, height: res.height } });
      await page.goto("http://127.0.0.1:5174/witmind-ui.html?res-test=1", { waitUntil: "networkidle" });
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
      await page.waitForTimeout(400);

      // Inject candidate CSS into shadowRoot
      const result = await page.evaluate((cssText) => {
        const app = document.querySelector("witmind-ui-app");
        const ws = app?.shadowRoot?.querySelector("witmind-workspace");
        const panel = ws?.shadowRoot?.querySelector("witmind-building-panel");
        const root = panel?.shadowRoot;
        if (!root) return { error: "No shadowRoot" };

        let styleTag = root.querySelector("#test-candidate-style");
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = "test-candidate-style";
          root.appendChild(styleTag);
        }
        styleTag.textContent = cssText;

        const vp = root.querySelector(".floor-viewport");
        const stage = root.querySelector(".floor-stage");
        const canvas = root.querySelector(".floor-canvas");
        const img = root.querySelector(".floor-picture img");

        const vRect = vp?.getBoundingClientRect();
        const sRect = stage?.getBoundingClientRect();
        const cRect = canvas?.getBoundingClientRect();
        const iRect = img?.getBoundingClientRect();

        const stageAspect = sRect ? (sRect.width / sRect.height).toFixed(4) : "null";
        const imgAspect = iRect ? (iRect.width / iRect.height).toFixed(4) : "null";
        const fitsInViewport = sRect && vRect ? (
          sRect.left >= vRect.left - 1 &&
          sRect.right <= vRect.right + 1 &&
          sRect.top >= vRect.top - 1 &&
          sRect.bottom <= vRect.bottom + 1
        ) : false;
        const imgMatchesStage = sRect && iRect ? (
          Math.abs(sRect.width - iRect.width) < 1 &&
          Math.abs(sRect.height - iRect.height) < 1
        ) : false;

        return {
          vRect: vRect ? { w: Math.round(vRect.width), h: Math.round(vRect.height) } : null,
          sRect: sRect ? { w: Math.round(sRect.width), h: Math.round(sRect.height) } : null,
          iRect: iRect ? { w: Math.round(iRect.width), h: Math.round(iRect.height) } : null,
          stageAspect,
          imgAspect,
          fitsInViewport,
          imgMatchesStage,
        };
      }, cand.css);

      console.log(`Res ${res.name.padEnd(10)} | VP: ${result.vRect?.w}x${result.vRect?.h} | Stage: ${result.sRect?.w}x${result.sRect?.h} (AR: ${result.stageAspect}) | Img: ${result.iRect?.w}x${result.iRect?.h} (AR: ${result.imgAspect}) | Fits: ${result.fitsInViewport} | Match: ${result.imgMatchesStage}`);
      await page.close();
    }
  }

  await browser.close();
}

runTest().catch(console.error);
