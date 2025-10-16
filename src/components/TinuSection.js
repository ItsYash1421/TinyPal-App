import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../theme/colors';

const {width} = Dimensions.get('window');

const TinuSection = ({onAskTinu, onDragHandle}) => {
  return (
    <View style={styles.container}>
      {/* Face Icon - Overlapping the curve */}
      <View style={styles.faceIconContainer}>
        <Image
          source={require('../assets/images/faceicon.png')}
          style={styles.faceIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSection}>
        <Image
          source={require('../assets/images/bottom.png')}
          style={styles.bottomBackground}
          resizeMode="cover"
          fadeDuration={Platform.OS === 'ios' ? 0 : 300} 
        />

        {/* Content Overlay */}
        <View style={styles.contentOverlay}>
          {/* Drag Handle */}
          <TouchableOpacity
            style={styles.dragHandle}
            onPress={onDragHandle}
            activeOpacity={0.7}>
            <View style={styles.dragLine} />
          </TouchableOpacity>

          {/* Text and Button Row */}
          <View style={styles.textButtonRow}>
            <Text style={styles.questionText} numberOfLines={1} ellipsizeMode="tail">What are considered distractions?</Text>
            <TouchableOpacity
              onPress={onAskTinu}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#E2D3FF', '#FFCCB8', '#FFB4E2']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                locations={[0, 0.5292, 1]}
                style={styles.askButton}>
                <Text style={styles.askButtonText}>Ask Tinu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140, 
    zIndex: 100,
  },
  faceIconContainer: {
    position: 'absolute',
    left: Platform.OS === 'ios' ? 46 : 58, 
    top: Platform.OS === 'ios' ? -2 : 5,
    width: Platform.OS === 'ios' ? 85 : 70, 
    height: Platform.OS === 'ios' ? 85 : 70,
    borderRadius: Platform.OS === 'ios' ? 42.5 : 35,
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 103, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 8,
    elevation: 8,
  },
  faceIcon: {
    width: Platform.OS === 'ios' ? 75 : 60, 
    height: Platform.OS === 'ios' ? 75 : 60,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    overflow: 'visible',
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    width: '100%',
    height: 270, 
    zIndex: 1, 
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 22,
    paddingHorizontal: Platform.OS === 'ios' ? 12 : 24, 
    paddingBottom: 28,
    zIndex: 102,
    justifyContent: 'space-between',
  },
  dragHandle: {
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 40,
    zIndex: 103,
  },
  dragLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF', 
  },
  textButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Platform.OS === 'ios' ? 6 : 10,
    paddingRight: Platform.OS === 'ios' ? 4 : 0, 
    zIndex: 103,
  },
  questionText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    letterSpacing: -0.32, 
    color: colors.textDark,
    flex: 1,
    marginRight: Platform.OS === 'ios' ? 6 : 12, 
    flexShrink: 1, 
  },
  askButton: {
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 24,
    paddingVertical: Platform.OS === 'ios' ?  0 : 10,
    width: Platform.OS === 'ios' ? 82 : undefined, 
    height: Platform.OS === 'ios' ? 33 : undefined,
    borderRadius: Platform.OS === 'ios' ? 92 : 20, 
    zIndex: 104,
    flexShrink: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.1,
    shadowRadius: Platform.OS === 'ios' ? 6 : 4,
    elevation: 5, 
  },
  askButtonText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: Platform.OS === 'ios' ? 13 : 15, 
    color: colors.textDark,
    textAlign: 'center',
    whiteSpace: 'nowrap', 
  },
});

export default TinuSection;
