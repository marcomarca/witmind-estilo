#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Configuración de exclusiones e inclusiones
const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "dist-panel",
  "releases",
  "artifacts",
  ".deploy",
  ".vscode",
  ".idea",
  ".gemini",
  "coverage",
  ".cache",
  ".temp-chatgpt-export",
  "exports",
  "chatgpt-export",
]);

const EXCLUDED_EXTENSIONS = new Set([
  // Imágenes raster y multimedia
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".ico",
  ".bmp",
  ".tiff",
  ".mp4",
  ".mov",
  ".webm",
  ".avi",
  // Modelos 3D y binarios pesados
  ".glb",
  ".gltf",
  ".bin",
  ".draco",
  ".fbx",
  ".obj",
  // Archivos comprimidos
  ".zip",
  ".tar",
  ".gz",
  ".tgz",
  ".7z",
  ".rar",
  ".bz2",
  // Fuentes tipográficas
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".eot",
  // Binarios ejecutables y librerías
  ".exe",
  ".dll",
  ".so",
  ".dylib",
  ".class",
  // Logs y temporales
  ".log",
]);

const EXCLUDED_FILES = new Set([
  "Thumbs.db",
  ".DS_Store",
  "package-lock.json", // Opcional: package.json ya tiene todo y ahorra 1MB innecesario en el zip
]);

const INCLUDED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".yaml",
  ".yml",
  ".html",
  ".css",
  ".scss",
  ".md",
  ".txt",
  ".ps1",
  ".sh",
  ".svg",
]);

const INCLUDED_EXACT_NAMES = new Set([
  ".gitignore",
  ".env.example",
  ".editorconfig",
  ".prettierrc",
  ".eslintrc",
  "Dockerfile",
  "run.md",
  "README.md",
]);

function shouldIncludeFile(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  const segments = normalized.split("/");
  const fileName = segments[segments.length - 1];

  // Ignorar carpetas excluidas en cualquier nivel
  for (const seg of segments.slice(0, -1)) {
    if (EXCLUDED_DIRS.has(seg)) return false;
  }

  if (EXCLUDED_FILES.has(fileName)) return false;

  const ext = path.extname(fileName).toLowerCase();
  if (EXCLUDED_EXTENSIONS.has(ext)) return false;

  if (INCLUDED_EXACT_NAMES.has(fileName)) return true;
  if (INCLUDED_EXTENSIONS.has(ext)) return true;

  // Si no tiene extensión y está en raíz (ej. LICENSE), incluir si es texto
  if (!ext && segments.length === 1) return true;

  return false;
}

