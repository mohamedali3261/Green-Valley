@echo off
REM Green Valley - Deployment Script for Windows
REM This script helps you deploy to GitHub and Vercel

echo ==================================
echo Green Valley - Deployment Script
echo ==================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed. Please install Git first.
    pause
    exit /b 1
)

echo [Step 1] Initialize Git Repository
if not exist .git (
    git init
    echo [SUCCESS] Git repository initialized
) else (
    echo [SUCCESS] Git repository already exists
)

echo.
echo [Step 2] Add all files
git add .
echo [SUCCESS] Files added

echo.
echo [Step 3] Commit changes
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" (
    set commit_msg=Update: Green Valley Website changes
)
git commit -m "%commit_msg%"
echo [SUCCESS] Changes committed

echo.
echo [Step 4] Pushing to GitHub...
git push

if errorlevel 1 (
    echo [WARNING] Push failed. This might be the first push.
    echo [Step 5] GitHub Setup
    echo Please enter your GitHub repository URL:
    echo Example: https://github.com/username/green-valley.git
    set /p repo_url="Repository URL: "
    
    if "%repo_url%"=="" (
        echo [ERROR] No repository URL provided. Cannot push.
    ) else (
        git remote add origin "%repo_url%" 2>nul || git remote set-url origin "%repo_url%"
        git branch -M main
        git push -u origin main
        
        if errorlevel 1 (
            echo [ERROR] Failed to push to GitHub. Please check your credentials.
        ) else (
            echo [SUCCESS] Successfully pushed to GitHub!
        )
    )
) else (
    echo [SUCCESS] Successfully pushed to GitHub!
)

echo.
echo [Step 6] Vercel Deployment
set /p deploy_vercel="Do you want to deploy to Vercel now? (y/n): "

if /i "%deploy_vercel%"=="y" (
    REM Check if vercel is installed
    vercel --version >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Vercel CLI is not installed.
        echo Installing Vercel CLI...
        npm install -g vercel
    )
    
    echo.
    echo [Step 7] Deploying to Vercel...
    vercel --prod
    
    if errorlevel 1 (
        echo [ERROR] Deployment failed. Please try manually: vercel --prod
    ) else (
        echo [SUCCESS] Successfully deployed to Vercel!
    )
) else (
    echo [INFO] Skipping Vercel deployment.
    echo You can deploy later using: vercel --prod
)

echo.
echo ==================================
echo [SUCCESS] Deployment script completed!
echo ==================================
echo.
echo Next steps:
echo 1. Visit your Vercel dashboard to see your deployment
echo 2. Update sitemap.xml with your Vercel URL
echo 3. Update robots.txt with your Vercel URL
echo 4. Test your website
echo.
pause
