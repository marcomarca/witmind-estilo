import { chromium } from "playwright";

const RESOLUTIONS = [
  { name: "849x978", width: 849, height: 978 },
  { name: "366x794", width: 366, height: 794 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1200x900", width: 1200, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "390x844", width: 390, height: 844 },
];

async function testSolutions() {
  const browser = await chromium.launch({ headless: true });

  const solutions = [
    {
      name: "Solution 1: SVG viewBox wrapper",
      render: (aspectRatio = 1.5) => `
        <div class="floor-viewport">
          <svg class="floor-stage-svg" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;max-width:100%;max-height:100%;display:block;margin:auto;">
            <foreignObject x="0" y="0" width="1536" height="1024">
              <div xmlns="http://www.w3.org/1999/xhtml" class="floor-canvas" id="canvas" style="position:relative;width:1536px;height:1024px;">
                <div class="floor-picture" style="position:absolute;inset:0;width:100%;height:100%;">
                  <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1536' height='1024'><rect width='1536' height='1024' fill='%23112233'/></svg>" id="img" style="width:100%;height:100%;display:block;">
                </div>
                <div class="floor-overlays" style="position:absolute;inset:0;pointer-events:none;">
                  <div class="zone-overlay" id="ov1" style="position:absolute;left:8%;top:13%;width:22%;background:rgba(4,17,24,0.9);color:#fff;padding:4px 6px;border:1px solid cyan;border-radius:6px;font-size:14px;">Witronix Admin</div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      `
    },
    {
      name: "Solution 2: Pure CSS with min-content / max-content containment or ResizeObserver",
      render: () => `
        <div class="floor-viewport" id="vp">
          <div class="floor-stage" id="stage" style="position:relative;margin:auto;max-width:100%;max-height:100%;">
            <div class="floor-canvas" id="canvas" style="position:relative;width:100%;height:100%;">
              <div class="floor-picture" style="display:block;width:100%;height:100%;">
                <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1536' height='1024'><rect width='1536' height='1024' fill='%23112233'/></svg>" id="img" style="display:block;width:100%;height:100%;">
              </div>
              <div class="floor-overlays" style="position:absolute;inset:0;pointer-events:none;">
                <div class="zone-overlay" id="ov1" style="position:absolute;left:8%;top:13%;width:22%;background:rgba(4,17,24,0.9);color:#fff;padding:4px 6px;border:1px solid cyan;border-radius:6px;font-size:10px;">Witronix Admin</div>
              </div>
            </div>
          </div>
        </div>
        <script>
          const vp = document.getElementById('vp');
          const stage = document.getElementById('stage');
          function updateSize() {
            const padX = 24, padY = 24;
            const availW = Math.max(10, vp.clientWidth - padX);
            const availH = Math.max(10, vp.clientHeight - padY);
            const targetAspect = 1536 / 1024;
            if (availW / availH > targetAspect) {
              stage.style.height = availH + 'px';
              stage.style.width = (availH * targetAspect) + 'px';
            } else {
              stage.style.width = availW + 'px';
              stage.style.height = (availW / targetAspect) + 'px';
            }
          }
          new ResizeObserver(updateSize).observe(vp);
          updateSize();
        </script>
      `
    }
  ];

  for (const sol of solutions) {
    console.log(`\n======================================================`);
    console.log(`TESTING ${sol.name}`);
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
          .side-card { background: #081922; min-height: 150px; }
        </style>
      </head>
      <body>
        <div class="dashboard-grid">
          <div class="floor-card">
            ${sol.render()}
          </div>
          <div class="side-card"></div>
        </div>
      </body>
      </html>
      `;

      await page.setContent(html);
      await page.waitForTimeout(50);

      const data = await page.evaluate(() => {
        const stage = document.querySelector("#stage") || document.querySelector(".floor-stage-svg");
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
          canvas: { w: Math.round(cRect.width), h: Math.round(cRect.height) },
          img: { w: Math.round(iRect.width), h: Math.round(iRect.height) },
          aspectRatio: sRect && sRect.height > 0 ? (sRect.width / sRect.height).toFixed(4) : "NaN",
          fitsInVp: sRect && vRect ? (
            sRect.left >= vRect.left - 1 &&
            sRect.right <= vRect.right + 1 &&
            sRect.top >= vRect.top - 1 &&
            sRect.bottom <= vRect.bottom + 1
          ) : false,
          imgMatchesStage: sRect && iRect ? (
            Math.abs(sRect.width - iRect.width) < 2 &&
            Math.abs(sRect.height - iRect.height) < 2
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

testSolutions().catch(console.error);
