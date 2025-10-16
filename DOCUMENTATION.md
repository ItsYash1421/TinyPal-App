# TinyPal App - Complete Documentation

## 📱 Project Overview

**TinyPal** is a React Native mobile application designed for parenting insights and tips. The app provides two main features:
1. **Did You Know (DYK)** - Educational parenting insights with cause-effect relationships
2. **Flash Cards** - Quick parenting tips and advice

The app includes an AI-powered chatbot "Tinu" that answers parenting questions using generative AI.

---

## 🏗️ Project Structure

```
TinyPalApp/
├── android/                    # Android native code
├── ios/                        # iOS native code
├── src/                        # Source code
│   ├── api/                    # API integration
│   ├── assets/                 # Images and fonts
│   ├── components/             # Reusable UI components
│   ├── screens/                # Screen components
│   └── theme/                  # Theme configuration
├── App.tsx                     # Root component
├── index.js                    # App entry point
└── package.json                # Dependencies
```

---

## 📁 Detailed File Structure

### Root Files

#### `App.tsx`
**Purpose**: Main application component with navigation setup
- Configures React Navigation stack
- Sets up screen transitions with smooth slide animations
- Defines navigation routes for Home, DidYouKnow, and FlashCard screens
- Animation settings: 250ms slide-from-right transitions
- Gesture navigation enabled for iOS-style swipe-back

**Key Features**:
```typescript
- Platform-aware animations
- Full-screen gesture support
- Transparent background for smooth transitions
- Native stack navigator for optimal performance
```

#### `index.js`
**Purpose**: Application entry point
- Registers the main App component
- Initializes React Native runtime

#### `package.json`
**Purpose**: Project configuration and dependencies
- **Scripts**: android, ios, start, test, lint
- **Key Dependencies**:
  - React Native 0.82.0
  - React Navigation 7.x
  - Axios for API calls
  - Various UI libraries (blur, gradient, SVG)

---

## 📂 Source Code (`/src`)

### API Layer (`/src/api`)

#### `tinuApi.js`
**Purpose**: Centralized API client for backend communication
- **Base URL**: `https://genai-images-4ea9c0ca90c8.herokuapp.com`
- **Timeout**: 30 seconds
- **Features**:
  - Axios interceptors for request/response logging
  - Error handling and retry logic
  - Type-safe API methods

**API Functions**:

1. **`fetchDYKCards()`**
   - Endpoint: `/api/dyk`
   - Returns: Array of Did You Know cards
   - Response format: `{ success, data: [{ fact, cause, effect, citation }] }`

2. **`fetchFlashCards()`**
   - Endpoint: `/api/flashcards`
   - Returns: Array of flash cards
   - Response format: `{ success, data: [{ heading, content }] }`

3. **`sendTinuMessage(message, userContext)`**
   - Endpoint: `/api/tinu`
   - Method: POST
   - Payload: `{ message, userContext }`
   - Returns: AI-generated response with suggested questions
   - Response format:
     ```javascript
     {
       success: true,
       data: {
         response: "AI response text",
         cards: [{ type, icon, title, content }],
         suggestedQuestions: ["question1", "question2", ...]
       }
     }
     ```

---

### Theme (`/src/theme`)

#### `colors.js`
**Purpose**: Centralized color palette for consistent theming

**Color Definitions**:
```javascript
{
  background: '#270B13',        // Main dark red/brown background
  pinkDark: '#8B2E4E',          // Dark pink for DYK sections
  blueDark: '#1E3A5F',          // Dark blue for FlashCard sections
  blueCard: '#4A6382',          // Slate blue for cards
  white: '#FFFFFF',             // Pure white
  textDark: '#1A1A1A',          // Dark text
  textSecondary: '#CCCCCC',     // Secondary text
  citationOpacity: 'rgba(255, 255, 255, 0.7)',  // Semi-transparent white
  citation: '#FCCCA8',          // Peachy color for citations/links
  primary: '#8B2E4E',           // Primary action color
}
```

