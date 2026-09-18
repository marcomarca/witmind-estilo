param(
  [Parameter(Mandatory = $true)][ValidatePattern('^\d+\.\d+\.\d+$')][string]$Version,
  [string]$DestinationRoot = "\\192.168.20.232\config\www\witmind-ui\releases"
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$runtimeNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$vite = Join-Path $repoRoot "node_modules\.bin\vite.cmd"
$buildDir = Join-Path $repoRoot "dist-panel"
$releaseDir = Join-Path $DestinationRoot $Version

if (Test-Path -LiteralPath $releaseDir) { throw "La release $Version ya existe; no se sobrescribe." }
if (-not (Test-Path -LiteralPath $vite)) { throw "No se encontró Vite local en $vite" }
if (-not (Test-Path -LiteralPath $runtimeNode)) { $runtimeNode = "node" }

& $runtimeNode (Join-Path $repoRoot "node_modules\typescript\bin\tsc") --noEmit
& $vite build --mode panel
if ($LASTEXITCODE -ne 0) { throw "Falló el build panel." }

New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null
Copy-Item -LiteralPath (Join-Path $buildDir "witmind-ui.html") -Destination (Join-Path $releaseDir "index.html")
Get-ChildItem -LiteralPath $buildDir -Directory | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $releaseDir -Recurse
}

$localReleaseDir = Join-Path $repoRoot "home-assistant\www\witmind-ui\releases\$Version"
New-Item -ItemType Directory -Force -Path $localReleaseDir | Out-Null
Copy-Item -LiteralPath (Join-Path $buildDir "witmind-ui.html") -Destination (Join-Path $localReleaseDir "index.html")
Get-ChildItem -LiteralPath $buildDir -Directory | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $localReleaseDir -Recurse
}

Write-Host "Release $Version preparada en $releaseDir y sincronizada localmente en $localReleaseDir. Ejecuta promote.ps1 para cambiar current.json."
