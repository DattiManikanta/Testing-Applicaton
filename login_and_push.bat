@echo off
setlocal
cd /d "%~dp0"
set "PATH=%~dp0tools\git\cmd;%~dp0tools\bin;%PATH%"

echo ================================================================
echo           PulseCare Hospital - Push to GitHub
echo ================================================================
echo.
echo Checking GitHub authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Please log into GitHub in your browser.
    echo Follow the prompt to authorize GitHub CLI...
    echo.
    gh auth login --web --git-protocol https
    gh auth setup-git
    git remote set-url origin https://github.com/DattiManikanta/Testing-Applicaton.git
)

echo.
echo Pushing commits to GitHub (origin main)...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo SUCCESS! Your code has been pushed to:
    echo https://github.com/DattiManikanta/Testing-Applicaton
    echo ================================================================
) else (
    echo.
    echo Push encountered an issue. Please verify repository permissions.
)

echo.
pause
