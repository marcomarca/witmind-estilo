import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const testStyles = [
    {
      name: "style-1-width-auto-height-auto",
      css: `
        .floor-viewport { display: flex; align-items: center; justify-content: center; }
        .floor-stage { position: relative; aspect-ratio: 1.5; max-width: 100%; max-height: 100%; width: auto; height: auto; margin: auto; }
        .floor-canvas { position: relative; width: 100%; height: 100%; }
        .floor-picture { display: block; width: 100%; height: 100%; }
        .floor-picture img { display: block; width: 100%; height: 100%; object-fit: contain; }
      `
    },
    {
      name: "style-2-grid-contain",
      css: `
        .floor-viewport { display: grid; place-items: center; }
        .floor-stage { position: relative; aspect-ratio: 1.5; width: min(100%, calc(100% * 1.5)); max-width: 100%; max-height: 100%; height: auto; }
        .floor-canvas { position: relative; width: 100%; height: 100%; }
        .floor-picture { display: block; width: 100%; height: 100%; }
        .floor-picture img { display: block; width: 100%; height: 100%; object-fit: contain; }
      `
    },
    {
      name: "style-3-fit-stage",
      css: `
        .floor-viewport { position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .floor-stage { position: relative; aspect-ratio: 1536 / 1024; width: 100%; height: 100%; max-width: 100%; max-height: 100%; display: flex; align-items: center; justify-content: center; }
        .floor-canvas { position: relative; width: 100%; height: 100%; max-width: 100%; max-height: 100%; aspect-ratio: inherit; }
        .floor-picture { display: block; width: 100%; height: 100%; }
        .floor-picture img { display: block; width: 100%; height: 100%; object-fit: contain; }
      `
    },
    {
      name: "style-4-cq-or-aspect-contain",
      css: `
        .floor-viewport { position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .floor-stage { position: relative; aspect-ratio: 1536 / 1024; max-width: 100%; max-height: 100%; width: min(100%, calc(100% * 1.5)); height: auto; display: flex; align-items: center; justify-content: center; margin: auto; }
        .floor-canvas { position: relative; width: 100%; height: 100%; aspect-ratio: inherit; }
        .floor-picture { display: block; width: 100%; height: 100%; }
        .floor-picture img { display: block; width: 100%; height: 100%; object-fit: contain; }
      `
    }
  ];

  const viewports = [
    { name: "849x978", width: 849, height: 978, vpW: 819, vpH: 508 }, // in 1-col mode
    { name: "366x794", width: 366, height: 794, vpW: 348, vpH: 333 },
    { name: "1440x900", width: 1440, height: 900, vpW: 912, vpH: 504 },
  ];

  for (const s of testStyles) {
    console.log(`\n=================== TESTING ${s.name} ===================`);
    for (const vp of viewports) {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #071118; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .container { width: ${vp.vpW}px; height: ${vp.vpH}px; background: #112; position: relative; padding: 12px; }
            ${s.css}
          </style>
        </head>
        <body>
          <div class="container floor-viewport">
            <div class="floor-stage" id="stage">
              <div class="floor-canvas" id="canvas">
                <picture class="floor-picture">
                  <img id="img" src="http://127.0.0.1:5174/building/planta-baja-dark.png" width="1536" height="1024" />
                </picture>
                <div class="floor-overlays" id="overlays" style="position:absolute;inset:0;">
                  <div id="ov1" style="position:absolute;left:8%;top:47%;width:22%;height:30px;background:red;">Showroom</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      await page.setContent(html);
      await page.waitForTimeout(100);

      const res = await page.evaluate(() => {
        const stage = document.getElementById("stage")?.getBoundingClientRect();
        const canvas = document.getElementById("canvas")?.getBoundingClientRect();
        const img = document.getElementById("img")?.getBoundingClientRect();
        const ov1 = document.getElementById("ov1")?.getBoundingClientRect();
        const vp = document.querySelector(".floor-viewport")?.getBoundingClientRect();

        return {
          stage: { w: Math.round(stage.width), h: Math.round(stage.height) },
          img: { w: Math.round(img.width), h: Math.round(img.height) },
          ratio: (stage.width / stage.height).toFixed(4),
          containedInVp: stage.width <= vp.width && stage.height <= vp.height,
          ov1RelLeft: Math.round(((ov1.left - stage.left) / stage.width) * 100),
          ov1RelTop: Math.round(((ov1.top - stage.top) / stage.height) * 100),
        };
      });

      console.log(`${vp.name} -> stage: ${res.stage.w}x${res.stage.h} (ratio: ${res.ratio}), img: ${res.img.w}x${res.img.h}, contained: ${res.containedInVp}, ov1Left: ${res.ov1RelLeft}%`);
    }
  }

  await browser.close();
}

run().catch(console.error);
