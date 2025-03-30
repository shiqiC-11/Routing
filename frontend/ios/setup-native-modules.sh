#!/bin/bash

# This script integrates custom native modules into the Xcode project
# Run this script after pod install

echo "Setting up native modules..."

# Set paths
PROJECT_PATH="frontend.xcodeproj"
PBXPROJ_PATH="$PROJECT_PATH/project.pbxproj"
NATIVE_MODULES_DIR="frontend/NativeModules"
BRIDGING_HEADER="$NATIVE_MODULES_DIR/frontend-Bridging-Header.h"

# Check if files exist
if [ ! -f "$NATIVE_MODULES_DIR/LocalSearchModule.swift" ]; then
  echo "Error: LocalSearchModule.swift not found"
  exit 1
fi

if [ ! -f "$NATIVE_MODULES_DIR/LocalSearchModule.m" ]; then
  echo "Error: LocalSearchModule.m not found"
  exit 1
fi

if [ ! -f "$BRIDGING_HEADER" ]; then
  echo "Error: Bridging header not found"
  exit 1
fi

# Open Xcode project
echo "Opening Xcode project..."
open "$PROJECT_PATH"

echo "Instructions for manually adding files to Xcode:"
echo "1. In Xcode, right-click on the 'frontend' folder in the Project Navigator"
echo "2. Select 'Add Files to \"frontend\"...'"
echo "3. Navigate to frontend/NativeModules"
echo "4. Select all files (LocalSearchModule.swift, LocalSearchModule.m, frontend-Bridging-Header.h)"
echo "5. Make sure 'Copy items if needed' is unchecked"
echo "6. Make sure 'Add to targets' has 'frontend' checked"
echo "7. Click 'Add'"
echo "8. Go to Build Settings for the 'frontend' target"
echo "9. Search for 'Bridging Header'"
echo "10. Set 'Objective-C Bridging Header' to: frontend/NativeModules/frontend-Bridging-Header.h"
echo "11. Save and close Xcode"

echo "Setup complete. Please follow the manual steps above to finalize integration." 