/**
 * TinyPal App
 * Parenting Insights Application
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import DidYouKnowScreen from './src/screens/DidYouKnowScreen';
import FlashCardScreen from './src/screens/FlashCardScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === 'ios' ? 'slide_from_right' : 'slide_from_right',
            animationDuration: 250,
            animationTypeForReplace: 'push',
            contentStyle: {
              backgroundColor: 'transparent',
            },
            fullScreenGestureEnabled: true,
            gestureEnabled: true,
          }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen 
            name="DidYouKnow" 
            component={DidYouKnowScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="FlashCard" 
            component={FlashCardScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
