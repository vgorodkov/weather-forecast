import { useWindowDimensions } from 'react-native';
import React from 'react';
import { Canvas, Line, Path, Text as SKText, matchFont } from '@shopify/react-native-skia';
import { colors } from '@constants/colors';
import { spacing } from '@constants/layout';
import { parseDate } from 'utils/parseDate';
import { CustomWeatherData } from '@customTypes/weather';
import { makeGraph } from 'utils/makeGraph';

export const GraphCanvas = ({ weatherData }: { weatherData: CustomWeatherData }) => {
  const { width, height } = useWindowDimensions();
  const canvasHeight = height * 0.3;
  const dateTextY = canvasHeight - spacing.large;

  const graph = makeGraph(weatherData, width, canvasHeight);
  const dateFont = matchFont({ fontSize: 14 });

  return (
    <Canvas style={{ width: '100%', height: canvasHeight }}>
      <Path style={'stroke'} path={graph.curve} strokeWidth={3} color={colors.primary} />
      <Line p1={{ x: 0, y: 0 }} p2={{ x: width, y: 0 }} />
      <Line p1={{ x: 0, y: dateTextY / 2 }} p2={{ x: width, y: dateTextY / 2 }} />
      <Line p1={{ x: 0, y: dateTextY }} p2={{ x: width, y: dateTextY }} />
      {graph.dates.map((date, index) => (
        <SKText
          font={dateFont}
          key={index}
          x={index * ((width - spacing.default) / graph.timeFrames)}
          y={canvasHeight - spacing.small / 2}
          text={parseDate(date)}
        />
      ))}
    </Canvas>
  );
};
