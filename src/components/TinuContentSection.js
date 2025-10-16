import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Platform} from 'react-native';
import TinuCard from './TinuCard';
import TinuChip from './TinuChip';
import {colors} from '../theme/colors';

const TinuContentSection = ({tinuData, isKeyboardVisible}) => {
  return (
    <ScrollView style={styles.scrollContent}>
      {/* Cards Section - Hidden when keyboard is visible */}
      {!isKeyboardVisible && tinuData?.cards && tinuData.cards.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={styles.cardsContainer}>
          {tinuData.cards.map((card, index) => (
            <TinuCard key={index} card={card} index={index} />
          ))}
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
                    .map((chip, rowIndex) => (
                      <TinuChip 
                        key={colIndex * 2 + rowIndex} 
                        chip={chip} 
                        index={colIndex * 2 + rowIndex} 
                      />
                    ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    paddingBottom: 20,
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
  sectionTitleText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: '#8B5CF6',
  },
  chipsScroll: {
    maxHeight: 108,
    marginBottom: 20,
    paddingLeft: 16,
  },
  chipsScrollKeyboardOpen: {
    marginBottom: Platform.OS === 'ios' ? 8 : 10,
    marginTop: Platform.OS === 'ios' ? 10 : undefined,
  },
  chipsWrapper: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  chipColumn: {
    flexDirection: 'column',
    marginRight: 8,
  },
});

export default TinuContentSection;
