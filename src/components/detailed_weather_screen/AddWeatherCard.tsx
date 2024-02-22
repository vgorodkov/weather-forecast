import { Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Text } from '@components/common/Text';
import { FontVariant } from '@constants/font';
import { spacing } from '@constants/layout';

const AddWeatherCard = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable style={styles.addWeatherCard} onPress={onPress}>
      <Text style={{ textAlign: 'center' }} variant={FontVariant.body_sb}>
        Press me to scan qr code
      </Text>
      <Image style={styles.addWeatherCardImg} source={require('@assets/imgs/qrcode.png')} />
    </Pressable>
  );
};

export default AddWeatherCard;

const styles = StyleSheet.create({
  addWeatherCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: spacing.dafault,
    borderRadius: 24,
    maxWidth: 204,
  },
  addWeatherCardImg: {
    resizeMode: 'contain',
    height: 144,
    aspectRatio: 1,
  },
});