---

### Assets (`/src/assets`)

#### Fonts (`/src/assets/fonts`)
**Purpose**: Custom Quicksand font family

**Font Files**:
- `Quicksand-Regular.ttf` (400 weight)
- `Quicksand-Medium.ttf` (500 weight)
- `Quicksand-SemiBold.ttf` (600 weight)
- `Quicksand-Bold.ttf` (700 weight)
- `Quicksand-Light.ttf` (300 weight)

**Usage in Code**:
```javascript
// For different weights, use specific font files:
fontFamily: 'Quicksand-Regular'   // Normal text
fontFamily: 'Quicksand-Medium'    // Medium weight
fontFamily: 'Quicksand-SemiBold'  // Semi-bold text
fontFamily: 'Quicksand-Bold'      // Bold headings
```

#### Images (`/src/assets/images`)
**Purpose**: App icons and visual assets

**Image Files**:
- `back.png` - Back arrow for navigation headers
- `arrow.png` - Right arrow for cause-effect display
- `tinu-face.png` - Tinu chatbot avatar (120x120px)
- `tinu-bg-section.png` - Background for Tinu section
- `tinu-bottomsheet-bg.png` - Background for chat bottom sheet
- `send.png` - Send button icon for chat
- `down-arrow.png` - Collapse arrow for bottom sheet
- `script-*.png` - Various script type icons (bharatiya, western, playful, etc.)
- `*.png` - Various card type icons (stories, activities, facts, etc.)

**Image Management**:
```javascript
// index.js exports all images for easy import
export const images = {
  back: require('./back.png'),
  arrow: require('./arrow.png'),
  tinuFace: require('./tinu-face.png'),
  // ... etc
};
```

---

### Components (`/src/components`)

#### `Header.js`
**Purpose**: Reusable header component for all screens

**Props**:
- `title` (string): Main header title
- `subtitle` (string): Secondary text below title
- `onBackPress` (function): Navigation back handler
- `backgroundColor` (string): Dynamic background color
  - Default: `#270B13` (dark red/brown)
  - DidYouKnow: `#270B13`
  - FlashCard: `#081824` (dark blue)

**Features**:
- Back button with navigation
- Two-line text layout (title + subtitle)
- Quicksand-Bold font for title
- Quicksand-Regular for subtitle
- White text with semi-transparent subtitle
- 16px horizontal padding

**Styling**:
- Title: 18px, uppercase, letter-spacing 0.5
- Subtitle: 14px, opacity 0.7

---

#### `ProgressBar.js`
**Purpose**: Visual progress indicator for card navigation

**Props**:
- `current` (number): Current card index (1-based)
- `total` (number): Total number of cards

**Features**:
- Horizontal scrollable progress dots
- Active dot highlighted with larger size
- Smooth animations on progress change
- Semi-transparent background overlay
- Sticky positioning at top of screen

**Styling**:
- Active dot: 12px, white with opacity 1
- Inactive dots: 8px, white with opacity 0.5
- Horizontal spacing: 12px between dots
- Background: Semi-transparent dark overlay

---

#### `FlashCard.js`
**Purpose**: Displays individual flash card content

**Props**:
- `card` (object): Flash card data
  - `heading` (string): Card title
  - `content` (string): Card content text
- `index` (number): Card position number

**Design**:
- **Color**: Slate blue (`#4A6382`)
- **Layout**: 
  - Top-left corner badge with card number
  - Rounded top corners (32px radius)
  - White vertical line separator
  - Left-aligned content with padding

**Features**:
- Numbered badge (e.g., "01", "02")
- Quicksand-Bold for heading (20px)
- Quicksand-Regular for content (14px)
- White text throughout
- Vertical line decoration on left side
- Shadow effect for depth

**Dimensions**:
- Width: Full screen minus padding
- Min height: Auto-adjust to content
- Padding: 24px all sides
- Border radius: 32px (top corners only)

