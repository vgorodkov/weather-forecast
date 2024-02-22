export interface TrackedWeather {
  cityName: string;
  lat: number;
  lon: number;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface CustomWeatherData {
  cityName: string;
  countryName: string;
  lat: number;
  lon: number;
  main: {
    date: string;
    temp: number;
    temp_feels: number;
    temp_max: number;
    temp_min: number;
    clouds: { all: number };
    humidity: number;
    wind: number;
    description: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
}
