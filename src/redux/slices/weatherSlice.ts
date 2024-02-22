import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TrackedWeather } from '@customTypes/weather';

export interface WeatherState {
  trackedWeather: TrackedWeather[];
}

const initialState: WeatherState = {
  trackedWeather: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeatherToTrack: (state, action: PayloadAction<TrackedWeather>) => {
      const index = state.trackedWeather.findIndex(
        (tracked) => tracked.cityName === action.payload.cityName,
      );
      const isIncluded = index >= 0;
      if (!isIncluded) {
        state.trackedWeather.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWeatherToTrack } = weatherSlice.actions;

export default weatherSlice.reducer;
