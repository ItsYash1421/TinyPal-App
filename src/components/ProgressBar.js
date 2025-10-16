import React from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import {colors} from '../theme/colors';

const {width} = Dimensions.get('window');

const ProgressBar = ({totalItems, currentIndex}) => {
  const barWidth = (width - 32 - (totalItems - 1) * 4) / totalItems;

  return (
    <View style={styles.container}>
      {Array.from({length: totalItems}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {width: barWidth},
            index === currentIndex && styles.activeBar,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
  bar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  activeBar: {
    backgroundColor: colors.white,
  },
});

export default ProgressBar;
