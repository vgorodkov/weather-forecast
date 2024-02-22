import { StyleSheet, View } from 'react-native';
import React from 'react';

import { FontVariant } from '@constants/font';
import { spacing } from '@constants/layout';
import { Text } from '@components/common/Text';
import { AddWeatherCard } from '@components/all_weather_screen/AddWeatherCard';

const DUMMY_TEXT = 'There are no locations to track.';

export const NoWeatherDummy = ({ openCamera }: { openCamera: () => void }) => {
  return (
    <View style={styles.noWeatherDummyContainer}>
      <Text style={styles.noWeatherDummyText} variant={FontVariant.sub_heading}>
        {DUMMY_TEXT}
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
    gap: spacing.default,
    paddingHorizontal: spacing.default,
  },
  noWeatherDummyText: {
    textAlign: 'center',
  },
});
