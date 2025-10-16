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

const DYKCard = ({card}) => {
  const imageUrl = card.image_url.startsWith('http')
    ? card.image_url
    : `${BASE_IMAGE_URL}${card.image_url}`;

  return (
    <View style={styles.container}>
      {/* Background Image with rounded top corners */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUrl}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      {/* Content Card - Ellipse format */}
      <View style={styles.contentCardWrapper}>
        {/* Ellipse Background Image */}
        <Image
          source={require('../assets/images/elipse.png')}
          style={styles.ellipseBackground}
          resizeMode="stretch"
        />

        {/* DID YOU KNOW Badge */}
        <View style={styles.badgeContainer}>
          <Image
            source={require('../assets/images/dyk.png')}
            style={styles.dykBadge}
            resizeMode="contain"
          />
        </View>

        {/* Content Container */}
        <View style={styles.contentCard}>
          {/* Cause and Effect Section */}
          {card.cause_and_effect && (
            <View style={styles.causeEffectContainer}>
              <View style={styles.causeBox}>
                <Text style={styles.causeEffectText}>
                  {card.cause_and_effect.cause}
                </Text>
              </View>
              <Image
                source={require('../assets/images/arrow.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
              <View style={styles.effectBox}>
                <Text style={styles.causeEffectText}>
                  {card.cause_and_effect.effect}
                </Text>
              </View>
            </View>
          )}

          {/* Main Content */}
          <Text style={styles.content}>{card.content}</Text>

          {/* Citation - Underlined like a link */}
          {card.citation && (
            <Text style={styles.citation}>{card.citation.label}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 60, 
    backgroundColor: '#270B13', 
    overflow: 'hidden', 
  },
  imageContainer: {
    width: width -0.5, 
    height: height * 0.48,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  contentCardWrapper: {
    position: 'absolute',
    top: height * 0.27, 
    left: 0, 
    right: 0,
    width: width - 0.5,
    height: height * 0.45, 
    alignItems: 'center',
    overflow: 'hidden', 
    borderBottomLeftRadius: 32, 
    borderBottomRightRadius: 32,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5, 
    zIndex: 10,
    alignItems: 'center',
  },
  dykBadge: {
    width: 150, 
    height: 87, 
  },
  ellipseBackground: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: width - 0.1, 
    height: '100%', 
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32, 
    zIndex: 0,
  },
  contentCard: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    width: width - 16, 
    paddingHorizontal: 20,
    paddingTop: 20, 
    paddingBottom: 30,
    zIndex: 2,
  },
  causeEffectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  causeBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  effectBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  causeEffectText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 18,
  },
  arrowIcon: {
    width: 51, 
    height: 51, 
    tintColor: colors.white,
  },
  content: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 18,
    lineHeight: 18 * 1.35, 
    letterSpacing: -0.36, 
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  citation: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.32, 
    color: '#FCCCA8',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#FCCCA8',
    textDecorationStyle: 'solid',
    top:40,
  },
});

export default DYKCard;
