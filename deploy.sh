#!/bin/bash

# Ivana Resources - Netlify Deployment Script
# This script builds and deploys the website to Netlify

echo "🚀 Starting Ivana Resources deployment to Netlify..."
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Build the project
echo "🔨 Building project..."
npm run netlify-build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    echo "🔐 Please log in to Netlify:"
    netlify login
fi

# Deploy to production
echo "🚀 Deploying to production..."
netlify deploy --prod --dir=public --functions=dist-functions

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "✅ Your Ivana Resources website is now live!"
    echo "📧 Don't forget to set up environment variables for email functionality:"
    echo "   EMAIL_USER, EMAIL_PASS, SMTP_HOST, SMTP_PORT, COMPANY_EMAIL, WEBSITE_URL"
    echo ""
    echo "🌐 Visit your site and test the contact form!"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
