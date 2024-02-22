import { Skia } from '@shopify/react-native-skia';
import { curveBumpX, line, scaleLinear, scaleTime } from 'd3';
import { CustomWeatherData } from '@customTypes/weather';
import { spacing } from '@constants/layout';

interface DataPoint {
  date: string;
  temp: number;
}

export const makeGraph = (data: CustomWeatherData, width: number, height: number) => {
  const dataPoints: DataPoint[] = data.main.map((data) => {
    return {
      date: data.date,
      temp: +(data.temp - 273.15).toFixed(1),
    };
  });

  const dates = dataPoints.map((dataPoint) => dataPoint.date);

  const maxTemp = Math.max(...dataPoints.map((dataPoint) => dataPoint.temp));
  const minTemp = Math.min(...dataPoints.map((dataPoint) => dataPoint.temp));
  const maxDate = dates[dates.length - 1];
  const minDate = dates[0];

  const y = scaleLinear()
    .domain([minTemp, maxTemp])
    .range([height - spacing.large, spacing.small / 4]);

  const x = scaleTime()
    .domain([new Date(minDate), new Date(maxDate)])
    .range([0, width - spacing.large]);

  const curvedLine = line<DataPoint>()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.temp))
    .curve(curveBumpX)(dataPoints);

  const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

  return {
    curve: skPath!,
    timeFrames: dataPoints.length,
    dates,
  };
};
