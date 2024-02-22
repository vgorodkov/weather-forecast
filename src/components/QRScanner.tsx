import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { MainStackParamList, Route } from '@customTypes/navigation';
import { useNavigation } from '@react-navigation/native';
import { addWeatherToTrack } from '@redux/slices/weatherSlice';
import axios, { AxiosResponse } from 'axios';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WeatherResponse } from '@customTypes/weather';
import { mapWeatherData } from 'utils/mapWeatherData';

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

    const weatherData = mapWeatherData(weatherResData);

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