---

#### `DYKCard.js`
**Purpose**: Displays Did You Know cards with cause-effect relationships

**Props**:
- `card` (object): DYK card data
  - `fact` (string): Main fact text
  - `cause` (string): Cause explanation
  - `effect` (string): Effect explanation
  - `citation` (string): Source citation

**Design**:
- **Background**: White
- **Layout**: Three sections
  1. Cause (top)
  2. Effect (bottom)
  3. Arrow between them
  4. Citation link below

**Features**:
- Cause/Effect boxes with borders
- Down arrow visual separator
- Clickable citation link
- Quicksand-SemiBold for cause/effect (14px)
- Quicksand-Medium for citation (16px)
- Citation color: `#FCCCA8` (peachy)
- Underlined citation text

**Dimensions**:
- Full-width cards
- Auto-height based on content
- 16px padding between sections
- Rounded corners: 16px

**Interactive**:
- Citation opens external link
- Visual feedback on press

---

#### `TinuSection.js`
**Purpose**: "Ask Tinu" section on home screen

**Features**:
- Tinu avatar display
- Question prompt text
- "Ask Me" button
- Background image integration
- Tap to open bottom sheet chat

**Design**:
- Background: Tinu section PNG image
- Avatar: 80x80px Tinu face icon
- Question text: Single line, Quicksand-SemiBold
- Button: Rounded, white background

**Layout**:
- Fixed height section
- Centered content
- Background image fills section
- Z-index layering for tap handling

**Interaction**:
- Button press opens `TinuBottomSheet`
- Smooth animation on open

---

#### `TinuBottomSheet.js`
**Purpose**: AI chatbot interface as a bottom sheet

**Features**:
1. **Top Section**:
   - Tinu face icon
   - Current question display
   - Background blur effect

2. **Chat Section**:
   - Response cards with icons
   - Scrollable content area
   - Context information boxes

3. **Suggestion Chips**:
   - Two-row chip layout
   - Emoji/icon prefixes
   - Tap to ask question

4. **Input Section**:
   - Text input field
   - Send button
   - Fixed at bottom
   - Keyboard-aware positioning

**Keyboard Behavior**:
- When keyboard opens:
  - Hide response cards
  - Show down arrow button
  - Reduce bottom sheet height
  - Smooth layout animation (300ms)
- When keyboard closes:
  - Show response cards
  - Hide down arrow
  - Restore full height
  - Animate back smoothly

**API Integration**:
- Sends message to `/api/tinu`
- Displays loading spinner
- Shows error state with retry
- Updates suggestions dynamically

**Styling**:
- Background: Tinu bottomsheet PNG
- Height: 64% of screen (50% when keyboard open)
- Border radius: 24px top corners
- Shadow: Elevated appearance
- Content padding: 16px horizontal

**Components Within**:
- Response cards: Icon + title + content
- SCRIPT badges: Type indicators
- Context boxes: Yellow info boxes
- Suggestion chips: Quick questions
- Input area: Message composer

**Animations**:
- Smooth LayoutAnimation on keyboard events
- Card fade-in on load
- Chip press feedback
- Send button animation

---

#### `TinuFooter.js`
**Purpose**: Footer component (if needed for future use)

**Status**: Prepared for future implementation
**Potential Use**: Bottom navigation or branding

---

### Screens (`/src/screens`)

#### `HomeScreen.js`
**Purpose**: Landing screen with navigation options

**Layout**:
1. **App Branding**:
   - "TinyPal" title (48px, Quicksand-Bold)
   - "Parenting Insights" subtitle (18px, Quicksand-Regular)

2. **Navigation Buttons**:
   - **Did You Know Button**:
     - Background: Dark pink (`#8B2E4E`)
     - Text: "Did You Know"
     - Subtext: "Learn parenting insights"
     - Navigates to: `DidYouKnowScreen`
   
   - **Flash Cards Button**:
     - Background: Dark blue (`#1E3A5F`)
     - Text: "Flash Cards"
     - Subtext: "Quick parenting tips"
     - Navigates to: `FlashCardScreen`

