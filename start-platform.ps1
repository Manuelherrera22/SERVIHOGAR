Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Iniciando ServiHome Platform" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio del proyecto
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

# Iniciar Backend
Write-Host "[1/2] Iniciando Backend en puerto 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

# Iniciar Web App
Write-Host "[2/2] Iniciando Web App en puerto 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\web'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Servicios iniciados!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: " -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host "Web App: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Nota: Las ventanas de los servicios se abrieron en ventanas separadas" -ForegroundColor Yellow
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

