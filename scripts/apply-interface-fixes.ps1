$ErrorActionPreference = 'Stop'
$sourceRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$projectRoot = 'C:\Users\Admin\Documents\Codex\2026-10-31\new-chat\uniride'
$files = @(
    @{ Path = 'src\app\layout.tsx'; Before = '4366D53637018C7A44E442FD5506E3784A5F57D2535B2DE42AD87441541D9418' },
    @{ Path = 'src\app\interface-fixes.css'; Before = $null },
    @{ Path = 'src\components\chat.tsx'; Before = 'E8437C5704EB4E93CA7C2FB1BA5296D1BB04D986D86C87CEE079884D8073BCDA' },
    @{ Path = 'src\components\chat.module.css'; Before = $null },
    @{ Path = 'src\lib\knowledge.ts'; Before = '19187414C39E8D7F0A9D35EE4F456D23876C7B56D88B971BAC51731D09174EB0' },
    @{ Path = 'src\lib\guide.mjs'; Before = $null },
    @{ Path = 'src\lib\request-origin.mjs'; Before = $null },
    @{ Path = 'src\app\api\chat\route.ts'; Before = 'EF88E1E85CC36E813E3971F2FBED326D4365BC2AE073CE05CB1B5F5D9F2949A6' },
    @{ Path = 'src\app\api\leads\route.ts'; Before = 'DDDF59CCBC288AEE1899BE6F5C6A54007D4340881E6B7CB1AA4FD85664BBD2BD' },
    @{ Path = 'src\app\api\contact\route.ts'; Before = 'B8ABF5C46C010C287C34B168F42ABFDCFD7D1AF0F7FC9256E7C40D9C84BDBFFD' },
    @{ Path = 'src\components\sites\cobrapp\about-experience.tsx'; Before = '1927EDAAC71C977452A98E26E1B454A94417FE7E86564CC8E55E230419D0BDC2' },
    @{ Path = 'src\components\sites\cobrapp\team-section.tsx'; Before = $null },
    @{ Path = 'src\components\sites\cobrapp\team-section.module.css'; Before = $null },
    @{ Path = 'public\images\team-collage.png'; Before = 'C37C4F0ACF62C7104832F71F761FC2A46F5E9C768CF1643571D79C40D2E01AB5' }
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
if ($pending.Count -eq 0) { Write-Host 'Las correcciones de interfaz ya estan aplicadas.'; exit 0 }

$backupRoot = Join-Path $sourceRoot ('ui-backups\' + (Get-Date -Format 'yyyyMMdd-HHmmss-fff'))
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
Write-Host 'Interfaz actualizada: colores, onda, equipo y chat. Recarga http://127.0.0.1:3000/ con Ctrl+F5.'
Write-Host "Copia de respaldo: $backupRoot"

