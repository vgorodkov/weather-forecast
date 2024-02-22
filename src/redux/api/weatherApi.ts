import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByLatLon: builder.query({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&cnt=7&appid=99090fe6a8880314c12f83b028044c44`,
    }),
  }),
});

export const { useGetWeatherByLatLonQuery } = weatherApi;
