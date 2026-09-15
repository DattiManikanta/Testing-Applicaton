@echo off
TITLE Push Updates to MANA-VOORU-UTSAVAM
echo ========================================================
echo   Pushing Village Festival Updates to GitHub
echo ========================================================
echo.

set "GIT_CMD=..\tools\git\cmd\git.exe"
if not exist "%GIT_CMD%" set "GIT_CMD=git"

%GIT_CMD% add .
%GIT_CMD% commit -m "update: festival records, expenses and photos"
%GIT_CMD% push origin main
%GIT_CMD% push origin main:gh-pages --force

if %ERRORLEVEL% EQU 0 (
  echo.
  echo SUCCESS: Pushed to https://github.com/DattiManikanta/MANA-VOORU-UTSAVAM
) else (
  echo.
  echo PUSH FAILED: Please check your internet connection or git permissions.
)

pause
