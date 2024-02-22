import { MainStackParamList, Route } from '@customTypes/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllWeatherScreen } from '@screens/AllWeatherScreen';
import { DetailedWeatherScreen } from '@screens/DetailedWeatherScreen';
import { StartScreen } from '@screens/StartScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.Start} component={StartScreen} />
      <Stack.Screen name={Route.AllWeather} component={AllWeatherScreen} />
      <Stack.Screen name={Route.DetailedWeather} component={DetailedWeatherScreen} />
    </Stack.Navigator>
  );
}
