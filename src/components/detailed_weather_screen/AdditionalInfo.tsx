import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Label } from '@components/common/Label';
import { colors } from '@constants/colors';

interface AdditionalInfoProps {
  humidity: number;
  wind: number;
  clouds: number;
}

export const AdditionalInfo = ({ humidity, wind, clouds }: AdditionalInfoProps) => {
  return (
    <View style={styles.additionalInfoContainer}>
      <Label
        text={`${humidity} %`}
        icon={require('@assets/icons/humidity.png')}
        backgroundColor={colors.light_blue}
      />
      <Label
        text={`${wind} km/h`}
        icon={require('@assets/icons/wind.png')}
        backgroundColor={colors.blue}
      />
      <Label
        text={`${clouds} %`}
        icon={require('@assets/icons/cloud.png')}
        backgroundColor={colors.light_pink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  additionalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