3. **Tinu Section**:
   - Integrated `TinuSection` component
   - "Ask Tinu" chatbot interface

**Styling**:
- Background: Dark red/brown (`#270B13`)
- Centered content layout
- Button styling: Rounded (20px), shadowed
- Button text: Quicksand-SemiBold (24px)
- Subtext: Quicksand-Regular (14px)
- Full-screen safe area view

**Navigation**:
```javascript
navigation.navigate('DidYouKnow')  // To DYK screen
navigation.navigate('FlashCard')   // To FlashCard screen
```

---

#### `DidYouKnowScreen.js`
**Purpose**: Displays DYK cards in swipeable carousel

**Features**:
1. **Header**:
   - Title: "DID YOU KNOW"
   - Subtitle: "Parenting Insights"
   - Background: `#270B13` (dark red/brown)
   - Back button navigation

2. **Progress Bar**:
   - Shows current card position
   - Total cards indicator
   - Sticky at top

3. **Card Carousel**:
   - Horizontal pager view
   - One card per page
   - Swipe gesture navigation
   - Auto-updates progress

4. **Loading State**:
   - Centered spinner
   - "Loading..." text

5. **Error Handling**:
   - Error message display
   - Automatic retry logic

**API Integration**:
- Fetches DYK cards on mount: `fetchDYKCards()`
- Handles loading state
- Displays error if API fails
- Shows cards when loaded

**Card Display**:
- Uses `DYKCard` component
- Full-screen card layout
- Smooth page transitions
- Maintains scroll position

**State Management**:
```javascript
const [cards, setCards] = useState([])
const [loading, setLoading] = useState(true)
const [currentIndex, setCurrentIndex] = useState(0)
```

**Styling**:
- Background: `#270B13`
- Full-screen layout
- SafeAreaView wrapper
- StatusBar: Light content

---

#### `FlashCardScreen.js`
**Purpose**: Displays flash cards in swipeable carousel

**Features**:
1. **Header**:
   - Title: "FLASH CARDS"
   - Subtitle: "Quick Tips"
   - Background: `#081824` (dark blue)
   - Back button navigation

2. **Progress Bar**:
   - Shows current card position
   - Total cards indicator
   - Sticky at top

3. **Card Carousel**:
   - Horizontal pager view
   - One card per page
   - Swipe gesture navigation
   - Auto-updates progress

4. **Loading State**:
   - Centered spinner
   - "Loading..." text

5. **Error Handling**:
   - Error message display
   - Automatic retry logic

**API Integration**:
- Fetches flash cards on mount: `fetchFlashCards()`
- Handles loading state
- Displays error if API fails
- Shows cards when loaded

**Card Display**:
- Uses `FlashCard` component
- Full-screen card layout
- Smooth page transitions
- Maintains scroll position

**State Management**:
```javascript
const [cards, setCards] = useState([])
const [loading, setLoading] = useState(true)
const [currentIndex, setCurrentIndex] = useState(0)
```

**Styling**:
- Background: Dark blue (`#081824`)
- Full-screen layout
- SafeAreaView wrapper
- StatusBar: Light content

---

## 🎨 Design System

### Typography

**Font Family**: Quicksand
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Emphasis, citations
- **SemiBold (600)**: Section titles, buttons
- **Bold (700)**: Headings, card numbers

**Font Sizes**:
- 48px: Main app title
- 24px: Navigation buttons
- 20px: Card headings
- 18px: Section titles
- 16px: Citations, body text
- 14px: Subtitles, descriptions
- 13px: Input text, chips
- 10px: Badges

### Color Palette

**Primary Colors**:
- Dark Red/Brown: `#270B13` - Main background, DYK header
- Dark Pink: `#8B2E4E` - DYK button, primary actions
- Dark Blue: `#1E3A5F` - FlashCard button
- Slate Blue: `#4A6382` - FlashCard cards
- Deep Blue: `#081824` - FlashCard header

