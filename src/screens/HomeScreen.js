import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {colors} from '../theme/colors';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        <Text style={styles.title}>TinyPal</Text>
        <Text style={styles.subtitle}>Parenting Insights</Text>

        <TouchableOpacity
          style={[styles.button, styles.dykButton]}
          onPress={() => navigation.navigate('DidYouKnow')}>
          <Text style={styles.buttonText}>Did You Know</Text>
          <Text style={styles.buttonSubtext}>Learn parenting insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.flashButton]}
          onPress={() => navigation.navigate('FlashCard')}>
          <Text style={styles.buttonText}>Flash Cards</Text>
          <Text style={styles.buttonSubtext}>Quick parenting tips</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 48,
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 60,
  },
  button: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  dykButton: {
    backgroundColor: colors.pinkDark,
  },
  flashButton: {
    backgroundColor: colors.blueDark,
  },
  buttonText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 24,
    color: colors.white,
    marginBottom: 4,
  },
  buttonSubtext: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: colors.citationOpacity,
  },
});

export default HomeScreen;
