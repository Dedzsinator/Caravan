#!/bin/bash

# Caravan Game Verification Script
echo "🎮 Caravan Game - Verification Script"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the Caravan game directory"
    exit 1
fi

echo "📁 Checking file structure..."

# Check required files
required_files=(
    "index.html"
    "demo.js"
    "README.md"
    "css/caravan.css"
    "js/game.js"
    "js/config.js"
    "js/character.js"
    "js/inventory.js"
    "js/caravan.js"
    "js/ui.js"
    "js/events.js"
    "js/audio.js"
    "js/debug.js"
)

missing_files=0
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        ((missing_files++))
    fi
done

echo ""
echo "📊 Verification Results:"
echo "Total files checked: ${#required_files[@]}"
echo "Missing files: $missing_files"

if [ $missing_files -eq 0 ]; then
    echo "🎉 All required files are present!"
    echo ""
    echo "🚀 To start the game:"
    echo "1. Run: python3 -m http.server 8080"
    echo "2. Open: http://localhost:8080"
    echo ""
    echo "🛠️ For development:"
    echo "- Test page: http://localhost:8080/test.html"
    echo "- Check browser console for debug info"
    echo "- Use F12 Developer Tools"
else
    echo "⚠️  Some files are missing. Please check the installation."
fi

echo ""
echo "🎮 Game Features:"
echo "- ✅ Modernized codebase with ES6 modules"
echo "- ✅ Drag & drop inventory system"
echo "- ✅ Character progression with XP"
echo "- ✅ Enhanced UI and responsive design"
echo "- ✅ Improved audio controls"
echo "- ✅ Debug tools for development"
echo ""
echo "Happy gaming! 🎯"
