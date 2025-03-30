# Native Modules

This directory contains custom native modules for the iOS app. These files should be manually added to the Xcode project.

## Files

- `LocalSearchModule.swift`: Swift implementation of the MapKit search module
- `LocalSearchModule.m`: Objective-C interface for the Swift module
- `frontend-Bridging-Header.h`: Bridging header for Swift/Objective-C integration

## How to add files to Xcode (after pod install)

After running `pod install`, these files need to be manually added to the Xcode project:

1. Open the Xcode workspace: `frontend/ios/frontend.xcworkspace`
2. In Xcode, right-click on the 'frontend' folder in the Project Navigator
3. Select 'Add Files to "frontend"...'
4. Navigate to `frontend/NativeModules`
5. Select all files in this directory
6. Make sure 'Copy items if needed' is **unchecked**
7. Make sure 'Add to targets' has 'frontend' checked
8. Click 'Add'

## Configure Bridging Header

You also need to configure the bridging header:

1. In Xcode, select the 'frontend' target
2. Go to 'Build Settings'
3. Search for 'Bridging Header'
4. Set 'Objective-C Bridging Header' to: `frontend/NativeModules/frontend-Bridging-Header.h`

## After running pod install

Every time you run `pod install`, you may need to readd these files to your Xcode project. Follow the steps above to reintegrate them.

Alternatively, run the script in `ios/setup-native-modules.sh` after pod install:

```
cd frontend/ios
./setup-native-modules.sh
```

This will guide you through the manual process. 