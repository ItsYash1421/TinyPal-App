import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors} from '../theme/colors';

const TinuCard = ({card, index}) => {
  return (
    <View key={index} style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.scriptBadge}>
          <Image
            source={require('../assets/images/sciption.png')}
            style={styles.scriptIcon}
            resizeMode="contain"
          />
          <Text style={styles.scriptText}>SCRIPT</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <Image
              source={require('../assets/images/shareicon.png')}
              style={styles.actionIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Image
              source={require('../assets/images/saveicon.png')}
              style={styles.actionIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardContent}>{card.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    minHeight: 144.57,
    backgroundColor: 'rgba(240, 207, 210, 0.5)',
    borderRadius: 21.42,
    borderWidth: 0.45,
    borderColor: '#CDB3C4',
    padding: 12,
    marginRight: 10.71,
    gap: 10.71,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scriptBadge: {
    width: 70,
    height: 24,
    backgroundColor: '#CCACC099',
    borderRadius: 121.74,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  scriptIcon: {
    width: 12,
    height: 12,
  },
  scriptText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconImage: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16.07,
    lineHeight: 21.42,
    letterSpacing: 0,
    color: colors.textDark,
    marginBottom: 4,
  },
  cardContent: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14.28,
    lineHeight: 21.42,
    letterSpacing: 0,
    color: colors.textDark,
  },
});

export default TinuCard;
