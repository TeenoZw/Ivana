#!/bin/bash

# Ivana Resources Website Development Script
echo "🚀 Starting Ivana Resources Website Development Environment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npx tsc

# Start the development server
echo "🌐 Starting development server..."
echo "📱 Website will be available at: http://localhost:3000"
echo "💻 Open this URL in your browser to view the website"
echo ""
echo "🎨 Features included:"
echo "   ✅ Mobile responsive design"
echo "   ✅ Smooth animations and transitions"
echo "   ✅ Professional mining theme with gold, green, red, and black colors"
echo "   ✅ Hero section with your mining image"
echo "   ✅ Complete service showcase"
echo "   ✅ Contact form with validation"
echo "   ✅ TypeScript + Express.js backend"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

npm start
