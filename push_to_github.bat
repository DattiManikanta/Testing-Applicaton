@echo off
setlocal
set "PATH=%~dp0tools\git\cmd;%PATH%"

echo ========================================================
echo Pushing PulseCare Hospital App to GitHub...
echo ========================================================
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo --------------------------------------------------------
    echo Push failed. If using SSH, make sure your public key is added to GitHub:
    echo https://github.com/settings/keys
    echo --------------------------------------------------------
)
pause
