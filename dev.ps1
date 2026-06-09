# GoSmartOffice — script de desarrollo local
# Uso: .\dev.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Cargar variables de entorno desde .env
if (Test-Path "$root\.env") {
    Get-Content "$root\.env" | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
            [System.Environment]::SetEnvironmentVariable($Matches[1].Trim(), $Matches[2].Trim(), 'Process')
        }
    }
}

# Agregar node_modules/.bin al PATH para que execa encuentre swc, rimraf, etc.
$env:PATH = "$root\node_modules\.bin;" + $env:PATH

# Verificar que la DB Docker esté corriendo
$dbStatus = docker inspect --format='{{.State.Status}}' gosmartoffice-database-1 2>$null
if ($dbStatus -ne 'running') {
    Write-Host "Iniciando contenedor de base de datos..." -ForegroundColor Yellow
    docker compose up -d database
    Start-Sleep -Seconds 5
}

Write-Host "Iniciando GoSmartOffice en http://localhost:3000" -ForegroundColor Green
npm run dev
