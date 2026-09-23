import { chromium } from "playwright";

const RESOLUTIONS = [
  { name: "849x978", width: 849, height: 978 },
  { name: "366x794", width: 366, height: 794 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1200x900", width: 1200, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "390x844", width: 390, height: 844 },
];

// Test direct HTML/CSS prototype of the floor plan viewport
async function testPrototype() {
  const browser = await chromium.launch({ headless: true });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #061118; color: #fff; font-family: sans-serif; }
      
      .dashboard-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.95fr) minmax(320px, 1fr);
        gap: 14px;
        padding: 14px;
        width: 100%;
      }
      
      @media (max-width: 900px) {
        .dashboard-grid {
          display: flex;
          flex-direction: column;
          padding: 8px;
        }
      }
      
      .floor-card {
        background: #081922;
        border: 1px solid rgba(128,183,200,0.16);
        border-radius: 12px;
        overflow: hidden;
      }
      
      .card-header {
        padding: 10px 14px;
        border-bottom: 1px solid rgba(128,183,200,0.16);
      }
      
      /* THE CORE VIEWPORT SYSTEM */
      .floor-viewport {
        position: relative;
        width: 100%;
        height: clamp(260px, 50vh, 560px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        overflow: hidden;
        background: radial-gradient(circle at center, rgba(21, 88, 110, 0.22), transparent 65%), #06131a;
      }
      
      .floor-stage {
        position: relative;
        /* Force perfect aspect ratio: */
        aspect-ratio: 1536 / 1024;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        /* object-fit: contain makes the stage box size to fit both dimensions while respecting aspect-ratio in flex: */
        object-fit: contain;
      }
      
      /* Using a container box that exactly fits both W and H with aspect ratio */
      .floor-stage-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }
      
      .floor-stage-box {
        position: relative;
        aspect-ratio: 1536 / 1024;
        max-width: 100%;
        max-height: 100%;
        /* If viewport is wider than 1.5x height: height is 100%, width is height * 1.5 */
        /* If viewport is taller than 1/1.5 width: width is 100%, height is width / 1.5 */
        width: auto;
        height: auto;
      }
      
      .floor-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      
      .floor-picture, .floor-picture img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
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
      
      .side-card {
        background: #081922;
        border: 1px solid rgba(128,183,200,0.16);
        border-radius: 12px;
        padding: 14px;
        min-height: 200px;
      }
    </style>
  </head>
  <body>
    <div class="dashboard-grid">
      <div class="floor-card">
        <div class="card-header">PLANO DEL EDIFICIO</div>
        <div class="floor-viewport">
          <div class="floor-stage-wrapper">
            <div class="floor-stage-box" id="stage">
              <div class="floor-canvas" id="canvas">
                <div class="floor-picture">
                  <img src="/witmind-ui/assets/building-ground-floor.webp" alt="Plano" id="img">
                </div>
                <div class="floor-overlays">
                  <div class="zone-overlay" style="left:8%;top:13%;width:22%;" id="ov1">Witronix Admin</div>
                  <div class="zone-overlay" style="left:8%;top:47%;width:22%;" id="ov2">Showroom</div>
                  <div class="zone-overlay" style="left:38%;top:51%;width:21%;" id="ov3">Lobby</div>
                  <div class="zone-overlay" style="left:65%;top:52%;width:15%;" id="ov4">Grabación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="side-card">Paneles Laterales</div>
    </div>
  </body>
  </html>
  `;

  for (const res of RESOLUTIONS) {
    const page = await browser.newPage({ viewport: { width: res.width, height: res.height } });
    await page.setContent(html);
    await page.waitForTimeout(100);

    const data = await page.evaluate(() => {
      const stage = document.querySelector("#stage");
      const canvas = document.querySelector("#canvas");
      const img = document.querySelector("#img");
      const vp = document.querySelector(".floor-viewport");
      const ov1 = document.querySelector("#ov1");

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
        stageMatchesCanvas: (
          Math.abs(sRect.width - cRect.width) < 1 &&
          Math.abs(sRect.height - cRect.height) < 1
        ),
        stageMatchesImg: (
          Math.abs(sRect.width - iRect.width) < 1 &&
          Math.abs(sRect.height - iRect.height) < 1
        ),
        ov1RelLeft: ((oRect.left - sRect.left) / sRect.width * 100).toFixed(1),
        ov1RelTop: ((oRect.top - sRect.top) / sRect.height * 100).toFixed(1),
      };
    });

    console.log(`Resolution: ${res.name.padEnd(10)} | VP: ${data.vp.w}x${data.vp.h} | Stage: ${data.stage.w}x${data.stage.h} (AR: ${data.aspectRatio}) | Fits: ${data.fitsInVp} | MatchCanvas: ${data.stageMatchesCanvas} | MatchImg: ${data.stageMatchesImg} | OvLeft: ${data.ov1RelLeft}% (exp 8%) | OvTop: ${data.ov1RelTop}% (exp 13%)`);
    await page.close();
  }

  await browser.close();
}

testPrototype().catch(console.error);
