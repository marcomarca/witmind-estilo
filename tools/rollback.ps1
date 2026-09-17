param(
  [Parameter(Mandatory = $true)][ValidatePattern('^\d+\.\d+\.\d+$')][string]$Version,
  [string]$Root = "\\192.168.20.232\config\www\witmind-ui"
)

& (Join-Path $PSScriptRoot "promote.ps1") -Version $Version -Root $Root
