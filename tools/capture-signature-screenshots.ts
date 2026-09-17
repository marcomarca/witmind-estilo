import { chromium } from "playwright";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const PORT = 8198;
const ROOT_DIR = path.resolve(".");

function startServer(): Promise<http.Server> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(ROOT_DIR, decodeURIComponent(req.url || "/"));
      if (filePath.endsWith("/") || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
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

async function capture() {
  const outputDir = path.resolve("./artifacts/current");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const server = await startServer();
  const browser = await chromium.launch();

  const resolutions = [
    { width: 1366, height: 768, suffix: "1366x768" },
    { width: 1440, height: 900, suffix: "1440x900" }
  ];

  for (const res of resolutions) {
    // Dark
    const darkPage = await browser.newPage({ viewport: { width: res.width, height: res.height } });
    await darkPage.goto(`http://localhost:${PORT}/showroom-witmind-signature.html`, { waitUntil: "networkidle" });
    await darkPage.waitForTimeout(600);
    const darkDest = path.join(outputDir, `signature-dark-${res.suffix}.png`);
    await darkPage.screenshot({ path: darkDest });
    console.log(`[SAVED] -> ${darkDest}`);
    await darkPage.close();

    // Light
    const lightPage = await browser.newPage({ viewport: { width: res.width, height: res.height } });
    await lightPage.goto(`http://localhost:${PORT}/showroom-witmind-signature-light.html`, { waitUntil: "networkidle" });
    await lightPage.waitForTimeout(600);
    const lightDest = path.join(outputDir, `signature-light-${res.suffix}.png`);
    await lightPage.screenshot({ path: lightDest });
    console.log(`[SAVED] -> ${lightDest}`);
    await lightPage.close();
  }

  // Also capture lights sheet modal
  const sheetPage = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await sheetPage.goto(`http://localhost:${PORT}/showroom-witmind-signature.html`, { waitUntil: "networkidle" });
  await sheetPage.waitForTimeout(400);
  await sheetPage.evaluate(() => {
    const el = document.querySelector("showroom-witmind-signature") as any;
    if (el) el._lightsSheetOpen = true;
  });
  await sheetPage.waitForTimeout(400);
  const sheetDest = path.join(outputDir, `signature-sheet-dark-1366x768.png`);
  await sheetPage.screenshot({ path: sheetDest });
  console.log(`[SAVED] -> ${sheetDest}`);
  await sheetPage.close();

  await browser.close();
  server.close();
  console.log("\n[SUCCESS] Visual validation screenshots generated successfully.");
}

capture().catch((err) => {
  console.error("[ERROR]", err);
  process.exit(1);
});
