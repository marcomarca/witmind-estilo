import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
const result = await page.evaluate(async () => {
  window.customPanels = [];
  const script = document.createElement("script");
  script.src = "/home-assistant/www/witmind-ui-panel.js?bridge-test=1";
  document.head.append(script);
  await customElements.whenDefined("witmind-ui-panel");

  const panel = document.createElement("witmind-ui-panel");
  let loads = 0;
  panel._loadFrame = async () => { loads += 1; };
  const initial = { config: { panel_id: "offices", panel_kind: "offices" } };
  panel.panel = initial;
  document.body.replaceChildren(panel);
  await Promise.resolve();
  panel.panel = structuredClone(initial);
  panel.panel = structuredClone(initial);
  const afterDuplicates = loads;
  panel.panel = { config: { panel_id: "recording", panel_kind: "recording" } };
  return { afterDuplicates, afterRealChange: loads };
});

if (result.afterDuplicates !== 1 || result.afterRealChange !== 2) {
  throw new Error(`Bridge no idempotente: ${JSON.stringify(result)}`);
}
console.log(JSON.stringify(result));
await browser.close();
