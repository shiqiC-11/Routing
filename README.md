# Abstract Route App

A full-stack route planning application built with React Native and FastAPI. The app allows users to create, save, and manage abstract routes with customizable waypoints.

## Features

- Interactive map interface for route creation and visualization
- Support for both map selection and manual coordinate input
- Route abstraction and optimization
- CRUD operations for routes (Create, Read, Update, Delete)
- Waypoint management with optional naming
- Display route statistics (distance and duration)
- Modern, responsive UI with dark/light mode support
- Persistent storage with SQLite database

## Tech Stack

### Frontend
- React Native with Expo
- TypeScript
- React Navigation
- React Native Maps
- Axios for API communication
- Expo Vector Icons
- Styled Components for styling

### Backend
- FastAPI
- SQLite database
- SQLAlchemy ORM
- Pydantic for data validation
- Route abstraction algorithms
- SQLite for persistent storage

## Prerequisites

- Node.js (v18 or later)
- Python (v3.8 or later)
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)
- Expo CLI
- pip (Python package manager)
- Git

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd abstract-route-app/backend
```

2. Create and activate a Python virtual environment:
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

4. Create a `.env` file in the `backend` directory:
```bash
# API Configuration
PROJECT_NAME=Routing App
VERSION=1.0.0

# Google Maps API Key (Optional for development)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Server Configuration
HOST=0.0.0.0
PORT=8000

# CORS Settings
CORS_ORIGINS=["http://localhost:3000"]
ALLOW_CORS_ALL=true

# Database Settings
DATABASE_URL=sqlite:///./app/routes.db

# OSRM Settings
OSRM_SERVER_URL=http://router.project-osrm.org
OSRM_PROFILE=driving
```

5. Start the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd abstract-route-app/frontend
```

2. Install all dependencies automatically using package.json:
```bash
npm install
```
This will install all required dependencies, including:
- Core dependencies (react-native-maps, react-native-skia, etc.)
- Expo packages (media-library, sharing, file-system)
- Development dependencies (TypeScript types)

The postinstall script will automatically run `pod install` for iOS dependencies.

