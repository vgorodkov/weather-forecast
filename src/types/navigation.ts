import { CustomWeatherData, WeatherData } from './weather';

export enum Route {
  Start = 'Start',
  AllWeather = 'AllWeather',
  DetailedWeather = 'DetailedWeather',
}

export type MainStackParamList = {
  [Route.Start]: undefined;
  [Route.AllWeather]: undefined;
  [Route.DetailedWeather]: { weatherData: CustomWeatherData };
};
