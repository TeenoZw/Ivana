#!/bin/bash

# Ivana Resources - Local Development Server
# This script starts a local development server for testing

echo "🔧 Starting Ivana Resources local development server..."
echo ""

# Check if Python is available for simple HTTP server
if command -v python3 &> /dev/null; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "📁 Serving files from public/ directory"
    echo ""
    echo "💡 Note: Contact form will not work locally without backend server"
    echo "   Use 'npm run dev' for full backend functionality"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    cd public && python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "📁 Serving files from public/ directory"
    echo ""
    echo "💡 Note: Contact form will not work locally without backend server"
    echo "   Use 'npm run dev' for full backend functionality"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    cd public && python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python or use 'npm run dev' instead."
    exit 1
fi
