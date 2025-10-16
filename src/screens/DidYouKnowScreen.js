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
import DYKCard from '../components/DYKCard';
import TinuSection from '../components/TinuSection';
import TinuBottomSheet from '../components/TinuBottomSheet';
import {fetchP13nAnswers} from '../api/tinuApi';
import {colors} from '../theme/colors';

const {width} = Dimensions.get('window');

const DidYouKnowScreen = ({navigation}) => {
  const [dykCards, setDykCards] = useState([]);
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
      if (data.dyk_cards && data.dyk_cards.length > 0) {
        setDykCards(data.dyk_cards);
      }
    } catch (error) {
      console.error('Error loading DYK cards:', error);
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
        context: 'dyk_card',
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
      <StatusBar barStyle="light-content" backgroundColor="#270B13" />
      <Header
        title="UNLEARN OLD PATTERNS"
        subtitle="Distractions=No No!"
        onBackPress={handleBackPress}
        backgroundColor="#270B13"
      />
      
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={dykCards}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DYKCard card={item} />
          )}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
        
        {/* Progress Bar Overlay */}
        <View style={styles.progressBarOverlay}>
          <ProgressBar totalItems={dykCards.length} currentIndex={currentIndex} />
        </View>
      </View>

      {/* Fixed Tinu Section */}
      <TinuSection
        onAskTinu={() => handleAskTinu(dykCards[currentIndex])}
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
    backgroundColor: '#270B13', 
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
    backgroundColor: '#270B13', 
  },
  loadingText: {
    fontFamily: 'Quicksand-Regular',
    marginTop: 12,
    fontSize: 14,
    color: colors.white,
  },
});

export default DidYouKnowScreen;
