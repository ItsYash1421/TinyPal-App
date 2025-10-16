import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
  Image,
  Platform,
  Keyboard,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {activateTinu} from '../api/tinuApi';
import TinuTopSection from './TinuTopSection';
import TinuContentSection from './TinuContentSection';
import TinuInputBar from './TinuInputBar';
import {LoadingState, ErrorState} from './TinuLoadingState';

const {width, height} = Dimensions.get('window');


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TinuBottomSheet = ({isVisible, onClose, context, topic}) => {
  const [tinuData, setTinuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [slideAnim] = useState(new Animated.Value(height));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchTinuData();
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, context, topic]);

  const fetchTinuData = async () => {
    if (!context || !topic) {
      setError('Missing context or topic');
      console.warn('TinuBottomSheet: Missing context or topic', { context, topic });
      return;
    }
    
    console.log('TinuBottomSheet: Fetching Tinu data with:', { context, topic });
    setLoading(true);
    setError(null);
    try {
      const data = await activateTinu(context, topic);
      console.log('TinuBottomSheet: Tinu data received:', data);
      setTinuData(data);
    } catch (error) {
      console.error('TinuBottomSheet: Error fetching Tinu data:', error);
      if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
        setError('Network error. Please check your internet connection and try again.');
      } else if (error.response) {
        console.error('TinuBottomSheet: Server error response:', error.response.status, error.response.data);
        setError(`Server error: ${error.response.status}. Please try again later.`);
      } else {
        setError('Failed to load Tinu data. Please try again.');
      }
    } finally {
      setLoading(false);
      console.log('TinuBottomSheet: Fetch completed');
    }
  };

  const handleDismissKeyboard = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    Keyboard.dismiss();
  };

  const handleSend = () => {
    // Add your send logic here
    console.log('Send message:', inputText);
    // You can add API call or other logic here
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        {/* Blur Background */}
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={20}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.7)"
        />
        
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        {/* Face Icon and Question Text  */}
        <TinuTopSection 
          slideAnim={slideAnim}
          isKeyboardVisible={isKeyboardVisible}
          questionText="What are considered distractions?"
        />
        
        <Animated.View 
          style={[
            styles.bottomSheet,
            isKeyboardVisible && styles.bottomSheetKeyboardOpen,
            {transform: [{translateY: slideAnim}]}
          ]}>
          {/* Background Image */}
          <Image
            source={require('../assets/images/tinudeepdive.png')}
            style={[
              styles.backgroundImage,
              isKeyboardVisible && styles.backgroundImageKeyboardOpen
            ]}
            resizeMode="cover"
          />
          
          {/* Down Arrow Button - Shows when keyboard is visible */}
          {isKeyboardVisible && (
            <TouchableOpacity 
              style={styles.downArrowButton}
              onPress={handleDismissKeyboard}
              activeOpacity={0.7}>
              <Image
                source={require('../assets/images/down.png')}
                style={styles.downArrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          
          <View style={styles.container}>
            {/* Handle Indicator */}
            <View style={styles.handleIndicator} />

            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onRetry={fetchTinuData} />
            ) : (
              <TinuContentSection 
                tinuData={tinuData}
                isKeyboardVisible={isKeyboardVisible}
              />
            )}
            
            {/* Input Section - Fixed at bottom */}
            {!loading && !error && (
              <TinuInputBar
                inputRef={inputRef}
                inputText={inputText}
                onChangeText={setInputText}
                onSend={handleSend}
              />
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  backdrop: {
    flex: 1,
  },
  bottomSheet: {
    height: height * 0.64, 
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  bottomSheetKeyboardOpen: {
    height: Platform.OS === 'ios' ? height * 0.46 : height * 0.50,
  },
  downArrowButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 104,
  },
  downArrowIcon: {
    width: 24,
    height: 24,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: height - 290,
    zIndex: 0,
  },
  backgroundImageKeyboardOpen: {
    height: Platform.OS === 'ios' ? height * 0.66 : height * 0.66,
    width: width, 
    top: 0, 
    left: 0,
    right: 0,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 12,
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    zIndex: 1, 
    paddingTop: 0,
    paddingBottom: 90, 
  },
});

export default TinuBottomSheet;
