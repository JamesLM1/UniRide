$ErrorActionPreference = 'Stop'
$sourceRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$projectRoot = 'C:\Users\Admin\Documents\Codex\2026-10-31\new-chat\uniride'
$files = @(
    @{ Path = 'src\components\auth-form.tsx'; Before = 'E100475509077CAF3FB0EDAEA1A6C29BB51A9CE2E564568DC9EEC473D8959EDF' },
    @{ Path = 'src\components\auth-form.module.css'; Before = $null }
)
# Validate every file before touching the running project.
$pending = @()
foreach ($file in $files) {
    $source = Join-Path $sourceRoot $file.Path
    $target = Join-Path $projectRoot $file.Path
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Falta el archivo corregido: $source" }
    if (Test-Path -LiteralPath $target -PathType Leaf) {
        $currentHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $target).Hash
        $fixedHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $source).Hash
        if ($currentHash -eq $fixedHash) { continue }
        if (-not $file.Before -or $currentHash -ne $file.Before) {
            throw "Se detectaron cambios nuevos en $($file.Path). No se sobrescribio nada."
        }
    } elseif ($file.Before) {
        throw "Falta el archivo original: $target"
    }
    $pending += $file
}
if ($pending.Count -eq 0) { Write-Host 'Ingreso y registro ya tienen este diseno.'; exit 0 }

$backupRoot = Join-Path $sourceRoot ('auth-backups\' + (Get-Date -Format 'yyyyMMdd-HHmmss-fff'))
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
foreach ($file in $pending) {
    $target = Join-Path $projectRoot $file.Path
    if (Test-Path -LiteralPath $target -PathType Leaf) {
        $backup = Join-Path $backupRoot $file.Path
        New-Item -ItemType Directory -Path (Split-Path -Parent $backup) -Force | Out-Null
        Copy-Item -LiteralPath $target -Destination $backup
    }
}

$applied = @()
try {
    foreach ($file in $pending) {
        $target = Join-Path $projectRoot $file.Path
        Copy-Item -LiteralPath (Join-Path $sourceRoot $file.Path) -Destination $target -Force
        $applied += $file
        if ((Get-FileHash -LiteralPath $target).Hash -ne (Get-FileHash -LiteralPath (Join-Path $sourceRoot $file.Path)).Hash) {
            throw "No se pudo verificar $($file.Path)"
        }
    }
} catch {
    foreach ($file in $applied) {
        $target = Join-Path $projectRoot $file.Path
        $backup = Join-Path $backupRoot $file.Path
        if (Test-Path -LiteralPath $backup -PathType Leaf) {
            Copy-Item -LiteralPath $backup -Destination $target -Force
        } else {
            Remove-Item -LiteralPath $target
        }
    }
    throw
}
Write-Host 'Ingreso y registro actualizados. Abre http://127.0.0.1:3000/ingresar y http://127.0.0.1:3000/registro.'
Write-Host "Copia de respaldo: $backupRoot"

