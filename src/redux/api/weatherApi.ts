import { API_KEY } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByLatLon: builder.query({
      query: ({ lat, lon }) => `forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}`,
    }),
  }),
});

export const { useGetWeatherByLatLonQuery } = weatherApi;
