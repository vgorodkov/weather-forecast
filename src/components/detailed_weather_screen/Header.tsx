import { Pressable, StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { FontVariant } from '@constants/font';
import { Text } from '@components/common/Text';

const BACK_BTN_ICON_SIZE = 32;

interface HeaderProps {
  cityName: string;
  onBackBtnPress: () => void;
}

export const Header = ({ cityName, onBackBtnPress }: HeaderProps) => {
  return (
    <View style={styles.detailedWeatherHeader}>
      <Pressable onPress={onBackBtnPress}>
        <Image style={styles.backBtnIcon} source={require('@assets/icons/arrow-left.png')} />
      </Pressable>
      <Text variant={FontVariant.heading_1}>{cityName}</Text>
      <View style={{ width: BACK_BTN_ICON_SIZE, aspectRatio: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  backBtnIcon: {
    width: BACK_BTN_ICON_SIZE,
    height: BACK_BTN_ICON_SIZE,
  },
  detailedWeatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
