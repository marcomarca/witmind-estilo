import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = path.resolve(".");
const PUBLIC_BUILDING_DIR = path.join(ROOT_DIR, "public", "building");
const DOCS_REF_DIR = path.join(ROOT_DIR, "docs", "reference", "building-bms");

const SOURCES = [
  { name: "planta-baja-dark", source: "planta-baja-dark.png" },
  { name: "planta-baja-light", source: "planta-baja-light.png" },
  { name: "planta-alta-dark", source: "planta-alta-dark.png" },
  { name: "planta-alta-light", source: "planta-alta-light.png" },
];

fs.mkdirSync(PUBLIC_BUILDING_DIR, { recursive: true });
fs.mkdirSync(DOCS_REF_DIR, { recursive: true });

async function processImage({ name, source }) {
  const sourcePath = path.join(ROOT_DIR, source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Archivo fuente no encontrado: ${sourcePath}`);
  }

  const origStat = fs.statSync(sourcePath);
  console.log(`\nProcesando ${source} (${(origStat.size / 1024).toFixed(1)} KB)...`);

  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  console.log(`  Dimensiones: ${metadata.width}x${metadata.height}`);

  // 1. Optimizar PNG (Paleta de 256 colores, calidad 95, compresión máxima)
  const pngBuffer = await sharp(sourcePath)
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 95,
      effort: 10,
      adaptiveFiltering: true,
    })
    .toBuffer();

  // 2. Generar WebP (Calidad 90, esfuerzo 6)
  const webpBuffer = await sharp(sourcePath)
    .webp({
      quality: 90,
      effort: 6,
    })
    .toBuffer();

  console.log(`  -> PNG optimizado: ${(pngBuffer.length / 1024).toFixed(1)} KB (-${((1 - pngBuffer.length / origStat.size) * 100).toFixed(1)}%)`);
  console.log(`  -> WebP optimizado: ${(webpBuffer.length / 1024).toFixed(1)} KB (-${((1 - webpBuffer.length / origStat.size) * 100).toFixed(1)}%)`);

  // Guardar en public/building/
  const pubPng = path.join(PUBLIC_BUILDING_DIR, `${name}.png`);
  const pubWebp = path.join(PUBLIC_BUILDING_DIR, `${name}.webp`);
  fs.writeFileSync(pubPng, pngBuffer);
  fs.writeFileSync(pubWebp, webpBuffer);

  // Guardar en docs/reference/building-bms/
  fs.writeFileSync(path.join(DOCS_REF_DIR, `${name}.png`), pngBuffer);
  fs.writeFileSync(path.join(DOCS_REF_DIR, `${name}.webp`), webpBuffer);
}

async function main() {
  console.log("=== INICIANDO OPTIMIZACIÓN DE PLANOS 2D ===");

  for (const item of SOURCES) {
    await processImage(item);
  }

  // Copias de retrocompatibilidad (default apunta a dark)
  const groundDarkPng = fs.readFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-baja-dark.png"));
  const groundDarkWebp = fs.readFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-baja-dark.webp"));
  const upperDarkPng = fs.readFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-alta-dark.png"));
  const upperDarkWebp = fs.readFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-alta-dark.webp"));

  fs.writeFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-baja.png"), groundDarkPng);
  fs.writeFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-baja.webp"), groundDarkWebp);
  fs.writeFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-alta.png"), upperDarkPng);
  fs.writeFileSync(path.join(PUBLIC_BUILDING_DIR, "planta-alta.webp"), upperDarkWebp);

  fs.writeFileSync(path.join(DOCS_REF_DIR, "planta-baja.png"), groundDarkPng);
  fs.writeFileSync(path.join(DOCS_REF_DIR, "planta-baja.webp"), groundDarkWebp);
  fs.writeFileSync(path.join(DOCS_REF_DIR, "planta-alta.png"), upperDarkPng);
  fs.writeFileSync(path.join(DOCS_REF_DIR, "planta-alta.webp"), upperDarkWebp);

  console.log("\n Copias de compatibilidad (planta-baja.png, planta-alta.png) actualizadas.");
  console.log("=== PROCESAMIENTO COMPLETADO CON ÉXITO ===");
}

main().catch((err) => {
  console.error("Error optimizando imágenes:", err);
  process.exit(1);
});
