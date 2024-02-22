import { StyleSheet, View } from 'react-native';
import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, Route } from '@customTypes/navigation';
import { FontVariant } from '@constants/font';
import { convertToCelsius } from 'utils/convertToCelsius';
import { spacing } from '@constants/layout';

import { Text } from '@components/common/Text';

import {
  AdditionalInfo,
  ForecastCard,
  GraphCanvas,
  Header,
} from '@components/detailed_weather_screen';
import { GradientWrapper } from '@components/GradientWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DetailedWeatherScreenProp = NativeStackScreenProps<MainStackParamList, Route.DetailedWeather>;

export const DetailedWeatherScreen = ({ route, navigation }: DetailedWeatherScreenProp) => {
  const { weatherData } = route.params;
  const currentWeatherData = weatherData.main[0];
  const forecast = weatherData.main.slice(1);
  const currentDate = new Date();

  const insets = useSafeAreaInsets();

  const onBackBtnPress = () => {
    navigation.goBack();
  };

  return (
    <GradientWrapper>
      <View style={[styles.container, { paddingTop: insets.top + spacing.default }]}>
        <Header cityName={weatherData.cityName} onBackBtnPress={onBackBtnPress} />
        <View style={styles.currentTemp}>
          <Text variant={FontVariant.sub_heading}>{convertToCelsius(currentWeatherData.temp)}</Text>
        </View>
        <AdditionalInfo
          humidity={currentWeatherData.humidity}
          clouds={currentWeatherData.clouds.all}
          wind={currentWeatherData.wind}
        />
        <GraphCanvas weatherData={weatherData} />
        <Text variant={FontVariant.label_medium}>Today: {currentDate.toDateString()}</Text>
        <View style={styles.forecastInfoContainer}>
          {forecast.map((data, index) => (
            <ForecastCard key={index} date={data.date} temp={data.temp} />
          ))}
        </View>
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing.default,
    paddingHorizontal: spacing.default,
    gap: spacing.medium,
  },

  forecastInfoContainer: {
    flexWrap: 'wrap',
    gap: spacing.default,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  currentTemp: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
