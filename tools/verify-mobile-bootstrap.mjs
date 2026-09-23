import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => {
  document.body.innerHTML = '<iframe id="panel" src="/witmind-ui.html?bootstrap-test=1" style="width:390px;height:844px;border:0"></iframe>';
});
const frame = page.frameLocator("#panel");
await frame.locator("witmind-ui-app").waitFor();

const beforeInit = await frame.locator("witmind-ui-app").evaluate((app) => ({
  boot: Boolean(app.shadowRoot?.querySelector(".boot")),
  workspaces: app.shadowRoot?.querySelectorAll("witmind-workspace").length || 0,
}));
await frame.locator("witmind-ui-app").evaluate(() => {
  const prototype = customElements.get("witmind-operations-panel")?.prototype;
  if (!prototype || prototype.__bootstrapRenderProbe) return;
  const render = prototype._render;
  window.__operationsRenderCount = 0;
  prototype._render = function (...args) {
    window.__operationsRenderCount += 1;
    return render.apply(this, args);
  };
  prototype.__bootstrapRenderProbe = true;
});

const init = {
  protocol: 1,
  source: "witmind-ha",
  type: "WITMIND_INIT",
  panelConfig: { panel_id: "offices", panel_kind: "offices" },
  narrow: true,
  theme: "dark",
  user: { is_admin: true, name: "QA" },
};
await page.evaluate((message) => {
  const child = document.querySelector("#panel")?.contentWindow;
  child?.postMessage(message, "*");
  child?.postMessage(message, "*");
}, init);
await page.waitForTimeout(250);

const afterInit = await frame.locator("witmind-ui-app").evaluate((app) => {
  const workspace = app.shadowRoot?.querySelector("witmind-workspace");
  window.__witmindWorkspaceIdentity = workspace;
  return {
    workspaces: app.shadowRoot?.querySelectorAll("witmind-workspace").length || 0,
    active: workspace?.shadowRoot?.querySelector('.page')?.getAttribute("data-panel-id") || workspace?._activeId,
    renders: window.__operationsRenderCount,
  };
});

await page.evaluate((message) => document.querySelector("#panel")?.contentWindow?.postMessage(message, "*"), init);
await page.waitForTimeout(100);
const afterDuplicate = await frame.locator("witmind-ui-app").evaluate((app) => {
  const workspace = app.shadowRoot?.querySelector("witmind-workspace");
  return {
    sameWorkspace: workspace === window.__witmindWorkspaceIdentity,
    active: workspace?.shadowRoot?.querySelector('.page')?.getAttribute("data-panel-id") || workspace?._activeId,
    renders: window.__operationsRenderCount,
  };
});

if (!beforeInit.boot || beforeInit.workspaces !== 0 || afterInit.workspaces !== 1 || afterInit.active !== "offices" || !afterDuplicate.sameWorkspace || afterDuplicate.active !== "offices" || afterDuplicate.renders !== afterInit.renders) {
  throw new Error(`Bootstrap no idempotente: ${JSON.stringify({ beforeInit, afterInit, afterDuplicate })}`);
}

console.log(JSON.stringify({ viewport: "390x844", beforeInit, afterInit, afterDuplicate }));
await browser.close();
