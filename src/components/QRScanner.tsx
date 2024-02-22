import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { MainStackParamList, Route } from '@customTypes/navigation';
import { useNavigation } from '@react-navigation/native';
import { addWeatherToTrack } from '@redux/slices/weatherSlice';
import axios, { AxiosResponse } from 'axios';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomWeatherData, WeatherResponse } from '@customTypes/weather';

type AllWeatherScreenProp = NativeStackScreenProps<MainStackParamList, Route.AllWeather>;

export const QRScanner = ({ closeCamera }: { closeCamera: () => void }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AllWeatherScreenProp['navigation']>();
  const [isScanned, setIsScanned] = useState(false);

  const handleGetWeather = async (url: string) => {
    try {
      const response: AxiosResponse<WeatherResponse> = await axios.get(url);
      const weatherData: WeatherResponse = response.data;
      return weatherData;
    } catch (error) {
      console.error(error);
    }
  };

  const onBarCodeScanned = async (scanningResult: BarCodeScanningResult) => {
    if (isScanned) {
      return;
    }
    setIsScanned(true);
    const { data: url } = scanningResult;
    const weatherResData = await handleGetWeather(url);

    if (!weatherResData) {
      return;
    }

    const weatherData: CustomWeatherData = {
      cityName: weatherResData?.city.name,
      countryName: weatherResData?.city.country,
      lat: weatherResData?.city.coord.lat,
      lon: weatherResData?.city.coord.lon,
      main: weatherResData?.list.map((data) => {
        return {
          date: data.dt_txt,
          temp: data.main.temp,
          temp_feels: data.main.feels_like,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          clouds: data.clouds,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          description: data.weather,
        };
      }),
    };

    navigation.navigate(Route.DetailedWeather, { weatherData });
    dispatch(
      addWeatherToTrack({
        lat: weatherData.lat,
        lon: weatherData.lon,
        cityName: weatherData.cityName,
      }),
    );
    closeCamera();
  };

  return (
    <View style={styles.cameraContainer}>
      <StatusBar hidden />
      <Camera style={styles.camera} onBarCodeScanned={onBarCodeScanned}></Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});
