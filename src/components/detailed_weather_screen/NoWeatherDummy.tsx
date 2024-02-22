import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@components/common/Text';
import AddWeatherCard from '@components/detailed_weather_screen/AddWeatherCard';
import { FontVariant } from '@constants/font';
import { spacing } from '@constants/layout';

export const NoWeatherDummy = ({ openCamera }: { openCamera: () => void }) => {
  return (
    <View style={styles.noWeatherDummyContainer}>
      <Text style={styles.noWeatherDummyText} variant={FontVariant.sub_heading}>
        There are no locations to track.
      </Text>
      <AddWeatherCard onPress={openCamera} />
    </View>
  );
};

const styles = StyleSheet.create({
  noWeatherDummyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.dafault,
    paddingHorizontal: spacing.dafault,
  },
  noWeatherDummyText: {
    color: '#1B1639',
    textAlign: 'center',
  },
});
