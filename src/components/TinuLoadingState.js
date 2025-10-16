import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';

export const LoadingState = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export const ErrorState = ({error, onRetry}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Quicksand-Regular',
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryButtonText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
    color: colors.white,
  },
});