**Accent Colors**:
- Peachy: `#FCCCA8` - Citations, links
- White: `#FFFFFF` - Text, cards
- Yellow: `#FFF9E6` - Context info boxes

**Text Colors**:
- Dark: `#1A1A1A` - Primary text on light backgrounds
- Light: `#FFFFFF` - Text on dark backgrounds
- Secondary: `#CCCCCC` - Subtle text
- Transparent: `rgba(255, 255, 255, 0.7)` - Muted text

### Spacing

**Padding**:
- Screen edges: 16px
- Card padding: 24px
- Button padding: 24px horizontal, 10px vertical
- Input padding: 20px left, 8px vertical

**Margins**:
- Section spacing: 20px
- Card spacing: 12px
- Chip spacing: 8px
- Element spacing: 4-8px

### Border Radius

- Buttons: 20px
- Cards: 16-32px
- Input fields: 24px
- Chips: 20px
- Bottom sheet: 24px (top only)

### Shadows

**Elevation Levels**:
- Low (cards): `shadowOpacity: 0.1, shadowRadius: 4`
- Medium (buttons): `shadowOpacity: 0.3, shadowRadius: 8`
- High (overlays): `shadowOpacity: 0.25, shadowRadius: 8`

---

## 🔧 Configuration Files

### `react-native.config.js`
**Purpose**: React Native CLI configuration
```javascript
module.exports = {
  assets: ['./src/assets/fonts/'],  // Font linking
};
```

### `babel.config.js`
**Purpose**: Babel transpiler configuration
- Presets: `@react-native/babel-preset`
- Required for JSX and modern JavaScript features

### `metro.config.js`
**Purpose**: Metro bundler configuration
- Asset resolution
- Module transformation rules

### `tsconfig.json`
**Purpose**: TypeScript configuration
- Even though app is JS-based, needed for type checking
- Strict mode disabled for flexibility

### `jest.config.js`
**Purpose**: Testing configuration
- Test environment: Node
- Module path aliases
- Transform patterns for React Native

---

## 📱 Platform-Specific

### Android (`/android`)

**Key Files**:
- `build.gradle`: Project-level build configuration
- `app/build.gradle`: App-level build configuration
- `gradle.properties`: Gradle settings
- `app/src/main/AndroidManifest.xml`: App permissions and configuration
- `app/src/main/assets/fonts/`: Font files for Android
- `app/src/main/res/`: Android resources (icons, strings)

**Font Integration**:
- Fonts automatically linked to `app/src/main/assets/fonts/`
- Accessible via `fontFamily` prop in styles

**Build Commands**:
```bash
# Clean build
cd android && ./gradlew clean

# Debug build
npm run android

# Release build
cd android && ./gradlew assembleRelease
```

### iOS (`/ios`)

**Key Files**:
- `Podfile`: CocoaPods dependencies
- `TinyPalApp.xcodeproj/`: Xcode project file
- `TinyPalApp/Info.plist`: App metadata, font declarations
- `TinyPalApp/AppDelegate.swift`: iOS app lifecycle
- `TinyPalApp/Images.xcassets/`: App icons and images

**Font Integration**:
- Fonts declared in `Info.plist` under `UIAppFonts`
- Referenced in Xcode project via `react-native-asset`
- Font files: `../src/assets/fonts/*.ttf`

**Build Commands**:
```bash
# Install pods
cd ios && pod install

# Run on iOS
npm run ios

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS, macOS only)
- CocoaPods (for iOS)

### Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Link Assets** (if needed):
```bash
npx react-native-asset
```

3. **Android Setup**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

4. **iOS Setup**:
```bash
cd ios
pod install
cd ..
npm run ios
```

### Running the App

**Start Metro Bundler**:
```bash
npm start
```

**Run on Android**:
```bash
npm run android
```

**Run on iOS**:
```bash
npm run ios
```

**Clear Cache**:
```bash
npm start -- --reset-cache
```

---

## 🔌 API Integration

### Backend Service
**URL**: `https://genai-images-4ea9c0ca90c8.herokuapp.com`

