param(
  [Parameter(Mandatory = $true)][ValidatePattern('^\d+\.\d+\.\d+$')][string]$Version,
  [string]$Root = "\\192.168.20.232\config\www\witmind-ui"
)

$ErrorActionPreference = "Stop"
$releaseDir = Join-Path (Join-Path $Root "releases") $Version
if (-not (Test-Path -LiteralPath (Join-Path $releaseDir "index.html"))) { throw "No existe una release completa para $Version." }
$manifest = [ordered]@{ version = $Version; channel = "stable"; updated_at = [DateTime]::UtcNow.ToString("o") }
$temp = Join-Path $Root "current.json.tmp"
$manifest | ConvertTo-Json | Set-Content -LiteralPath $temp -Encoding UTF8
Move-Item -LiteralPath $temp -Destination (Join-Path $Root "current.json") -Force
Write-Host "STABLE promovido a $Version."
