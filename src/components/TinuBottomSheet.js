import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
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
import {colors} from '../theme/colors';
import {activateTinu} from '../api/tinuApi';

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

  const renderCard = (card, index) => {
    return (
      <View key={index} style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.scriptBadge}>
            <Image
              source={require('../assets/images/sciption.png')}
              style={styles.scriptIcon}
              resizeMode="contain"
            />
            <Text style={styles.scriptText}>SCRIPT</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionIcon}>
              <Image
                source={require('../assets/images/shareicon.png')}
                style={styles.actionIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Image
                source={require('../assets/images/saveicon.png')}
                style={styles.actionIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.cardContent}>{card.content}</Text>
      </View>
    );
  };

  const renderChip = (chip, index) => {
    // Extract emoji from SVG icon
    const emojiMatch = chip.icon?.match(/>(.*?)<\/text>/);
    const emoji = emojiMatch ? emojiMatch[1] : '😊';
    
    return (
      <TouchableOpacity key={index} style={styles.chip}>
        <Text style={styles.chipEmoji}>{emoji}</Text>
        <Text style={styles.chipText}>
          {chip.label}
        </Text>
      </TouchableOpacity>
    );
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
        <Animated.View 
          style={[
            styles.topSection,
            {transform: [{translateY: slideAnim}]},
            isKeyboardVisible && styles.topSectionKeyboardOpen
          ]}>
          <View style={styles.faceIconWrapper}>
            <Image
              source={require('../assets/images/faceicon.png')}
              style={styles.topFaceIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.topQuestionText}>
            What are considered{'\n'}distractions?
          </Text>
        </Animated.View>
        
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
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={fetchTinuData}>
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView style={styles.scrollContent}>
                {/* Cards Section - Hidden when keyboard is visible */}
                {!isKeyboardVisible && tinuData?.cards && tinuData.cards.length > 0 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.cardsScroll}
                    contentContainerStyle={styles.cardsContainer}>
                    {tinuData.cards.map((card, index) => renderCard(card, index))}
                  </ScrollView>
                )}

                {/* Context Info */}
                {tinuData?.context_info && (
                  <View style={styles.contextInfo}>
                    <Text style={styles.contextText}>
                      {tinuData.context_info}
                    </Text>
                  </View>
                )}

                {/* Chips Section with Dynamic Data */}
                {tinuData?.chips && tinuData.chips.length > 0 && (
                  <>
                    <View style={[
                      styles.sectionTitleContainer,
                      isKeyboardVisible && styles.sectionTitleContainerKeyboardOpen
                    ]}>
                      <Image
                        source={require('../assets/images/context.png')}
                        style={styles.contextIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.sectionTitleText}>
                        {tinuData.context_label || 'Share more context of Arya'}
                      </Text>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={[
                        styles.chipsScroll,
                        isKeyboardVisible && styles.chipsScrollKeyboardOpen
                      ]}>
                      <View style={styles.chipsWrapper}>
                 
                        {Array.from({ length: Math.ceil(tinuData.chips.length / 2) }).map((_, colIndex) => (
                          <View key={colIndex} style={styles.chipColumn}>
                            {tinuData.chips
                              .filter((_, chipIndex) => Math.floor(chipIndex / 2) === colIndex)
                              .map((chip, rowIndex) => renderChip(chip, colIndex * 2 + rowIndex))}
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                  </>
                )}
              </ScrollView>
            )}
            
            {/* Input Section - Fixed at bottom */}
            {!loading && !error && (
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="Ask me anything..."
                  placeholderTextColor={colors.textSecondary}
                  value={inputText}
                  onChangeText={setInputText}
                  multiline={false}
                />
                <TouchableOpacity style={styles.sendButton}>
                  <Image
                    source={require('../assets/images/enter.png')}
                    style={styles.sendIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
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
  topSection: {
    position: 'absolute',
    bottom: height * 0.60, 
    left: 0,
    right: 0,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingLeft: 40, 
    zIndex: 102,
  },
  topSectionKeyboardOpen: {
    bottom: Platform.OS === 'ios' ? height * 0.80 : height * 0.46, // Move more up on iOS when keyboard opens
  },
  faceIconWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20, 
    marginTop: 15, 
  },
  topFaceIcon: {
    width: 120,
    height: 120,
  },
  topQuestionText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 17,
    lineHeight: 17, 
    letterSpacing: -0.34, 
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
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
    height: Platform.OS === 'ios' ? height * 0.46 : height * 0.50, // Adjust height for iOS keyboard
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
  scrollContent: {
    flex: 1,
    paddingBottom: 20, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Quicksand-Regular',
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  cardsScroll: {
    marginTop: 16,
    maxHeight: 200,
    marginBottom: 35,
    paddingLeft: 16,
  },
  cardsContainer: {
    paddingRight: 16,
    gap: 12,
  },
  card: {
    width: 300,
    minHeight: 144.57,
    backgroundColor: 'rgba(240, 207, 210, 0.5)', 
    borderRadius: 21.42,
    borderWidth: 0.45,
    borderColor: '#CDB3C4',
    padding: 12,
    marginRight: 10.71,
    gap: 10.71,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scriptBadge: {
    width: 70,
    height: 24,
    backgroundColor: '#CCACC099',
    borderRadius: 121.74,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  scriptIcon: {
    width: 12,
    height: 12,
  },
  scriptText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconImage: {
    width: 24,
    height: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  cardTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16.07,
    lineHeight: 21.42,
    letterSpacing: 0,
    color: colors.textDark,
    marginBottom: 4,
  },
  cardContent: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14.28,
    lineHeight: 21.42,
    letterSpacing: 0,
    color: colors.textDark,
  },
  contextInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
  },
  contextText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 13,
    color: colors.textDark,
    lineHeight: 18,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
    gap: 8,
    paddingLeft: 16,
  },
  sectionTitleContainerKeyboardOpen: {
    marginTop: Platform.OS === 'ios' ? 120 : 180, 
  },
  contextIcon: {
    width: 20,
    height: 20,
  },
  sectionIcon: {
    fontSize: 16,
  },
  sectionTitleText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: '#8B5CF6',
  },
  sectionTitle: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: colors.textDark,
    marginTop: 20,
    marginBottom: 12,
  },
  chipsScroll: {
    maxHeight: 108,
    marginBottom: 20,
    paddingLeft: 16,
  },
  chipsScrollKeyboardOpen: {
    marginBottom: Platform.OS === 'ios' ? 8 : 10, // Adjust bottom margin for iOS
    marginTop: Platform.OS === 'ios' ? 10 : undefined, // No extra top margin on iOS
  },
  chipsWrapper: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  chipColumn: {
    flexDirection: 'column',
    marginRight: 8,
  },
  chipsContainer: {
    paddingRight: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF80',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#BBBBBB',
    marginBottom: 8,
  },
  chipEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  chipIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  chipText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 13,
    color: '#000000',
    flexShrink: 0,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 23.57,
    right: 23.57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 365,
    height: 62,
    backgroundColor: colors.white,
    borderRadius: 70,
    paddingTop: 8,
    paddingRight: 6,
    paddingBottom: 8,
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  input: {
    fontFamily: 'Quicksand-Regular',
    flex: 1,
    fontSize: 14,
    color: '#000000',
    paddingVertical: 0,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  sendIcon: {
    width: 52,
    height: 52,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryButtonText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
    color: colors.white,
  },
});

export default TinuBottomSheet;
