import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@components/common/Text';
import { FontVariant } from '@constants/font';
import { convertToCelsius } from 'utils/convertToCelsius';
import { colors } from '@constants/colors';
import { spacing } from '@constants/layout';
import { parseDate } from 'utils/parseDate';

export const ForecastCard = ({ date, temp }: { date: string; temp: number }) => {
  return (
    <View style={styles.forecastCard}>
      <Text variant={FontVariant.sub_heading}>{convertToCelsius(temp)}</Text>
      <Text style={{ color: colors.light_gray }} variant={FontVariant.body_sb}>
        {parseDate(date)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  forecastCard: {
    backgroundColor: '#FFFFFF95',
    flexGrow: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.default,
    paddingVertical: spacing.small,
  },
});
