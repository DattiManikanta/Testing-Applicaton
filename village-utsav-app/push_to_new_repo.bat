@echo off
TITLE Push Village Utsav App to Dedicated GitHub Repo
echo ========================================================
echo   Push Mana Vooru Utsavam to its own GitHub Repository
echo ========================================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: Village-Utsav (or Mana-Vooru-Utsavam)
echo 3. Keep it Public and do NOT initialize with README.
echo.
set /p REPO_NAME="Enter your repo name [default: Village-Utsav]: "
if "%REPO_NAME%"=="" set REPO_NAME=Village-Utsav

echo.
echo Pushing to git@github.com:DattiManikanta/%REPO_NAME%.git ...
echo.

..\tools\git\cmd\git.exe init
..\tools\git\cmd\git.exe branch -M main
..\tools\git\cmd\git.exe add .
..\tools\git\cmd\git.exe commit -m "feat: initial release of Mana Vooru Utsavam mobile web app"
..\tools\git\cmd\git.exe remote remove origin 2>nul
..\tools\git\cmd\git.exe remote add origin git@github.com:DattiManikanta/%REPO_NAME%.git
..\tools\git\cmd\git.exe push -u origin main

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ========================================================
  echo SUCCESS! Your app is live at:
  echo https://github.com/DattiManikanta/%REPO_NAME%
  echo.
  echo To enable the free public website for your phone:
  echo 1. Go to https://github.com/DattiManikanta/%REPO_NAME%/settings/pages
  echo 2. Under 'Build and deployment' -> Branch: select 'main' -> click 'Save'
  echo 3. Your permanent phone link will be:
  echo    https://dattimanikanta.github.io/%REPO_NAME%/
  echo ========================================================
)

pause
