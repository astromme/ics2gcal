#!/bin/bash
# Create simple placeholder icons using ImageMagick

# Check if ImageMagick is available
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Creating simple colored squares with base64..."
    
    # Create a minimal 16x16 PNG (blue square) using base64
    echo "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR42mNk+M/wn4EIwDiqgXoawMiITTAxKGCUGhgYAACCNwEPhABuywAAAABJRU5ErkJggg==" | base64 -d > icons/icon16.png
    
    # Create a minimal 48x48 PNG (blue square)
    echo "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAP0lEQVR42u3NMQ0AAAwDIL/a/Rya4IRIqQtVvjCYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAmTP5/VAKZJRQfDAAAAAElFTkSuQmCC" | base64 -d > icons/icon48.png
    
    # Create a minimal 128x128 PNG (blue square)
    echo "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAQklEQVR42u3OMQ0AAAgDsOvfNC7IiEA1tlEHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHh88FNACWskUGPwAAAABJRU5ErkJggg==" | base64 -d > icons/icon128.png
    
    echo "Created placeholder icon files"
else
    echo "Creating icons with ImageMagick..."
    convert -size 16x16 xc:#1a73e8 icons/icon16.png
    convert -size 48x48 xc:#1a73e8 icons/icon48.png
    convert -size 128x128 xc:#1a73e8 icons/icon128.png
    echo "Created blue square icons"
fi