### Endpoints

#### 1. GET `/api/dyk`
**Purpose**: Fetch Did You Know cards

**Response**:
```javascript
{
  success: true,
  data: [
    {
      fact: "Parenting fact text",
      cause: "Cause explanation",
      effect: "Effect explanation",
      citation: "Source citation"
    }
  ]
}
```

#### 2. GET `/api/flashcards`
**Purpose**: Fetch Flash Cards

**Response**:
```javascript
{
  success: true,
  data: [
    {
      heading: "Card title",
      content: "Card content text"
    }
  ]
}
```

#### 3. POST `/api/tinu`
**Purpose**: Send message to AI chatbot

**Request**:
```javascript
{
  message: "User question",
  userContext: {
    childAge: "3 years",
    // other context
  }
}
```

**Response**:
```javascript
{
  success: true,
  data: {
    response: "AI-generated response text",
    cards: [
      {
        type: "story" | "activity" | "fact" | "tip",
        icon: "stories" | "activities" | "facts" | "tips",
        title: "Card title",
        content: "Card content"
      }
    ],
    suggestedQuestions: [
      "Suggested question 1",
      "Suggested question 2",
      ...
    ]
  }
}
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Files
- `__tests__/App.test.tsx`: App component tests
- Additional tests can be added in `__tests__/` directory

---

## 🎯 Key Features

### 1. **Navigation**
- Stack-based navigation
- Smooth slide animations (250ms)
- Gesture support (swipe-back)
- Platform-aware transitions

### 2. **Content Display**
- Horizontal swipeable carousels
- Progress indicators
- Loading states
- Error handling

### 3. **AI Chatbot**
- Bottom sheet interface
- Real-time responses
- Suggested questions
- Context-aware replies
- Card-based responses

### 4. **Keyboard Handling**
- Auto-adjust bottom sheet
- Hide/show content based on keyboard state
- Smooth animations
- Input always visible

### 5. **Typography**
- Custom Quicksand font family
- Multiple font weights
- Consistent font usage across app

### 6. **Responsive Design**
- SafeArea handling
- Dynamic dimensions
- Platform-specific adaptations

---

## 📝 Code Conventions

### File Naming
- Components: PascalCase (e.g., `FlashCard.js`)
- Screens: PascalCase with "Screen" suffix (e.g., `HomeScreen.js`)
- Utilities: camelCase (e.g., `tinuApi.js`)
- Constants: camelCase (e.g., `colors.js`)

### Component Structure
```javascript
import statements
↓
Component definition
↓
StyleSheet.create()
↓
export default
```

### Styling
- Use `StyleSheet.create()` for all styles
- Co-locate styles with components
- Use theme colors from `colors.js`
- Platform-specific styles when needed

### State Management
- React hooks (useState, useEffect)
- Local component state
- API calls in useEffect
- Error boundaries for safety

---

## 🔒 Security Considerations

1. **API Security**:
   - HTTPS connections only
   - Timeout settings prevent hanging requests
   - Error handling prevents crashes

2. **User Data**:
   - No persistent storage currently
   - API context is temporary
   - No sensitive data collected

3. **Dependencies**:
   - Regular updates recommended
   - Security patches applied

---

## 🐛 Troubleshooting

### Common Issues

**1. Fonts Not Showing**:
```bash
# Re-link assets
npx react-native-asset

# Clean and rebuild
cd android && ./gradlew clean && cd ..
npm run android
```

**2. Build Failures**:
```bash
# Clear caches
npm start -- --reset-cache

# Clear node modules
rm -rf node_modules
npm install
```

**3. iOS Pod Issues**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

**4. Metro Bundler Issues**:
```bash
# Reset Metro
npm start -- --reset-cache

