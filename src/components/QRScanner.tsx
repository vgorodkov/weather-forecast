import { Alert, StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { MainStackParamList, Route } from "@customTypes/navigation";
import { useNavigation } from "@react-navigation/native";
import { addWeatherToTrack } from "@redux/slices/weatherSlice";
import axios, { AxiosResponse } from "axios";
import { BarCodeScanningResult, Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WeatherResponse } from "@customTypes/weather";
import { mapWeatherData } from "utils/mapWeatherData";

type AllWeatherScreenProp = NativeStackScreenProps<
  MainStackParamList,
  Route.AllWeather
>;

const INVALID_QR_ALERT_TITLE = "Invalid QR-Code";
const INVALID_QR_ALERT_MESSAGE = "Please scan right QR-Code";
const CLOSE_BTN_TEXT = "Close";
const TRY_AGAIN_BTN_TXT = "Try again";

export const QRScanner = ({ closeCamera }: { closeCamera: () => void }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AllWeatherScreenProp["navigation"]>();
  const [isScanned, setIsScanned] = useState(false);

  const handleGetWeather = async (url: string) => {
    try {
      const response: AxiosResponse<WeatherResponse> = await axios.get(url);
      const weatherData: WeatherResponse = response.data;
      return weatherData;
    } catch (error) {
      Alert.alert(INVALID_QR_ALERT_TITLE, INVALID_QR_ALERT_MESSAGE, [
        {
          text: CLOSE_BTN_TEXT,
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        {
          text: TRY_AGAIN_BTN_TXT,
          onPress: () => setIsScanned(false),
          style: "default",
        },
      ]);
    }
  };

  const onBarCodeScanned = async (scanningResult: BarCodeScanningResult) => {
    if (isScanned) {
      return;
    }
    const { data: url } = scanningResult;
    const weatherResData = await handleGetWeather(url);
    setIsScanned(true);

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
      })
    );
    closeCamera();
  };

  return (
    <View style={styles.cameraContainer}>
      <StatusBar hidden />
      <Camera
        style={styles.camera}
        onBarCodeScanned={onBarCodeScanned}
      ></Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
