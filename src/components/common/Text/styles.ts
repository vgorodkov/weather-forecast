import { FontFamily, FontVariant } from '@constants/font';
import { TextStyle } from 'react-native';

export const fontStyles: Record<FontVariant, TextStyle | TextStyle[]> = {
  [FontVariant.heading_1]: {
    fontFamily: FontFamily.RalewayBold,
    fontSize: 32,
    lineHeight: 40,
  },
  [FontVariant.sub_heading]: {
    fontFamily: FontFamily.RalewayBold,
    color: '#1B1639',
    fontSize: 24,
    lineHeight: 40,
  },
  [FontVariant.body]: {
    fontFamily: FontFamily.RalewayRegular,
    fontSize: 16,
  },
  [FontVariant.body_sb]: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: 16,
  },
  [FontVariant.label]: {
    fontFamily: FontFamily.RalewayBold,
    lineHeight: 16,
    fontSize: 16,
  },
  [FontVariant.label_medium]: {
    fontFamily: FontFamily.RalewayBold,
    fontSize: 14,
  },
};
