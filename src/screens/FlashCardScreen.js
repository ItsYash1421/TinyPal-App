import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import FlashCard from '../components/FlashCard';
import TinuSection from '../components/TinuSection';
import TinuBottomSheet from '../components/TinuBottomSheet';
import {fetchP13nAnswers} from '../api/tinuApi';
import {colors} from '../theme/colors';

const {width} = Dimensions.get('window');

const FlashCardScreen = ({navigation}) => {
  const [flashCards, setFlashCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [tinuContext, setTinuContext] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchP13nAnswers();
      if (data.flash_cards && data.flash_cards.length > 0) {
        setFlashCards(data.flash_cards);
      }
    } catch (error) {
      console.error('Error loading Flash cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleAskTinu = card => {
    if (card.tinu_activation) {
      setTinuContext({
        context: 'flash_card',
        topic: card.tinu_activation.parameters.topic,
      });
      setBottomSheetVisible(true);
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081824" />
      <Header
        title="UNLEARN OLD PATTERNS"
        subtitle="No Distractions 101"
        onBackPress={handleBackPress}
        backgroundColor="#081824"
      />
      
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={flashCards}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <FlashCard 
              card={item} 
              cardNumber={index + 1}
            />
          )}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
        
        {/* Progress Bar Overlay */}
        <View style={styles.progressBarOverlay}>
          <ProgressBar totalItems={flashCards.length} currentIndex={currentIndex} />
        </View>
      </View>

      {/* Fixed Tinu Section */}
      <TinuSection
        onAskTinu={() => handleAskTinu(flashCards[currentIndex])}
        onDragHandle={() => setBottomSheetVisible(true)}
      />

      {bottomSheetVisible && tinuContext && (
        <TinuBottomSheet
          isVisible={bottomSheetVisible}
          onClose={() => setBottomSheetVisible(false)}
          context={tinuContext.context}
          topic={tinuContext.topic}
        />
      )}
    </View>
  );
};const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  progressBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontFamily: 'Quicksand-Regular',
    marginTop: 12,
    fontSize: 14,
    color: colors.white,
  },
});

export default FlashCardScreen;
