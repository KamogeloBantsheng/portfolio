@echo off
title Push Portfolio to GitHub - Kamogelo Bantsheng
color 0b
echo ========================================================
echo   KAMOGELO BANTSHENG PORTFOLIO - GITHUB DEPLOY HELPER
echo ========================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not found in PATH!
    echo.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo After installing, restart this script.
    echo.
    pause
    exit /b
)

echo [1/4] Initializing Git repository...
if not exist .git (
    git init
) else (
    echo Git repository already initialized.
)

echo.
echo [2/4] Staging files and creating initial commit...
git add .
git commit -m "feat: complete personal portfolio website with interactive terminal and recruiter showcase"

echo.
echo [3/4] Renaming branch to main...
git branch -M main

echo.
echo ========================================================
echo Next: What is your GitHub repository URL?
echo (Default: https://github.com/KamogeloBantsheng/portfolio.git)
echo ========================================================
set /p REPO_URL="Enter GitHub repo URL [or press Enter for default]: "
if "%REPO_URL%"=="" (
    set REPO_URL=https://github.com/KamogeloBantsheng/portfolio.git
)

echo.
echo [4/4] Setting remote origin to %REPO_URL% and pushing...
git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ========================================================
echo PUSH PROCESS FINISHED!
echo If successful, enable GitHub Pages:
echo 1. Go to your repo on GitHub: Settings -> Pages
echo 2. Set Source to 'Deploy from a branch', Branch to 'main', folder '/ (root)'
echo 3. Click Save!
echo ========================================================
echo.
pause
