import {useMemo} from 'react';
import {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useUnistyles} from 'react-native-unistyles';

import {hexToRgba} from '~/utils/hexToRgba';

export const useScrollBottomBorderTransition = (
  scrollOffset: SharedValue<number>,
) => {
  const {theme} = useUnistyles();
  const outputRange = useMemo(
    () => [
      hexToRgba(theme.colors.subdued96, 0),
      hexToRgba(theme.colors.subdued96, 1),
    ],
    [theme.colors.subdued96],
  );
  const transition = useDerivedValue(() => {
    if (scrollOffset.value > 5) {
      return withTiming(1);
    }

    return withTiming(0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomColor: interpolateColor(
        transition.value,
        [0, 1],
        outputRange,
      ),
    };
  }, [scrollOffset, outputRange]);

  return animatedStyle;
};
