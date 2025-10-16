import React from 'react';
import {View, Text, StyleSheet, Image, Animated, Dimensions, Platform} from 'react-native';

const {height} = Dimensions.get('window');

const TinuTopSection = ({slideAnim, isKeyboardVisible, questionText}) => {
  return (
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
        {questionText || "What are considered distractions?"}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
    bottom: Platform.OS === 'ios' ? height * 0.80 : height * 0.46,
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
});

export default TinuTopSection;
