@echo off
setlocal
set "PATH=%~dp0tools\git\cmd;%PATH%"

echo ========================================================
echo Push via GitHub Personal Access Token (HTTPS)
echo ========================================================
set /p TOKEN="Enter your GitHub Personal Access Token: "
if "%TOKEN%"=="" (
    echo No token entered. Aborting.
    pause
    exit /b
)

git remote set-url origin https://%TOKEN%@github.com/DattiManikanta/Testing-Applicaton.git
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Successfully pushed to https://github.com/DattiManikanta/Testing-Applicaton!
    :: Reset back to SSH url so token is not persisted in plain text config
    git remote set-url origin git@github.com:DattiManikanta/Testing-Applicaton.git
)
pause
