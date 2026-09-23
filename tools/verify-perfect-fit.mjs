import { chromium } from "playwright";

const RESOLUTIONS = [
  { name: "849x978", width: 849, height: 978 },
  { name: "366x794", width: 366, height: 794 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1200x900", width: 1200, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "390x844", width: 390, height: 844 },
];

async function verifyPerfectFit() {
  const browser = await chromium.launch({ headless: true });

  for (const floor of [
    { id: "ground", aspect: 1536 / 1024, expectedAspect: "1.5000" },
    { id: "upper", aspect: 1448 / 1086, expectedAspect: "1.3333" }
  ]) {
    console.log(`\n======================================================`);
    console.log(`TESTING FLOOR: ${floor.id} (Aspect: ${floor.expectedAspect})`);
    console.log(`======================================================`);

    for (const res of RESOLUTIONS) {
      const page = await browser.newPage({ viewport: { width: res.width, height: res.height } });
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
          .floor-viewport {
            position: relative;
            width: 100%;
            height: clamp(260px, 50vh, 560px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px;
            overflow: hidden;
            background: #06131a;
          }
          .floor-stage {
            position: relative;
            margin: auto;
            flex-shrink: 0;
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
            <div class="floor-viewport" id="vp">
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

      // Perform the layout calculation
      const data = await page.evaluate((aspect) => {
        const vp = document.getElementById("vp");
        const stage = document.getElementById("stage");
        const canvas = document.getElementById("canvas");
        const img = document.getElementById("img");
        const ov1 = document.getElementById("ov1");

        const rect = vp.getBoundingClientRect();
        const padX = 24; // 12px left + 12px right
        const padY = 24; // 12px top + 12px bottom
        const availW = Math.max(10, rect.width - padX);
        const availH = Math.max(10, rect.height - padY);

        if (availW / availH > aspect) {
          stage.style.height = `${availH}px`;
          stage.style.width = `${Math.round(availH * aspect * 10) / 10}px`;
        } else {
          stage.style.width = `${availW}px`;
          stage.style.height = `${Math.round((availW / aspect) * 10) / 10}px`;
        }

        const sRect = stage.getBoundingClientRect();
        const cRect = canvas.getBoundingClientRect();
        const iRect = img.getBoundingClientRect();
        const vRect = vp.getBoundingClientRect();
        const oRect = ov1.getBoundingClientRect();

        return {
          vp: { w: Math.round(vRect.width), h: Math.round(vRect.height) },
          stage: { w: Math.round(sRect.width), h: Math.round(sRect.height) },
          canvas: { w: Math.round(cRect.width), h: Math.round(cRect.height) },
          img: { w: Math.round(iRect.width), h: Math.round(iRect.height) },
          aspectRatio: (sRect.width / sRect.height).toFixed(4),
          fitsInVp: (
            sRect.left >= vRect.left - 1 &&
            sRect.right <= vRect.right + 1 &&
            sRect.top >= vRect.top - 1 &&
            sRect.bottom <= vRect.bottom + 1
          ),
          imgMatchesStage: (
            Math.abs(sRect.width - iRect.width) < 1 &&
            Math.abs(sRect.height - iRect.height) < 1
          ),
          ov1RelLeft: ((oRect.left - sRect.left) / sRect.width * 100).toFixed(1),
          ov1RelTop: ((oRect.top - sRect.top) / sRect.height * 100).toFixed(1),
        };
      }, floor.aspect);

      console.log(`Res ${res.name.padEnd(10)} | VP: ${data.vp.w}x${data.vp.h} | Stage: ${data.stage.w}x${data.stage.h} (AR: ${data.aspectRatio}) | Fits: ${data.fitsInVp} | ImgMatch: ${data.imgMatchesStage} | OvLeft: ${data.ov1RelLeft}% (8.0%) | OvTop: ${data.ov1RelTop}% (13.0%)`);
      await page.close();
    }
  }

  await browser.close();
}

verifyPerfectFit().catch(console.error);
