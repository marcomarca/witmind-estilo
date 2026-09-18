import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 389, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => {
  document.body.style.margin = "0";
  document.body.innerHTML = '<iframe id="panel" src="/witmind-ui.html?lobby-mobile-test=1" style="display:block;width:389px;height:844px;border:0"></iframe>';
});
const frame = page.frameLocator("#panel");
await frame.locator("witmind-ui-app").waitFor();

const init = async (theme) => {
  await page.evaluate(({ theme }) => document.querySelector("#panel")?.contentWindow?.postMessage({
    protocol: 1,
    source: "witmind-ha",
    type: "WITMIND_INIT",
    panelConfig: { panel_id: "lobby", panel_kind: "lobby", title: "Lobby", subtitle: "Control operativo" },
    narrow: true,
    theme,
    user: { is_admin: true, name: "QA" },
  }, "*"), { theme });
  await page.waitForTimeout(220);
};

await init("dark");
const inspect = () => frame.locator("witmind-ui-app").evaluate((app) => {
  const workspace = app.shadowRoot?.querySelector("witmind-workspace");
  const panel = workspace?.shadowRoot?.querySelector('section[data-panel-id="lobby"] showroom-panel');
  const root = panel?.shadowRoot;
  const brand = root?.querySelector(".brand")?.getBoundingClientRect();
  const title = root?.querySelector(".workspace-heading > div")?.getBoundingClientRect();
  const navigation = root?.querySelector(".view-navigation")?.getBoundingClientRect();
  return {
    brandVisible: Boolean(brand && brand.width > 0 && brand.height > 0),
    titleVisible: Boolean(title && title.width > 0 && title.height > 0),
    title: root?.querySelector(".workspace-heading h1")?.textContent?.trim(),
    ordered: Boolean(title && navigation && navigation.top >= title.bottom),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});

const dark = await inspect();
await page.screenshot({ path: "artifacts/lobby-mobile-389-dark.png", fullPage: true });
await init("light");
const light = await inspect();
await page.screenshot({ path: "artifacts/lobby-mobile-389-light.png", fullPage: true });

for (const [theme, result] of Object.entries({ dark, light })) {
  if (!result.brandVisible || !result.titleVisible || result.title !== "Lobby" || !result.ordered || result.overflow > 0) {
    throw new Error(`${theme}: ${JSON.stringify(result)}`);
  }
}
console.log(JSON.stringify({ viewport: "389x844", dark, light }));
await browser.close();
