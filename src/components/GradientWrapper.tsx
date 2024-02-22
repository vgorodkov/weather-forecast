import { StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@constants/colors';

export const GradientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={[colors.backgroundGradient.start, colors.backgroundGradient.end]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
