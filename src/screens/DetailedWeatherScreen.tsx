import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, Route } from '@customTypes/navigation';
import { Text } from '@components/common/Text';
import { FontVariant } from '@constants/font';
import { convertToCelsius } from 'utils/convertToCelsius';
import { spacing } from '@constants/layout';
import { colors } from '@constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

import { Label } from '@components/common/Label';

type DetailedWeatherScreenProp = NativeStackScreenProps<MainStackParamList, Route.DetailedWeather>;

const ForecastCard = ({ date, temp }: { date: string; temp: number }) => {
  return (
    <View style={styles.forecastCard}>
      <Text variant={FontVariant.sub_heading}>{convertToCelsius(temp)}</Text>
      <Text variant={FontVariant.body_sb}>{date.split(' ')[1].slice(0, 5)}</Text>
    </View>
  );
};

export const DetailedWeatherScreen = ({ route }: DetailedWeatherScreenProp) => {
  const { weatherData } = route.params;
  const currentWeatherData = weatherData.main[0];
  const forecast = weatherData.main.slice(1);

  return (
    <LinearGradient colors={['#FFFFFF', '#9A94D4']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.mainInfoContainer}>
          <Text variant={FontVariant.heading_1}>{weatherData.cityName}</Text>
          <Text variant={FontVariant.heading_1}>{convertToCelsius(currentWeatherData.temp)}</Text>
        </View>
        <View style={styles.additionalInfoContainer}>
          <Label
            text={`${currentWeatherData?.humidity} %`}
            icon={require('@assets/icons/humidity.png')}
            backgroundColor="#658ED950"
          />
          <Label
            text={`${currentWeatherData?.wind} km/h`}
            icon={require('@assets/icons/wind.png')}
            backgroundColor="#5E4FC150"
          />
          <Label
            text={`${currentWeatherData?.clouds.all} %`}
            icon={require('@assets/icons/cloud.png')}
            backgroundColor="#D8619150"
          />
        </View>
        <View style={styles.forecastInfoContainer}>
          {forecast.map((data, index) => (
            <ForecastCard key={index} date={data.date} temp={data.temp} />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.dafault,
    justifyContent: 'center',
    gap: spacing.large,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  forecastInfoContainer: {
    flexWrap: 'wrap',
    gap: spacing.dafault,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forecastCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.dafault,
  },
});
