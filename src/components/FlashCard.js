import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {colors} from '../theme/colors';

const {width, height} = Dimensions.get('window');
const BASE_IMAGE_URL = 'https://genai-images-4ea9c0ca90c8.herokuapp.com';

const FlashCard = ({card, cardNumber}) => {
  const imageUrl = card.image_url.startsWith('http')
    ? card.image_url
    : `${BASE_IMAGE_URL}${card.image_url}`;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUrl}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content Card - Overlaps bottom of image */}
      <View style={styles.contentCardWrapper}>
        {/* Blue Content Card */}
        <View style={styles.contentCard}>
          {/* Card Number Badge - Top left corner */}
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{cardNumber}</Text>
          </View>
          
          <View style={styles.contentWithLine}>
            <View style={styles.verticalLine} />
            <View style={styles.contentInner}>
              <Text style={styles.heading}>{card.heading}</Text>
              <Text style={styles.content}>{card.content}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 100,
    backgroundColor: '#081824', 
  },
  imageContainer: {
    width: width-0.7,
    height: height * 0.48,
    position: 'relative',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentCardWrapper: {
    position: 'absolute',
    top: height * 0.36,
    left: 0,
    right: 0,
  },
  contentCard: {
    width: width-0.7,
    backgroundColor: '#4A6382', 
    borderBottomLeftRadius: 32,
    borderBottomRightRadius:32,
    padding: 20,
    minHeight: height * 0.35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  numberBadge: {
    position: 'absolute',
    top: -36,
    left: 20,
    width: 58,
    height: 62,
    borderRadius: 30,
    backgroundColor: '#4A6382', 
    justifyContent: 'center',
    alignItems: 'center',
    
   

    zIndex: 10,
  },
  numberText: {
    top:-8,
    fontFamily: 'Quicksand-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  contentWithLine: {
    flexDirection: 'row',
    marginTop: 25, 
  },
  verticalLine: {
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,

    marginRight: 16,
    minHeight: 150,
  },
  contentInner: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 26,
  },
  content: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
    opacity: 0.95,
  },
});

export default FlashCard;
