import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Text } from '@components/common/Text';
import { spacing } from '@constants/layout';
import { FontVariant } from '@constants/font';

interface LabelProps {
  text: string;
  backgroundColor: string;
  textColor?: string;
  icon?: number;
}

const ICON_SIZE = 24;

export const Label = ({
  text,
  backgroundColor = 'black',
  textColor = 'white',
  icon,
}: LabelProps) => {
  return (
    <View style={[styles.label, { backgroundColor }]}>
      {icon && <Image source={icon} style={styles.labelIcon} />}
      <Text style={{ color: textColor }} variant={FontVariant.label}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.small,
    padding: spacing.small,
    borderRadius: 24,
  },
  labelIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
