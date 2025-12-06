@echo off
echo ========================================
echo   Iniciando ServiHome Platform
echo ========================================
echo.

echo [1/3] Iniciando Backend...
start "ServiHome Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/3] Iniciando Web App...
start "ServiHome Web" cmd /k "cd web && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Servicios iniciados!
echo ========================================
echo.
echo Backend API: http://localhost:5000
echo Web App: http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul

