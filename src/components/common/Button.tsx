import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { FontVariant } from '@constants/font';
import { colors } from '@constants/colors';
import { Text } from './Text';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={{ color: 'white' }} variant={FontVariant.label}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    width: '100%',
  },
});
