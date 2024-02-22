import { StyleSheet, View } from 'react-native';
import React from 'react';

import { spacing } from '@constants/layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, Route } from '@customTypes/navigation';

import { Button } from '@components/common/Button';
import { AppLogo } from '@components/start_screen/AppLogo';
import { GradientWrapper } from '@components/GradientWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<MainStackParamList, Route.Start>;

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
        <Button label="Get Start" onPress={onGetStartBtnPress} />
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.dafault,

    justifyContent: 'space-between',
  },
});
