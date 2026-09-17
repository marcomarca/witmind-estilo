import { chromium } from "playwright";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const PORT = 8199;
const ROOT_DIR = path.resolve(".");

// Simple static file server
function startServer(): Promise<http.Server> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(ROOT_DIR, decodeURIComponent(req.url || "/"));
      if (filePath.endsWith("/") || fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes: Record<string, string> = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".woff2": "font/woff2",
        ".png": "image/png",
        ".svg": "image/svg+xml"
      };

      const contentType = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(PORT, () => {
      console.log(`[HTTP] Serving on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

interface ElementMetrics {
  selector: string;
  description: string;
  rect: { x: number; y: number; width: number; height: number };
  computed: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    color: string;
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    padding: string;
    margin: string;
    gap: string;
    boxShadow: string;
    backdropFilter: string;
    display: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
  };
}

const SELECTORS_TO_MEASURE = [
  { selector: ":host", desc: "Root Host Component" },
  { selector: ".app-frame", desc: "Main Application Frame / Shell" },
  { selector: ".header", desc: "Header Container" },
  { selector: ".brand-block", desc: "Brand Block" },
  { selector: ".brand-name", desc: "Brand Title (WITMIND)" },
  { selector: ".brand-site", desc: "Brand Subtitle (SHOWROOM)" },
  { selector: ".pills-strip", desc: "Status Pills Strip" },
  { selector: ".status-pill", desc: "Status Pill (Single Item)" },
  { selector: ".pill-title", desc: "Status Pill Value / Title" },
  { selector: ".pill-meta", desc: "Status Pill Meta Label" },
  { selector: ".clock-digits", desc: "Header Clock Digits" },
  { selector: ".date-label", desc: "Header Date Label" },
  { selector: ".theme-toggle-btn", desc: "Theme Toggle Button" },
  { selector: ".hero-card", desc: "Hero Card Widget" },
  { selector: ".hero-kicker", desc: "Hero Kicker Tag" },
  { selector: ".hero-title", desc: "Hero Main Title" },
  { selector: ".hero-caption", desc: "Hero Status Caption" },
  { selector: ".hero-segmented-nav", desc: "Hero Segmented Navigation Bar" },
  { selector: ".nav-segment-btn", desc: "Navigation Segment Button" },
  { selector: ".nav-segment-btn.is-selected", desc: "Navigation Segment Button (Selected)" },
  { selector: ".grid-top-quad", desc: "Top Quad Grid (4-column layout)" },
  { selector: ".weather-card", desc: "Weather Widget Card" },
  { selector: ".weather-kpi-block .kpi-display", desc: "Weather Temperature KPI" },
  { selector: ".weather-kpi-block .kpi-sub-label", desc: "Weather State & Humidity" },
  { selector: ".weather-week-strip", desc: "Weather Forecast Weekly Strip" },
  { selector: ".fc-col", desc: "Weather Forecast Single Column" },
  { selector: ".energy-card", desc: "Energy Widget Card" },
  { selector: ".energy-kpi-block .kpi-display", desc: "Energy Watts KPI" },
  { selector: ".sparkline-bars", desc: "Energy Sparkline Container" },
  { selector: ".gauge-card", desc: "Power Gauge Widget Card" },
  { selector: ".gauge-box", desc: "Power Gauge Circular Box" },
  { selector: ".gauge-value", desc: "Gauge Center Percentage" },
  { selector: ".gauge-sub", desc: "Gauge Center Watts Sub-label" },
  { selector: ".gauge-footer-note", desc: "Gauge Footer Note" },
  { selector: ".ambience-card", desc: "Ambience Widget Card" },
  { selector: ".ambience-card .status-badge", desc: "Ambience Preset/Manual Badge" },
  { selector: ".ambience-title", desc: "Ambience Scene Title" },
  { selector: ".ambience-sub", desc: "Ambience Description Sub-label" },
  { selector: ".grid-mid-trio", desc: "Mid Trio Grid (3-column layout)" },
  { selector: ".rooms-card", desc: "Rooms & Zones Card" },
  { selector: ".room-row", desc: "Room / Zone Item Row" },
  { selector: ".room-title", desc: "Room Row Title" },
  { selector: ".room-tag", desc: "Room Row Badge Tag" },
  { selector: ".shortcuts-card", desc: "Shortcuts Card (2x3 Grid)" },
  { selector: ".shortcuts-grid", desc: "Shortcuts Grid Container" },
  { selector: ".sc-item", desc: "Shortcut Grid Item Button" },
  { selector: ".sc-heading", desc: "Shortcut Item Heading" },
  { selector: ".sc-sub-text", desc: "Shortcut Item Subtext" },
  { selector: ".calendar-card", desc: "Calendar Agenda Card" },
  { selector: ".agenda-subhead", desc: "Agenda Group Subhead (HOY/MAÑANA)" },
  { selector: ".event-item", desc: "Calendar Event Item" },
  { selector: ".event-hour", desc: "Calendar Event Hour" },
  { selector: ".event-title", desc: "Calendar Event Title" },
  { selector: ".wit-dock", desc: "Bottom Floating Dock (Nav)" },
  { selector: ".dock-btn", desc: "Dock Action Button" },
  { selector: ".dock-dots-group", desc: "Dock Page Indicator Dots Group" },
  { selector: ".dock-dot.is-active", desc: "Dock Active Page Dot" }
];

async function measurePage(browser: any, url: string, theme: "dark" | "light", width: number, height: number) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500); // Allow custom elements & mock data to render

  const measurements = await page.evaluate((selectors: typeof SELECTORS_TO_MEASURE) => {
    const el = document.querySelector("showroom-witmind-os") as any;
    const shadow = el?.shadowRoot;
    if (!shadow) return { error: "No shadowRoot found on <showroom-witmind-os>" };

    const hostStyles = window.getComputedStyle(el);
    const results: any[] = [];

    for (const item of selectors) {
      let targetEl: Element | null = null;
      if (item.selector === ":host") {
        targetEl = el;
      } else {
        targetEl = shadow.querySelector(item.selector);
      }

      if (!targetEl) {
        results.push({ selector: item.selector, description: item.desc, notFound: true });
        continue;
      }

      const rect = targetEl.getBoundingClientRect();
      const style = window.getComputedStyle(targetEl);

      results.push({
        selector: item.selector,
        description: item.desc,
        rect: {
          x: Math.round(rect.x * 100) / 100,
          y: Math.round(rect.y * 100) / 100,
          width: Math.round(rect.width * 100) / 100,
          height: Math.round(rect.height * 100) / 100
        },
        computed: {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          color: style.color,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          borderWidth: style.borderWidth,
          borderStyle: style.borderStyle,
          borderRadius: style.borderRadius,
          padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
          margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
          gap: style.gap,
          boxShadow: style.boxShadow,
          backdropFilter: style.backdropFilter || style.webkitBackdropFilter || "none",
          display: style.display,
          flexDirection: style.flexDirection,
          justifyContent: style.justifyContent,
          alignItems: style.alignItems
        }
      });
    }

    // Also measure CSS Custom Properties declared on host
    const cssVars: Record<string, string> = {};
    const varNames = [
      "--accent", "--accent-hover", "--accent-soft", "--accent-border", "--accent-glow",
      "--state-success", "--state-warning", "--state-danger",
      "--font-ui", "--s1", "--s2", "--s3", "--s4", "--s5", "--s6",
      "--r-control", "--r-card", "--r-panel", "--r-pill",
      "--motion-fast", "--motion-normal", "--motion-slow", "--ease-apple",
      "--canvas", "--surface", "--surface-raised", "--surface-interactive", "--glass",
      "--text-1", "--text-2", "--text-3", "--line"
    ];

    for (const v of varNames) {
      cssVars[v] = hostStyles.getPropertyValue(v).trim();
    }

    return { results, cssVars };
  }, SELECTORS_TO_MEASURE);

  // Now measure the sheet modal by opening it
  const sheetMeasurement = await page.evaluate(() => {
    const el = document.querySelector("showroom-witmind-os") as any;
    if (el && el._openSheet) {
      el._openSheet("lights");
    }
    const shadow = el?.shadowRoot;
    const modal = shadow?.querySelector(".sheet-modal");
    const switchRow = shadow?.querySelector(".switch-row");
    const switchToggle = shadow?.querySelector(".switch-toggle");

    if (!modal) return null;

    const modalRect = modal.getBoundingClientRect();
    const modalStyle = window.getComputedStyle(modal);

    const rowRect = switchRow?.getBoundingClientRect();
    const rowStyle = switchRow ? window.getComputedStyle(switchRow) : null;

    const toggleRect = switchToggle?.getBoundingClientRect();
    const toggleStyle = switchToggle ? window.getComputedStyle(switchToggle) : null;

    return {
      modal: {
        rect: { width: Math.round(modalRect.width), height: Math.round(modalRect.height) },
        borderRadius: modalStyle.borderRadius,
        padding: `${modalStyle.paddingTop} ${modalStyle.paddingRight} ${modalStyle.paddingBottom} ${modalStyle.paddingLeft}`,
        gap: modalStyle.gap,
        backgroundColor: modalStyle.backgroundColor,
        boxShadow: modalStyle.boxShadow,
        border: `${modalStyle.borderWidth} ${modalStyle.borderStyle} ${modalStyle.borderColor}`
      },
      switchRow: rowStyle ? {
        rect: { width: Math.round(rowRect!.width), height: Math.round(rowRect!.height) },
        borderRadius: rowStyle.borderRadius,
        padding: `${rowStyle.paddingTop} ${rowStyle.paddingRight} ${rowStyle.paddingBottom} ${rowStyle.paddingLeft}`,
        backgroundColor: rowStyle.backgroundColor,
        border: `${rowStyle.borderWidth} ${rowStyle.borderStyle} ${rowStyle.borderColor}`
      } : null,
      switchToggle: toggleStyle ? {
        rect: { width: Math.round(toggleRect!.width), height: Math.round(toggleRect!.height) },
        borderRadius: toggleStyle.borderRadius,
        backgroundColor: toggleStyle.backgroundColor,
        border: `${toggleStyle.borderWidth} ${toggleStyle.borderStyle} ${toggleStyle.borderColor}`
      } : null
    };
  });

  await page.close();

  return {
    theme,
    viewport: `${width}x${height}`,
    timestamp: new Date().toISOString(),
    cssTokens: measurements.cssVars,
    elements: measurements.results,
    sheetModal: sheetMeasurement
  };
}

async function run() {
  const outputDir = path.resolve("./reference-analysis");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const server = await startServer();
  const browser = await chromium.launch();

  const configs = [
    { theme: "dark" as const, width: 1366, height: 768, file: "dark-1366x768.json" },
    { theme: "light" as const, width: 1366, height: 768, file: "light-1366x768.json" },
    { theme: "dark" as const, width: 1440, height: 900, file: "dark-1440x900.json" },
    { theme: "light" as const, width: 1440, height: 900, file: "light-1440x900.json" }
  ];

  for (const cfg of configs) {
    const url = `http://localhost:${PORT}/reference/witmind-os/${cfg.theme}.html`;
    console.log(`[MEASURING] ${cfg.theme} @ ${cfg.width}x${cfg.height}...`);
    const data = await measurePage(browser, url, cfg.theme, cfg.width, cfg.height);
    const dest = path.join(outputDir, cfg.file);
    fs.writeFileSync(dest, JSON.stringify(data, null, 2), "utf-8");
    console.log(`[SAVED] -> ${dest}`);
  }

  await browser.close();
  server.close();
  console.log("\n[SUCCESS] All Golden Reference metrics captured and saved.");
}

run().catch((err) => {
  console.error("[ERROR]", err);
  process.exit(1);
});
