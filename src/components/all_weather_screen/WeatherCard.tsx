import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import { Text } from '@components/common/Text';
import { useGetWeatherByLatLonQuery } from '@redux/api/weatherApi';
import { TrackedWeather } from '@customTypes/weather';
import { FontVariant } from '@constants/font';
import { convertToCelsius } from 'utils/convertToCelsius';

import { spacing } from '@constants/layout';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList, Route } from '@customTypes/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Label } from '@components/common/Label';
import { mapWeatherData } from 'utils/mapWeatherData';
import { colors } from '@constants/colors';

interface WeatherCardProps {
  item: TrackedWeather;
}

type AllWeatherScreenProp = NativeStackScreenProps<MainStackParamList, Route.AllWeather>;

const WeatherCardSkeleton = () => {
  return (
    <View
      style={{
        height: 120,
        width: '100%',
        backgroundColor: colors.light_blue,
        borderRadius: 8,
      }}
    />
  );
};

export const WeatherCard = ({ item }: WeatherCardProps) => {
  const { data, isLoading } = useGetWeatherByLatLonQuery({ lat: item.lat, lon: item.lon });
  const navigation = useNavigation<AllWeatherScreenProp['navigation']>();

  if (isLoading) {
    return <WeatherCardSkeleton />;
  }

  if (!data) {
    return;
  }

  const weatherData = mapWeatherData(data);
  const currentWeather = weatherData.main[0];
  const onWeatherCard = () => {
    navigation.navigate(Route.DetailedWeather, {
      weatherData,
    });
  };

  return (
    <View>
      <Pressable onPress={onWeatherCard} style={styles.card}>
        <View style={styles.mainInfoContainer}>
          <Text variant={FontVariant.sub_heading}>{data.city.name}</Text>
          <Text variant={FontVariant.sub_heading}>{convertToCelsius(currentWeather.temp)}</Text>
        </View>
        <View style={styles.weatherDescriptionContainer}>
          {currentWeather.description.map((desc, index) => (
            <Label
              text={desc.description}
              key={index}
              backgroundColor={colors.pink}
              textColor="white"
            />
          ))}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light_blue,
    padding: spacing.default,
    borderRadius: 8,
    gap: spacing.small,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
