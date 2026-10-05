# Push Portfolio to GitHub - PowerShell Helper
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  KAMOGELO BANTSHENG PORTFOLIO - GITHUB DEPLOY HELPER   " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# Check Git
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "`n[ERROR] Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please download Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installing Git, run this script again.`n"
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "`n[1/4] Initializing Git repository..." -ForegroundColor Green
if (-not (Test-Path ".git")) {
    git init
} else {
    Write-Host "Git repository already initialized."
}

Write-Host "`n[2/4] Staging files and committing..." -ForegroundColor Green
git add .
git commit -m "feat: complete personal portfolio website with interactive terminal and recruiter showcase"

Write-Host "`n[3/4] Setting main branch..." -ForegroundColor Green
git branch -M main

$defaultRepo = "https://github.com/KamogeloBantsheng/portfolio.git"
Write-Host "`nTarget Repository URL: $defaultRepo" -ForegroundColor Yellow
$userRepo = Read-Host "Press Enter to use this URL, or enter another repo URL"
if ([string]::IsNullOrWhiteSpace($userRepo)) {
    $userRepo = $defaultRepo
}

Write-Host "`n[4/4] Linking remote origin and pushing to GitHub..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin $userRepo
git push -u origin main

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  PUSH COMPLETE! NEXT STEPS FOR FREE HOSTING:          " -ForegroundColor Green
Write-Host "1. Visit your repository on GitHub" -ForegroundColor White
Write-Host "2. Go to: Settings -> Pages" -ForegroundColor White
Write-Host "3. Set Branch to 'main' and Folder to '/ (root)', then Save" -ForegroundColor White
Write-Host "Your website will be live in 1-2 minutes!" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Cyan
Read-Host "Press Enter to finish"
