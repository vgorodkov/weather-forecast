import { colors } from '@constants/colors';
import { FontFamily, FontVariant } from '@constants/font';
import { TextStyle } from 'react-native';

export const fontStyles: Record<FontVariant, TextStyle | TextStyle[]> = {
  [FontVariant.heading_1]: {
    fontFamily: FontFamily.RalewayBold,
    color: colors.primary_text,
    fontSize: 32,
    lineHeight: 40,
  },
  [FontVariant.sub_heading]: {
    fontFamily: FontFamily.RalewayBold,
    color: colors.primary_text,
    fontSize: 24,
    lineHeight: 40,
  },
  [FontVariant.body]: {
    fontFamily: FontFamily.RalewayRegular,
    color: colors.primary_text,
    fontSize: 16,
  },
  [FontVariant.body_sb]: {
    fontFamily: FontFamily.RalewaySemiBold,
    color: colors.primary_text,
    fontSize: 16,
  },
  [FontVariant.label]: {
    fontFamily: FontFamily.RalewayBold,
    color: colors.primary_text,
    lineHeight: 16,
    fontSize: 16,
  },
  [FontVariant.label_medium]: {
    fontFamily: FontFamily.RalewayBold,
    color: colors.primary_text,
    fontSize: 14,
  },
};
