import { Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Text } from '@components/common/Text';
import { FontVariant } from '@constants/font';
import { spacing } from '@constants/layout';

const CARD_SIZE = 204;
const CARD_IMG_SIZE = 144;

const ADD_WEATHER_TEXT = 'Press me to scan qr code';

export const AddWeatherCard = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable style={styles.addWeatherCard} onPress={onPress}>
      <Text style={{ textAlign: 'center' }} variant={FontVariant.body_sb}>
        {ADD_WEATHER_TEXT}
      </Text>
      <Image style={styles.addWeatherCardImg} source={require('@assets/imgs/qrcode.png')} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addWeatherCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: spacing.dafault,
    borderRadius: 24,
    maxWidth: CARD_SIZE,
  },
  addWeatherCardImg: {
    resizeMode: 'contain',
    height: CARD_IMG_SIZE,
    aspectRatio: 1,
  },
});
