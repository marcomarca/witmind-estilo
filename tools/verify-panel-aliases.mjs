import { chromium } from "playwright";
import { resolve } from "node:path";

const expected = {
  "witmind-ui-panel": "showroom",
  "witmind-lobby-panel": "lobby",
  "witmind-general-panel": "general",
  "oficinas-panel": "offices",
  "sala-grabacion-panel": "recording",
  "witmind-calendario-laboral-panel": "calendar",
  "notifications-panel": "notifications",
  "control-general-panel": "control",
  "witmind-energy-panel": "energy",
};

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setContent("<!doctype html><html><body></body></html>");
  await page.addScriptTag({ path: resolve("home-assistant/www/witmind-ui-panel.js") });
  const result = await page.evaluate((entries) => Object.fromEntries(entries.map(([tag, panelId]) => {
    const Constructor = customElements.get(tag);
    if (!Constructor) return [tag, { registered: false, panelId: null, panelKind: null }];
    const element = new Constructor();
    const config = element._config();
    return [tag, { registered: true, panelId: config.panel_id, panelKind: config.panel_kind }];
  })), Object.entries(expected));

  for (const [tag, panelId] of Object.entries(expected)) {
    const actual = result[tag];
    const kindMatches = tag === "witmind-ui-panel" ? actual?.panelKind == null : actual?.panelKind === panelId;
    if (!actual?.registered || actual.panelId !== panelId || !kindMatches) {
      throw new Error(`Alias inválido ${tag}: ${JSON.stringify(actual)}; esperado ${panelId}`);
    }
  }
  console.log(JSON.stringify(result));
} finally {
  await browser.close();
}
