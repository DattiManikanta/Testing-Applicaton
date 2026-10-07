@echo off
TITLE PulseCare Health City - Hospital OPD System Launcher
echo ================================================================
echo           ?? PULSECARE HOSPITAL OPD & PATIENT PORTAL
echo ================================================================
echo.
cd /d "%~dp0"

set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"

echo Checking Node: %NODE_CMD%
"%NODE_CMD%" -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js was not found at %NODE_CMD%
    pause
    exit /b 1
)

echo Starting PulseCare Hospital Server and opening browser...
timeout /t 1 >nul
start http://localhost:3000

echo.
echo ================================================================
echo ?? Hospital Server is RUNNING at: http://localhost:3000
echo Keep this window OPEN while using the Hospital OPD Portal!
echo To stop the server, press Ctrl+C or close this window.
echo ================================================================
echo.

"%NODE_CMD%" server.cjs
