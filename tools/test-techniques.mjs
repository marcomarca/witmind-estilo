import { chromium } from "playwright";

const RESOLUTIONS = [
  { name: "849x978", width: 849, height: 978 },
  { name: "366x794", width: 366, height: 794 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1200x900", width: 1200, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "390x844", width: 390, height: 844 },
];

async function testTechniques() {
  const browser = await chromium.launch({ headless: true });

  const techniques = [
    {
      name: "Technique A: Flex viewport + Stage with height: 100%, width: auto, max-width: 100%, aspect-ratio: 1.5",
      css: `
        .floor-viewport {
          position: relative;
          width: 100%;
          height: clamp(260px, 50vh, 560px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          overflow: hidden;
        }
        .floor-stage {
          position: relative;
          aspect-ratio: 1.5;
          height: 100%;
          width: auto;
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
        }
      `
    },
    {
      name: "Technique B: Flex viewport + Stage with width: 100%, height: auto, max-height: 100%, aspect-ratio: 1.5",
      css: `
        .floor-viewport {
          position: relative;
          width: 100%;
          height: clamp(260px, 50vh, 560px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          overflow: hidden;
        }
        .floor-stage {
          position: relative;
          aspect-ratio: 1.5;
          width: 100%;
          height: auto;
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
        }
      `
    },
    {
      name: "Technique C: SVG ViewBox Container (Mathematical Exactness)",
      css: `
        .floor-viewport {
          position: relative;
          width: 100%;
          height: clamp(260px, 50vh, 560px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          overflow: hidden;
        }
        .floor-stage {
          position: relative;
          max-width: 100%;
          max-height: 100%;
          aspect-ratio: 1.5;
          width: auto;
          height: 100%;
          margin: auto;
        }
        @media (min-aspect-ratio: 3/2) {
          .floor-stage {
            height: 100%;
            width: auto;
          }
        }
        @media (max-aspect-ratio: 3/2) {
          .floor-stage {
            width: 100%;
            height: auto;
          }
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
      name: "Technique D: CSS Container Query or Aspect Ratio Fit",
      css: `
        .floor-viewport {
          position: relative;
          width: 100%;
          height: clamp(260px, 50vh, 560px);
          display: grid;
          place-items: center;
          padding: 12px;
          overflow: hidden;
        }
        .floor-stage {
          position: relative;
          aspect-ratio: 1536 / 1024;
          max-width: 100%;
          max-height: 100%;
          width: min(100%, calc((clamp(260px, 50vh, 560px) - 24px) * 1.5));
          height: min(100%, calc(100% / 1.5));
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
        }
      `
    }
  ];

  for (const tech of techniques) {
    console.log(`\n======================================================`);
    console.log(`TESTING ${tech.name}`);
    console.log(`======================================================`);

    const page = await browser.newPage({ viewport: { width: 849, height: 978 } });

    for (const res of RESOLUTIONS) {
      await page.setViewportSize({ width: res.width, height: res.height });
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #061118; color: #fff; font-family: sans-serif; }
          .dashboard-grid {
            display: ${res.width <= 900 ? "flex; flex-direction: column;" : "grid; grid-template-columns: minmax(0, 1.95fr) minmax(320px, 1fr);"}
            gap: 14px;
            padding: 14px;
            width: 100%;
          }
          .floor-card {
            background: #081922;
            border: 1px solid rgba(128,183,200,0.16);
            border-radius: 12px;
            overflow: hidden;
          }
          ${tech.css}
          .floor-overlays {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          .zone-overlay {
            position: absolute;
            padding: 4px 6px;
            background: rgba(4, 17, 24, 0.88);
            border: 1px solid rgba(66, 185, 232, 0.4);
            border-radius: 6px;
            color: #fff;
            font-size: 10px;
          }
          .side-card { background: #081922; min-height: 150px; }
        </style>
      </head>
      <body>
        <div class="dashboard-grid">
          <div class="floor-card">
            <div class="floor-viewport">
              <div class="floor-stage" id="stage">
                <div class="floor-canvas" id="canvas">
                  <div class="floor-picture">
                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1536' height='1024'><rect width='1536' height='1024' fill='%23112233'/></svg>" id="img">
                  </div>
                  <div class="floor-overlays">
                    <div class="zone-overlay" style="left:8%;top:13%;width:22%;" id="ov1">Witronix Admin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="side-card"></div>
        </div>
      </body>
      </html>
      `;

      await page.setContent(html);
      await page.waitForTimeout(50);

      const data = await page.evaluate(() => {
        const stage = document.querySelector("#stage");
        const canvas = document.querySelector("#canvas");
        const img = document.querySelector("#img");
        const vp = document.querySelector(".floor-viewport");
        const ov1 = document.querySelector("#ov1");

        const sRect = stage?.getBoundingClientRect();
        const cRect = canvas?.getBoundingClientRect();
        const iRect = img?.getBoundingClientRect();
        const vRect = vp?.getBoundingClientRect();
        const oRect = ov1?.getBoundingClientRect();

        return {
          vp: { w: Math.round(vRect.width), h: Math.round(vRect.height) },
          stage: { w: Math.round(sRect.width), h: Math.round(sRect.height) },
          img: { w: Math.round(iRect.width), h: Math.round(iRect.height) },
          aspectRatio: sRect && sRect.height > 0 ? (sRect.width / sRect.height).toFixed(4) : "NaN",
          fitsInVp: sRect && vRect ? (
            sRect.left >= vRect.left - 1 &&
            sRect.right <= vRect.right + 1 &&
            sRect.top >= vRect.top - 1 &&
            sRect.bottom <= vRect.bottom + 1
          ) : false,
          imgMatchesStage: sRect && iRect ? (
            Math.abs(sRect.width - iRect.width) < 1 &&
            Math.abs(sRect.height - iRect.height) < 1
          ) : false,
          ov1RelLeft: sRect && oRect ? ((oRect.left - sRect.left) / sRect.width * 100).toFixed(1) : "NaN",
          ov1RelTop: sRect && oRect ? ((oRect.top - sRect.top) / sRect.height * 100).toFixed(1) : "NaN",
        };
      });

      console.log(`Res ${res.name.padEnd(10)} | VP: ${data.vp.w}x${data.vp.h} | Stage: ${data.stage.w}x${data.stage.h} (AR: ${data.aspectRatio}) | Fits: ${data.fitsInVp} | ImgMatch: ${data.imgMatchesStage} | OvLeft: ${data.ov1RelLeft}% | OvTop: ${data.ov1RelTop}%`);
    }
    await page.close();
  }

  await browser.close();
}

testTechniques().catch(console.error);
