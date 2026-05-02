#!/bin/bash

# Green Valley - Deployment Script
# This script helps you deploy to GitHub and Vercel

echo "=================================="
echo "Green Valley - Deployment Script"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo -e "${RED}Git is not installed. Please install Git first.${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Initialize Git Repository${NC}"
if [ ! -d .git ]; then
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${GREEN}✓ Git repository already exists${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Add all files${NC}"
git add .
echo -e "${GREEN}✓ Files added${NC}"

echo ""
echo -e "${BLUE}Step 3: Commit changes${NC}"
git commit -m "Initial commit - Green Valley Website with performance optimizations"
echo -e "${GREEN}✓ Changes committed${NC}"

echo ""
echo -e "${BLUE}Step 4: GitHub Setup${NC}"
echo "Please enter your GitHub repository URL:"
echo "Example: https://github.com/username/green-valley.git"
read -p "Repository URL: " repo_url

if [ -z "$repo_url" ]; then
    echo -e "${RED}No repository URL provided. Skipping GitHub push.${NC}"
else
    git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
    git branch -M main
    
    echo ""
    echo -e "${BLUE}Pushing to GitHub...${NC}"
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
    else
        echo -e "${RED}✗ Failed to push to GitHub. Please check your credentials.${NC}"
    fi
fi

echo ""
echo -e "${BLUE}Step 5: Vercel Deployment${NC}"
echo "Do you want to deploy to Vercel now? (y/n)"
read -p "Deploy to Vercel: " deploy_vercel

if [ "$deploy_vercel" = "y" ] || [ "$deploy_vercel" = "Y" ]; then
    # Check if vercel is installed
    if ! command -v vercel &> /dev/null
    then
        echo -e "${RED}Vercel CLI is not installed.${NC}"
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo ""
    echo -e "${BLUE}Deploying to Vercel...${NC}"
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully deployed to Vercel!${NC}"
    else
        echo -e "${RED}✗ Deployment failed. Please try manually: vercel --prod${NC}"
    fi
else
    echo -e "${BLUE}Skipping Vercel deployment.${NC}"
    echo "You can deploy later using: vercel --prod"
fi

echo ""
echo "=================================="
echo -e "${GREEN}Deployment script completed!${NC}"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Visit your Vercel dashboard to see your deployment"
echo "2. Update sitemap.xml with your Vercel URL"
echo "3. Update robots.txt with your Vercel URL"
echo "4. Test your website"
echo ""
