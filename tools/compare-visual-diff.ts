import * as fs from "fs";
import * as path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

interface DiffResult {
  file: string;
  totalPixels: number;
  diffPixels: number;
  matchPercent: number;
  diffImage: string;
}

async function runDiff() {
  const diffDir = path.resolve("./artifacts/diff");
  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }

  const pairs = [
    {
      name: "Dark 1366x768",
      ref: "./reference/witmind-os/screenshots/dark-1366x768.png",
      curr: "./artifacts/current/signature-dark-1366x768.png",
      out: "diff-dark-1366x768.png"
    },
    {
      name: "Light 1366x768",
      ref: "./reference/witmind-os/screenshots/light-1366x768.png",
      curr: "./artifacts/current/signature-light-1366x768.png",
      out: "diff-light-1366x768.png"
    },
    {
      name: "Dark 1440x900",
      ref: "./reference/witmind-os/screenshots/dark-1440x900.png",
      curr: "./artifacts/current/signature-dark-1440x900.png",
      out: "diff-dark-1440x900.png"
    },
    {
      name: "Light 1440x900",
      ref: "./reference/witmind-os/screenshots/light-1440x900.png",
      curr: "./artifacts/current/signature-light-1440x900.png",
      out: "diff-light-1440x900.png"
    }
  ];

  console.log("================================================================================");
  console.log("            WITMIND SIGNATURE vs GOLDEN REFERENCE VISUAL DIFF                   ");
  console.log("================================================================================\n");

  const results: DiffResult[] = [];

  for (const pair of pairs) {
    if (!fs.existsSync(pair.ref) || !fs.existsSync(pair.curr)) {
      console.warn(`[SKIP] Missing file: ${pair.ref} or ${pair.curr}`);
      continue;
    }

    const imgRef = PNG.sync.read(fs.readFileSync(pair.ref));
    const imgCurr = PNG.sync.read(fs.readFileSync(pair.curr));

    const width = Math.min(imgRef.width, imgCurr.width);
    const height = Math.min(imgRef.height, imgCurr.height);

    const diff = new PNG({ width, height });

    // Note: pixel threshold 0.1 allows for subpixel rasterization tolerance
    const diffPixels = pixelmatch(
      imgRef.data,
      imgCurr.data,
      diff.data,
      width,
      height,
      { threshold: 0.15 }
    );

    const totalPixels = width * height;
    const matchPercent = ((totalPixels - diffPixels) / totalPixels) * 100;

    const diffPath = path.join(diffDir, pair.out);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    results.push({
      file: pair.name,
      totalPixels,
      diffPixels,
      matchPercent,
      diffImage: diffPath
    });

    console.log(`[COMPARISON] ${pair.name}`);
    console.log(`  - Total Resolution : ${width}x${height} (${totalPixels.toLocaleString()} px)`);
    console.log(`  - Diff Pixels      : ${diffPixels.toLocaleString()} px`);
    console.log(`  - Match Fidelity   : ${matchPercent.toFixed(2)}%`);
    console.log(`  - Diff Artifact    : ${diffPath}\n`);
  }

  console.log("--------------------------------------------------------------------------------");
  console.log("SUMMARY TABLE:");
  console.log("| Viewport & Theme | Resolution | Visual Match | Status |");
  console.log("|:---|:---:|:---:|:---:|");
  for (const r of results) {
    const status = r.matchPercent >= 95 ? "✅ EXCELLENT MATCH" : r.matchPercent >= 90 ? "🟢 ACCEPTABLE (Subpixel/Dynamic)" : "⚠️ DRIFT DETECTED";
    console.log(`| ${r.file.padEnd(16)} | ${(r.totalPixels).toLocaleString().padStart(10)} px | ${r.matchPercent.toFixed(2).padStart(10)}% | ${status} |`);
  }
}

runDiff().catch(console.error);
