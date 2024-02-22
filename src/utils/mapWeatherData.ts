import { CustomWeatherData, WeatherResponse } from '@customTypes/weather';

export const mapWeatherData = (data: WeatherResponse): CustomWeatherData => {
  return {
    cityName: data.city.name,
    countryName: data.city.country,
    lat: data.city.coord.lat,
    lon: data.city.coord.lon,
    main: data.list.map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      temp_feels: item.main.feels_like,
      temp_max: item.main.temp_max,
      temp_min: item.main.temp_min,
      clouds: item.clouds,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      description: item.weather,
    })),
  };
};
