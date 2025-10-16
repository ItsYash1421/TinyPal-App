# TinyPal - Parenting Insights Mobile App

A React Native mobile application that provides personalized parenting insights through "Did You Know" cards and Flash Cards, powered by AI-driven educational content.

## Features

- **Did You Know Screen**: Educational cards with cause-and-effect insights
- **Flash Card Screen**: Quick parenting tips and strategies
- **Tinu AI Assistant**: Interactive bottom sheet with contextual help
- **Instagram-style Navigation**: Swipe through cards with progress indicators
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Real-time API Integration**: Fetches personalized content from backend

## Tech Stack

- **React Native 0.82.0**: Cross-platform mobile framework
- **React Navigation**: Navigation library for screen transitions
- **Gorhom Bottom Sheet**: Modern bottom sheet implementation
- **React Native Reanimated**: Smooth animations and gestures
- **Axios**: HTTP client for API requests
- **React Native Gesture Handler**: Touch gesture system

## Project Structure

```
TinyPalApp/
├── src/
│   ├── api/
│   │   └── tinuApi.js          # API service layer
│   ├── components/
│   │   ├── Header.js           # Navigation header
│   │   ├── ProgressBar.js      # Instagram-style pagination
│   │   ├── DYKCard.js          # Did You Know card component
│   │   ├── FlashCard.js        # Flash card component
│   │   └── TinuBottomSheet.js  # AI assistant bottom sheet
│   ├── screens/
│   │   ├── HomeScreen.js       # Landing screen
│   │   ├── DidYouKnowScreen.js # DYK screen with carousel
│   │   └── FlashCardScreen.js  # Flash card screen
│   ├── theme/
│   │   └── colors.js           # Color palette
│   └── assets/
│       └── images/             # Image assets
├── android/                    # Android native code
├── App.tsx                     # Main app entry point
└── package.json               # Dependencies
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Android Studio** with Android SDK
- **JDK 11** or higher
- **React Native CLI**

### Android Studio Setup

1. Install Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio)
2. Open Android Studio and install SDK:
   - Open Settings → Appearance & Behavior → System Settings → Android SDK
   - Install Android 13 (API Level 33) or higher
   - Install Android SDK Build-Tools
   - Install Android SDK Platform-Tools
3. Set up environment variables:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Installation

### 1. Navigate to Project Directory

```bash
cd /Users/yashkumarmeena/Desktop/TinyApp/TinyPalApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install iOS Dependencies (macOS only - Optional)

```bash
cd ios
pod install
cd ..
```

### 4. Image Assets Included ✅

The app now includes the required PNG images in `src/assets/images/`:

- **dyk.png**: "Did You Know?" badge with bulb icon (from Figma)
- **arrow.png**: Arrow icon for cause-effect relationships
- **faceicon.png**: Tinu face avatar (from Figma)

These images are already included and configured. No additional setup needed!

## Running the App

### Method 1: Using npm scripts (Recommended)

1. **Start Metro Bundler**:
   ```bash
   npm start
   ```

2. **In a new terminal, run Android**:
   ```bash
   npm run android
   ```

### Method 2: Using React Native CLI

1. **Start Android Emulator first**:
   - Open Android Studio
   - Tools → Device Manager
   - Create/Start a virtual device (Pixel 5 recommended)

2. **Run the app**:
   ```bash
   npx react-native run-android
   ```

### Run on Physical Android Device

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `npm run android`

## Building APK

### Debug APK (for testing)

```bash
cd android
./gradlew assembleDebug
cd ..
```

**Output**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution)

1. **Generate signing key**:
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore tinypal-release-key.keystore -alias tinypal-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Edit `android/gradle.properties`** (add at bottom):
   ```properties
   MYAPP_RELEASE_STORE_FILE=tinypal-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=tinypal-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=your-password
   MYAPP_RELEASE_KEY_PASSWORD=your-password
   ```

3. **Build release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   cd ..
   ```

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

## API Configuration

**Base URL**: `https://genai-images-4ea9c0ca90c8.herokuapp.com`

### Endpoints Used:

1. **POST /p13n_answers** - Fetches DYK and Flash cards
2. **POST /activate_tinu** - Gets Tinu AI context

Configuration file: `src/api/tinuApi.js`

## App Usage Guide

1. **Launch App** → Home screen appears
2. **Choose Screen**:
   - Tap "Did You Know" for educational insights
   - Tap "Flash Cards" for quick tips
3. **Navigate Cards**:
   - Swipe left/right to browse
   - Progress bars at top show position
4. **Ask Tinu**:
   - Tap "Ask Tinu" button on any card
   - Bottom sheet opens with contextual help
   - View suggested topics (chips)
   - Type custom questions in input box

## Troubleshooting

### Metro Bundler Issues

```bash
npm start -- --reset-cache
```

### Build Failures

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Gradle Daemon Issues

```bash
cd android
./gradlew --stop
cd ..
```

### Port Already in Use

```bash
npx react-native start --port 8082
```

### Cannot Connect to API

1. Check internet connection
2. Verify API URL in `src/api/tinuApi.js`
3. API may be slow on first request (Heroku cold start)

### App Crashes on Launch

```bash
# Clear cache and rebuild
npm start -- --reset-cache
cd android && ./gradlew clean && cd ..
npm run android
```

## Development Tips

### Hot Reload
- Press `r` in Metro terminal to reload
- Or shake device → "Reload"

### Debug Menu
- **Emulator**: `Cmd + M` (Mac) or `Ctrl + M` (Windows/Linux)
- **Device**: Shake device

### Chrome DevTools
1. Open debug menu
2. Select "Debug"
3. Chrome → `chrome://inspect`

### View Logs
```bash
npx react-native log-android
```

## Testing Checklist

- [ ] App launches without errors
- [ ] Home screen displays two buttons
- [ ] DYK screen loads cards from API
- [ ] Flash Card screen loads cards from API
- [ ] Horizontal scroll works smoothly
- [ ] Progress indicators update correctly
- [ ] "Ask Tinu" button opens bottom sheet
- [ ] Bottom sheet displays cards and chips
- [ ] Text input accepts user input
- [ ] Back navigation works properly
- [ ] App handles network errors gracefully
- [ ] Responsive on different screen sizes

## Performance Optimization

- ✅ FlatList with `getItemLayout` for efficient scrolling
- ✅ Image caching enabled
- ✅ Optimized bottom sheet with Reanimated
- ✅ Lazy loading of components
- ✅ Memoized expensive computations

## Known Limitations

1. **Image Assets**: Currently uses emoji fallbacks (💡→🤓)
2. **API Cold Start**: First request may take 3-5 seconds
3. **Internet Required**: No offline mode yet
4. **Android Only**: iOS build not tested

## Future Enhancements

- [ ] Add actual PNG image assets
- [ ] Implement offline caching
- [ ] Add loading skeletons
- [ ] Dark mode support
- [ ] Share card functionality
- [ ] Bookmark favorite cards
- [ ] User authentication
- [ ] Push notifications
- [ ] Analytics integration

## Project Documentation

See `SYSTEM_DESIGN.md` for detailed architecture and component breakdown.

## Support

For issues or questions:
1. Check Troubleshooting section above
2. Review error logs: `npx react-native log-android`
3. Ensure all prerequisites are installed

## License

Created for TinyPal Hiring Assignment - October 2025

---
