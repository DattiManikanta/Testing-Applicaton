@echo off
TITLE Mana Vooru Utsavam Portal
echo ========================================================
echo   MANA VOORU UTSAVAM // VILLAGE FESTIVAL & EXPENSE HUB
echo ========================================================
echo.
echo Starting local web server on port 4000...
echo.

if exist "..\tools\node.exe" (
  start "" http://localhost:4000
  "..\tools\node.exe" server.cjs
) else (
  start "" http://localhost:4000
  node server.cjs
)

pause
