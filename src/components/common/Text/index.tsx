import { Text as RNText, TextStyle } from 'react-native';
import React from 'react';
import { FontVariant } from '@constants/font';
import { fontStyles } from '@components/common/Text/styles';

interface TextProps {
  children: React.ReactNode;
  variant?: FontVariant;
  style?: TextStyle | TextStyle[];
}

export const Text: React.FC<TextProps> = ({ children, variant, style }) => {
  const txtStyle = [fontStyles[variant ?? 'body'], ...(Array.isArray(style) ? style : [style])];

  return <RNText style={txtStyle}>{children}</RNText>;
};
