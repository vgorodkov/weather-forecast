import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { colors } from '@constants/colors';
import { FontVariant } from '@constants/font';
import { Text } from '@components/common/Text';
import { spacing } from '@constants/layout';

const APP_LOGO_HEIGHT = 300;

export const AppLogo = () => {
  return (
    <View style={styles.appLogoContainer}>
      <Image style={styles.appLogo} source={require('@assets/imgs/logo.png')} />
      <View style={styles.appNameContainer}>
        <Text variant={FontVariant.heading_1} style={{ color: colors.white }}>
          Weather
        </Text>
        <Text variant={FontVariant.heading_1} style={{ color: colors.primary }}>
          Forecast
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appLogoContainer: {
    alignItems: 'center',
  },
  appLogo: {
    width: '100%',
    height: APP_LOGO_HEIGHT,
    resizeMode: 'contain',
  },
  appNameContainer: {
    paddingTop: spacing.dafault,
  },
});
