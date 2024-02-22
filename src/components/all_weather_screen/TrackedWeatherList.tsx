import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { WeatherCard } from './WeatherCard';

import { TrackedWeather } from '@customTypes/weather';
import { spacing } from '@constants/layout';

export const TrackedWeatherList = () => {
  const trackedWeather = useSelector((state: RootState) => state.weather.trackedWeather);

  const renderItem = ({ item, index }: { item: TrackedWeather; index: number }) => {
    return <WeatherCard key={index} item={item} />;
  };

  return (
    <FlatList
      data={trackedWeather}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    gap: spacing.default,
  },
});
