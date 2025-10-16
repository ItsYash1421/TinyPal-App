import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform} from 'react-native';
import {colors} from '../theme/colors';

const {width} = Dimensions.get('window');

const Header = ({title, subtitle, onBackPress, backgroundColor = '#270B13'}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.contentRow}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
   
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16, 
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backIcon: {
    width: 34,
    height: 34,
    tintColor: colors.white,
  },
  divider: {
    width: 2,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: colors.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
});

export default Header;
