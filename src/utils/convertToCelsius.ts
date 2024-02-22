export const convertToCelsius = (kalvins: number) => {
  return `${(kalvins - 273.15).toFixed(1)}°C`;
};