3. Create a `config.ts` file in the frontend directory:
```typescript
export const config = {
  // Use your machine's IP address when testing on physical devices
  // Use 'localhost' when testing on simulators/emulators
  API_HOST: '192.168.1.101',  // Replace with your machine's IP address
  API_PORT: '8000',
  
  getApiUrl: () => {
    return `http://${config.API_HOST}:${config.API_PORT}/api/v1`;
  }
};
```

4. Verify the API connection:
   - For physical devices: Make sure your device is on the same network as your development machine
   - For simulators/emulators: Use 'localhost' as the API_HOST
   - Test the connection by opening the app and checking if it can fetch routes

5. Start the development server:
```bash
npm start
```
This will start the Expo development server. You can then:
- Scan the QR code with Expo Go app on your physical device
- Press 'i' to open iOS simulator (requires iOS setup)
- Press 'a' to open Android emulator (requires Android setup)
- Press 'w' to open web version

For detailed platform-specific setup and development instructions, see the iOS and Android sections below.

### iOS Development Setup

1. Install CocoaPods (if not already installed):
```bash
sudo gem install cocoapods
```

2. Generate iOS project files:
```bash
npx expo prebuild -p ios
```

3. Install iOS dependencies:
```bash
cd ios && pod install
```

4. Start the app in one of two ways:

   a. Using Expo Go (Recommended for development):
   ```bash
   npx expo start
   ```
   Then:
   - Install "Expo Go" from the App Store on your iPhone
   - Scan the QR code with your iPhone's camera
   - The app will open in Expo Go

   b. Using iOS Simulator:
   ```bash
   npx expo start --ios
   ```
   This will automatically open the app in the iOS simulator.

   c. Using Xcode (Native development):
   ```bash
   cd ios
   open frontend.xcworkspace
   ```
   Then in Xcode:
   - Select your target device (simulator or physical device)
   - Click the Play button or press Cmd+R to build and run

5. Common Commands:
   - Press 'r' to reload the app
   - Press 'm' to toggle the menu
   - Press 'i' to open iOS simulator
   - Press 'w' to open web version
   - Press 'j' to open debugger
   - Press 'c' to show project QR

### Android Development Setup

1. Install Android Studio and Android SDK:
   - Download and install [Android Studio](https://developer.android.com/studio)
   - During installation, make sure to install:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

2. Set up environment variables:
   Add the following to your shell profile (~/.bash_profile, ~/.zshrc, etc.):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

3. Create an Android Virtual Device (AVD):
   - Open Android Studio
   - Go to Tools > Device Manager
   - Click "Create Virtual Device"
   - Select a phone (e.g., Pixel 2)
   - Download and select a system image (e.g., API 33)
   - Complete the AVD creation

4. Generate Android project files:
```bash
npx expo prebuild -p android
```

5. Start the app in one of two ways:

   a. Using Expo Go (Recommended for development):
   ```bash
   npx expo start
   ```
   Then:
   - Install "Expo Go" from the Play Store on your Android device
   - Scan the QR code with the Expo Go app
   - The app will open in Expo Go

   b. Using Android Emulator:
   ```bash
   npx expo start --android
   ```
   This will automatically open the app in the Android emulator.

   c. Using Android Studio (Native development):
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   Then in Android Studio:
   - Open the `android` folder as a project
   - Click the Run button or press Shift+F10 to build and run

6. Common Commands:
   - Press 'r' to reload the app
   - Press 'm' to toggle the menu
   - Press 'a' to open Android emulator
   - Press 'w' to open web version
   - Press 'j' to open debugger
   - Press 'c' to show project QR

7. Troubleshooting:
   - If you get SDK location errors, make sure ANDROID_HOME is set correctly
   - If Metro bundler fails to connect, try:
     ```bash
     adb reverse tcp:8081 tcp:8081
     ```
   - For build errors, try cleaning the project:
     ```bash
     cd android
     ./gradlew clean
     ```

## Usage

1. **Creating a Route**
   - Tap the + button to start creating a new route
   - Enter a title and description for your route
   - Choose between map selection or manual input mode
   - Select origin and destination points
   - Add optional waypoints with custom names
   - Save the route

2. **Managing Routes**
   - View all saved routes on the home screen
   - Use the search functionality to filter routes
   - Tap a route to view its details
   - Edit or delete existing routes
   - View route statistics and waypoint information

## API Documentation

The backend API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
abstract-route-app/
├── backend/
│   ├── app/
│   │   ├── core/          # Core configurations
│   │   ├── db/           # Database models and setup
│   │   ├── models/       # Pydantic models
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── main.py       # Application entry point
│   ├── tests/           # Backend tests
│   └── requirements.txt
└── frontend/
    ├── components/       # Reusable React components
    ├── screens/         # Screen components
    ├── styles/         # Styling and theme
    ├── services/       # API services
    ├── types/          # TypeScript type definitions
    ├── utils/          # Utility functions
    └── App.tsx         # Root component
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Dependencies

### Core Dependencies
- `react-native-maps`: For displaying and interacting with maps
- `@shopify/react-native-skia`: High-performance 2D graphics library for hand-drawn route effects
- `react-native-reanimated`: Advanced animations library used with Skia for smooth route animations
- `react-native-svg`: SVG rendering library for custom map icons and markers
- `@react-native-community/slider`: Custom slider component for style customization

### Expo Packages
- `expo-media-library`: Access and save images to device media library
- `expo-sharing`: Share maps and routes with other apps
- `expo-file-system`: Handle file operations for saving and loading routes

### Development Dependencies
- `@types/react-native-svg`: TypeScript definitions for react-native-svg
- `@types/react-native`: TypeScript definitions for React Native

### Manual Installation (Alternative)

If you need to install dependencies manually or add new ones:

```bash
# Core dependencies
npm install react-native-maps @shopify/react-native-skia react-native-reanimated react-native-svg @react-native-community/slider

# Expo packages
npm install expo-media-library expo-sharing expo-file-system

# Development dependencies
npm install --save-dev @types/react-native-svg @types/react-native
```

After installing new dependencies:
1. Update package.json with the new dependencies
2. Commit the updated package.json and package-lock.json
3. Other team members can then run `npm install` to get the new dependencies

### Additional Setup

1. **React Native Reanimated**
   - Add the Reanimated babel plugin to your babel.config.js:
   ```javascript
   module.exports = {
     presets: ['babel-preset-expo'],
     plugins: ['react-native-reanimated/plugin'],
   };
   ```

2. **React Native Skia**
   - For iOS: Run `pod install` in the ios directory
   - For Android: No additional setup required

3. **Expo Configuration**
   - Add the following to your app.json:
   ```json
   {
     "expo": {
       "plugins": [
         [
           "expo-media-library",
           {
             "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
             "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos."
           }
         ]
       ]
     }
   }
   ```

### Package Versions
- react-native-maps: ^1.7.1
- @shopify/react-native-skia: ^0.1.221
- react-native-reanimated: ^3.17.1
- react-native-svg: ^14.1.0
- @react-native-community/slider: ^4.4.3
- expo-media-library: ^15.9.1
- expo-sharing: ^11.10.0
- expo-file-system: ^15.9.0 