function scanProject(rootDir, currentDir = "", results = []) {
  const dirPath = path.join(rootDir, currentDir);
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const relPath = path.join(currentDir, entry.name);
    const normalized = relPath.replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      scanProject(rootDir, relPath, results);
    } else if (entry.isFile()) {
      if (shouldIncludeFile(relPath)) {
        const stats = fs.statSync(path.join(rootDir, relPath));
        results.push({
          relPath: normalized,
          size: stats.size,
        });
      }
    }
  }

  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function main() {
  const args = process.argv.slice(2);
  let outputZipName = "witmind-chatgpt-bundle.zip";
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--out" && args[i + 1]) {
      outputZipName = args[i + 1];
      if (!outputZipName.endsWith(".zip")) outputZipName += ".zip";
      i++;
    } else if (args[i] === "--dry-run") {
      dryRun = true;
    } else if (args[i] === "--help" || args[i] === "-h") {
      console.log(`
Uso: bun tools/export-chatgpt-bundle.mjs [opciones]

Opciones:
  --out <nombre.zip>   Nombre del archivo ZIP de salida (por defecto: witmind-chatgpt-bundle.zip)
  --dry-run            Lista los archivos que se incluirían sin crear el archivo ZIP
  --help, -h           Muestra esta ayuda
`);
      process.exit(0);
    }
  }

  const projectRoot = process.cwd();
  console.log("\n📦 \x1b[1;36mWitmind -> ChatGPT Bundle Exporter\x1b[0m");
  console.log("🔍 Escaneando archivos útiles para análisis en LLM...\n");

  const files = scanProject(projectRoot);

  if (files.length === 0) {
    console.error("❌ No se encontraron archivos para empaquetar.");
    process.exit(1);
  }

  // Estadísticas por carpeta
  const folderStats = new Map();
  let totalUncompressedBytes = 0;

  for (const file of files) {
    totalUncompressedBytes += file.size;
    const parts = file.relPath.split("/");
    const topFolder = parts.length > 1 ? parts[0] + "/" : "(raíz)";
    const current = folderStats.get(topFolder) || { count: 0, size: 0 };
    current.count++;
    current.size += file.size;
    folderStats.set(topFolder, current);
  }

  console.log(`📋 \x1b[1mArchivos seleccionados:\x1b[0m ${files.length} archivos`);
  console.log(`📊 \x1b[1mTamaño total sin comprimir:\x1b[0m ${formatBytes(totalUncompressedBytes)}\n`);
  console.log("\x1b[1mResumen por directorio:\x1b[0m");

  const sortedFolders = Array.from(folderStats.entries()).sort((a, b) => b[1].size - a[1].size);
  for (const [folder, stat] of sortedFolders) {
    console.log(`  📁 \x1b[33m${folder.padEnd(18)}\x1b[0m ${stat.count.toString().padStart(4)} archivos | ${formatBytes(stat.size).padStart(9)}`);
  }

  if (dryRun) {
    console.log("\n🔎 Modo --dry-run activo. No se generó ningún archivo ZIP.");
    process.exit(0);
  }

  const stagingDir = path.join(projectRoot, ".temp-chatgpt-export");
  const destZipPath = path.join(projectRoot, outputZipName);

  try {
    // 1. Limpiar staging si existía de antes
    if (fs.existsSync(stagingDir)) {
      fs.rmSync(stagingDir, { recursive: true, force: true });
    }
    fs.mkdirSync(stagingDir, { recursive: true });

    // 2. Copiar archivos respetando la jerarquía exacta
    for (const file of files) {
      const srcFull = path.join(projectRoot, file.relPath);
      const dstFull = path.join(stagingDir, file.relPath);
      const dstDir = path.dirname(dstFull);
      if (!fs.existsSync(dstDir)) {
        fs.mkdirSync(dstDir, { recursive: true });
      }
      fs.copyFileSync(srcFull, dstFull);
    }

    // 3. Crear el ZIP
    if (fs.existsSync(destZipPath)) {
      fs.unlinkSync(destZipPath);
    }

    let method = "tar.exe";
    try {
      execSync(`tar.exe -a -c -f ${JSON.stringify(destZipPath)} *`, {
        cwd: stagingDir,
        stdio: "pipe",
      });
    } catch (_) {
      method = "powershell Compress-Archive";
      execSync(
        `powershell -NoProfile -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${destZipPath}' -Force"`,
        { stdio: "pipe" }
      );
    }

    const zipStats = fs.statSync(destZipPath);
    const ratio = (((totalUncompressedBytes - zipStats.size) / totalUncompressedBytes) * 100).toFixed(1);

    console.log("\n" + "=".repeat(60));
    console.log("✅ \x1b[1;32m¡Paquete para ChatGPT generado con éxito!\x1b[0m");
    console.log(`🗜️  \x1b[1mTamaño del archivo ZIP:\x1b[0m ${formatBytes(zipStats.size)} (reducción de ~${ratio}%)`);
    console.log(`📍 \x1b[1mUbicación:\x1b[0m ${destZipPath}`);
    console.log(`⚙️  Método de empaquetado: ${method}`);
    console.log("🔒 \x1b[1;34mSeguridad Git:\x1b[0m *.zip está configurado en .gitignore (NUNCA se commiteará).");
    console.log("=".repeat(60) + "\n");
    console.log("💡 \x1b[1mListo para subir a ChatGPT:\x1b[0m");
    console.log(`   Simplemente arrastra '${outputZipName}' a tu chat con ChatGPT.`);
    console.log("   ChatGPT podrá descomprimirlo y analizar todo el árbol de carpetas y código de inmediato.\n");
  } finally {
    // 4. Limpieza del directorio temporal
    if (fs.existsSync(stagingDir)) {
      try {
        fs.rmSync(stagingDir, { recursive: true, force: true });
      } catch (_) {}
    }
  }
}

main();
