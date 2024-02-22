import 'react-native-gesture-handler';

import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { FontFamily } from '@constants/font';
import { MainStackNav } from '@navigation/MainStackNav';
import { GradientWrapper } from '@components/GradientWrapper';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    [FontFamily.RalewayBlack]: require('@assets/fonts/Raleway-Black.ttf'),
    [FontFamily.RalewayBold]: require('@assets/fonts/Raleway-Bold.ttf'),
    [FontFamily.RalewaySemiBold]: require('@assets/fonts/Raleway-SemiBold.ttf'),
    [FontFamily.RalewayMedium]: require('@assets/fonts/Raleway-Medium.ttf'),
    [FontFamily.RalewayRegular]: require('@assets/fonts/Raleway-Regular.ttf'),
    [FontFamily.RalewayThin]: require('@assets/fonts/Raleway-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={customTheme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GradientWrapper>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
              <StatusBar style="auto" />
              <MainStackNav />
            </SafeAreaView>
          </GradientWrapper>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
