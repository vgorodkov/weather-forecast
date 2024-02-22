import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { spacing } from '@constants/layout';
import { FontVariant } from '@constants/font';
import { GradientWrapper } from '@components/GradientWrapper';
import { Text } from '@components/common/Text';
import { TrackedWeatherList } from '@components/all_weather_screen/TrackedWeatherList';
import { Button } from '@components/common/Button';
import { NoWeatherDummy } from '@components/detailed_weather_screen/NoWeatherDummy';
import { QRScanner } from '@components/QRScanner';

const ASK_PERMISSION_TEXT = 'We need your permission to show the camera';

export const AllWeatherScreen = () => {
  const trackedWeather = useSelector((state: RootState) => state.weather.trackedWeather);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const isWeatherDummyShown = trackedWeather.length <= 0 && !isCameraOpen;
  const iwWeatherListShow = !isCameraOpen && !isWeatherDummyShown;

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
        <Button onPress={requestPermission} label="grant permission" />
      </View>
    );
  }

  return (
    <GradientWrapper>
      {isWeatherDummyShown && <NoWeatherDummy openCamera={openCamera} />}
      {isCameraOpen && <QRScanner closeCamera={closeCamera} />}
      {iwWeatherListShow && (
        <View style={styles.allWeatherContainer}>
          <TrackedWeatherList />
          <Button label="Add Weather" onPress={openCamera} />
        </View>
      )}
    </GradientWrapper>
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
