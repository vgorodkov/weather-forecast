import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { spacing } from '@constants/layout';
import { FontVariant } from '@constants/font';

import { Text } from '@components/common/Text';
import { Button } from '@components/common/Button';
import { QRScanner } from '@components/QRScanner';
import { TrackedWeatherList, NoWeatherDummy } from '@components/all_weather_screen';

const ASK_PERMISSION_TEXT = 'We need your permission to show the camera';
const BTN_PERSMISSION_TEXT = 'Grant permission';
const BTN_ADD_WEATHER_TEXT = 'Add weather';

export const AllWeatherScreen = () => {
  const trackedWeather = useSelector((state: RootState) => state.weather.trackedWeather);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const isWeatherDummyShown = trackedWeather.length <= 0 && !isCameraOpen;

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionContainer}>
        <Text variant={FontVariant.body_sb} style={{ textAlign: 'center' }}>
          {ASK_PERMISSION_TEXT}
        </Text>
        <Button onPress={requestPermission} label={BTN_PERSMISSION_TEXT} />
      </View>
    );
  }

  if (isWeatherDummyShown) {
    return <NoWeatherDummy openCamera={openCamera} />;
  }

  if (isCameraOpen) {
    return <QRScanner closeCamera={closeCamera} />;
  }

  return (
    <View style={styles.allWeatherContainer}>
      <TrackedWeatherList />
      <Button label={BTN_ADD_WEATHER_TEXT} onPress={openCamera} />
    </View>
  );
};

const styles = StyleSheet.create({
  allWeatherContainer: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.dafault,
    flex: 1,
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    gap: spacing.dafault,
    padding: spacing.dafault,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
