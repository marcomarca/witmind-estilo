import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await page.goto("http://127.0.0.1:5174/witmind-ui.html", { waitUntil: "networkidle" });
await page.evaluate(() => window.postMessage({
  protocol: 1,
  source: "witmind-ha",
  type: "WITMIND_INIT",
  panelConfig: { panel_id: "offices", panel_kind: "offices" },
  theme: "dark",
}, "*"));
await page.waitForTimeout(250);

const swipe = async (points) => page.evaluate(async (samples) => {
  const app = document.querySelector("witmind-ui-app");
  const workspace = app?.shadowRoot?.querySelector("witmind-workspace");
  const track = workspace?.shadowRoot?.querySelector("[data-track]");
  if (!track) throw new Error("No se encontró el track");
  const emit = (type, clientX, clientY = 400) => track.dispatchEvent(new PointerEvent(type, {
    bubbles: true,
    composed: true,
    cancelable: true,
    pointerId: 7,
    pointerType: "touch",
    isPrimary: true,
    clientX,
    clientY,
    buttons: type === "pointerup" ? 0 : 1,
  }));
  emit("pointerdown", samples[0]);
  for (const x of samples.slice(1, -1)) emit("pointermove", x);
  // Deliberately reproduce Android/WebView's zeroed pointerup coordinate.
  emit("pointerup", samples.at(-1));
  await new Promise((resolve) => setTimeout(resolve, 340));
  return workspace.shadowRoot.querySelector('.dot[aria-current="page"]')?.getAttribute("data-panel");
}, points);

const afterLeft = await swipe([320, 250, 110, 0]);
const afterRight = await swipe([80, 150, 250, 0]);
if (afterLeft !== "recording" || afterRight !== "offices") {
  throw new Error(`Dirección incorrecta: izquierda=${afterLeft}, derecha=${afterRight}`);
}
console.log(JSON.stringify({ viewport: "390x844", afterLeft, afterRight }));
await browser.close();
