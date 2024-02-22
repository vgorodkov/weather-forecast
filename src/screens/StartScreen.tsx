import { StyleSheet, View } from 'react-native';
import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@constants/layout';
import { MainStackParamList, Route } from '@customTypes/navigation';

import { Button } from '@components/common/Button';
import { AppLogo } from '@components/start_screen/AppLogo';
import { GradientWrapper } from '@components/GradientWrapper';

type Props = NativeStackScreenProps<MainStackParamList, Route.Start>;

const START_BUTTON_TEXT = 'Get Start';

export const StartScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  const onGetStartBtnPress = () => {
    navigation.navigate(Route.AllWeather);
  };

  return (
    <GradientWrapper>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom + spacing.medium },
        ]}
      >
        <AppLogo />
        <Button label={START_BUTTON_TEXT} onPress={onGetStartBtnPress} />
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.default,
    justifyContent: 'space-between',
  },
});
