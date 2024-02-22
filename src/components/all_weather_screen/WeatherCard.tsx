import { Pressable, StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '../common/Text';
import { useGetWeatherByLatLonQuery } from '@redux/api/weatherApi';
import { CustomWeatherData, TrackedWeather } from '@customTypes/weather';
import { FontVariant } from '@constants/font';
import { convertToCelsius } from 'utils/convertToCelsius';

import { spacing } from '@constants/layout';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList, Route } from '@customTypes/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Label } from '@components/common/Label';

interface WeatherCardProps {
  item: TrackedWeather;
}

type AllWeatherScreenProp = NativeStackScreenProps<MainStackParamList, Route.AllWeather>;

export const WeatherCard = ({ item }: WeatherCardProps) => {
  const { data, isLoading } = useGetWeatherByLatLonQuery({ lat: item.lat, lon: item.lon });
  const navigation = useNavigation<AllWeatherScreenProp['navigation']>();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  const weatherData: CustomWeatherData = {
    cityName: data?.city.name,
    countryName: data?.city.country,
    lat: data?.city.coord.lat,
    lon: data?.city.coord.lon,
    main: data?.list.map((item) => {
      return {
        date: item.dt_txt,
        temp: item.main.temp,
        temp_feels: item.main.feels_like,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        clouds: item.clouds,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        description: item.weather,
      };
    }),
  };
  const currentWeather = weatherData.main[0];
  const onWeatherCard = () => {
    navigation.navigate(Route.DetailedWeather, {
      weatherData,
    });
  };

  return (
    <Animated.View>
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
              backgroundColor={'#D86191'}
              textColor="white"
            />
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#658ED930',

    padding: spacing.dafault,
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