# Kill all Metro processes
killall -9 node
```

---

## 📊 Performance Optimization

### Best Practices Implemented

1. **Image Optimization**:
   - PNG images optimized
   - Proper image sizing
   - Lazy loading where applicable

2. **Component Optimization**:
   - Functional components
   - React hooks for state
   - Memoization where needed

3. **Navigation**:
   - Native stack navigator (fastest)
   - Gesture handling optimized
   - Smooth animations

4. **API Calls**:
   - Request timeouts
   - Error handling
   - Loading states

---

## 🚢 Deployment

### Android Release

1. **Generate Signed APK**:
```bash
cd android
./gradlew assembleRelease
```

2. **Generate AAB** (for Play Store):
```bash
cd android
./gradlew bundleRelease
```

3. **Output Location**:
- APK: `android/app/build/outputs/apk/release/`
- AAB: `android/app/build/outputs/bundle/release/`

### iOS Release

1. **Archive in Xcode**:
   - Open `ios/TinyPalApp.xcworkspace`
   - Product > Archive
   - Follow Xcode distribution flow

2. **TestFlight**:
   - Upload via Xcode
   - Distribute to testers

---

## 📚 Dependencies

### Production Dependencies
- **@react-native-community/blur**: Blur effects for UI
- **@react-native-community/slider**: Slider component
- **@react-navigation/native**: Navigation framework
- **@react-navigation/native-stack**: Stack navigator
- **axios**: HTTP client for API calls
- **react**: Core React library
- **react-native**: React Native framework
- **react-native-linear-gradient**: Gradient backgrounds
- **react-native-safe-area-context**: SafeArea handling
- **react-native-screens**: Native screen optimization
- **react-native-svg**: SVG support

### Development Dependencies
- **@babel/core**: JavaScript compiler
- **@react-native/eslint-config**: Linting rules
- **@react-native/metro-config**: Metro bundler config
- **@react-native/typescript-config**: TypeScript config
- **eslint**: Code linting
- **jest**: Testing framework
- **prettier**: Code formatting
- **typescript**: TypeScript support

---

## 🔮 Future Enhancements

### Potential Features
1. User authentication
2. Personalized content
3. Offline mode with local storage
4. Push notifications
5. Social sharing
6. Bookmarks/favorites
7. Search functionality
8. Multi-language support
9. Dark/Light theme toggle
10. Analytics integration

---

## 📞 Support & Contact

For questions or issues:
1. Check this documentation
2. Review code comments
3. Check API logs in console
4. Test on different devices

---

## 📄 License

Private project - All rights reserved

---

## 🎉 Credits

**Development**: TinyPal Team
**Design**: Custom UI/UX
**Font**: Quicksand by Andrew Paglinawan
**Icons**: Custom assets
**Backend**: Heroku-hosted API

---

## 📅 Version History

**v0.0.1** (Current)
- Initial release
- DYK cards functionality
- Flash cards functionality
- Tinu AI chatbot
- Custom Quicksand fonts
- Smooth navigation animations
- iOS and Android support

---

## 🏁 Quick Reference

### Common Commands
```bash
# Start app
npm start
npm run android
npm run ios

# Clean build
cd android && ./gradlew clean
cd ios && pod install

# Reset cache
npm start -- --reset-cache

# Link assets
npx react-native-asset

# Lint code
npm run lint

# Run tests
npm test
```

### Key Files Cheat Sheet
- Navigation: `App.tsx`
- API calls: `src/api/tinuApi.js`
- Colors: `src/theme/colors.js`
- Home: `src/screens/HomeScreen.js`
- DYK: `src/screens/DidYouKnowScreen.js`
- FlashCards: `src/screens/FlashCardScreen.js`
- Chat: `src/components/TinuBottomSheet.js`

---

**Last Updated**: October 16, 2025
**Documentation Version**: 1.0.0
