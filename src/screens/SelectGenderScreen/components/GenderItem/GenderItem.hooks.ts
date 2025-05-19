import {useCallback} from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useUnistyles} from 'react-native-unistyles';

import {inOutQuad} from '~/motion/timingFunctions';

import {IGenderItemProps} from './GenderItem.types';

const timingConfig = {
  duration: 100,
  easing: inOutQuad,
};

export const useGenderItem = ({selected, onPress, index}: IGenderItemProps) => {
  const {theme} = useUnistyles();
  const transition = useDerivedValue(
    () => withTiming(selected ? 1 : 0, timingConfig),
    [selected],
  );

  const onPressHandler = useCallback(() => {
    onPress(index);
  }, [onPress, index]);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      transition.value,
      [0, 1],
      [theme.colors.subdued95, theme.colors.primary],
    ),
  }));

  const animatedCheckmarkStyle = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  return {
    theme,
    onPressHandler,
    animatedBorderStyle,
    animatedCheckmarkStyle,
  };
};
