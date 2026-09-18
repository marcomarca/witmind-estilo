param(
  [Parameter(Mandatory = $true)][ValidatePattern('^\d+\.\d+\.\d+$')][string]$Version,
  [string]$Root = "\\192.168.20.232\config\www\witmind-ui"
)

$ErrorActionPreference = "Stop"
$releaseDir = Join-Path (Join-Path $Root "releases") $Version
if (-not (Test-Path -LiteralPath (Join-Path $releaseDir "index.html"))) { throw "No existe una release completa para $Version." }
$manifest = [ordered]@{ version = $Version; channel = "stable"; updated_at = [DateTime]::UtcNow.ToString("o") }
$temp = Join-Path $Root "current.json.tmp"
$json = $manifest | ConvertTo-Json
[System.IO.File]::WriteAllText($temp, $json, [System.Text.UTF8Encoding]::new($false))
Move-Item -LiteralPath $temp -Destination (Join-Path $Root "current.json") -Force

$repoRoot = Split-Path -Parent $PSScriptRoot
$localRoot = Join-Path $repoRoot "home-assistant\www\witmind-ui"
if (Test-Path $localRoot) {
  $localJsonPath = Join-Path $localRoot "current.json"
  [System.IO.File]::WriteAllText($localJsonPath, $json, [System.Text.UTF8Encoding]::new($false))
  Write-Host "STABLE local actualizado a $Version."
}

Write-Host "STABLE promovido a $Version."
