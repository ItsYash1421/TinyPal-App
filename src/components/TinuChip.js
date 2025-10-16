import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const TinuChip = ({chip, index}) => {
  // Extract emoji from SVG icon
  const emojiMatch = chip.icon?.match(/>(.*?)<\/text>/);
  const emoji = emojiMatch ? emojiMatch[1] : '😊';
  
  return (
    <TouchableOpacity key={index} style={styles.chip}>
      <Text style={styles.chipEmoji}>{emoji}</Text>
      <Text style={styles.chipText}>{chip.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  chipText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 13,
    color: '#000000',
    flexShrink: 0,
  },
});

export default TinuChip;
