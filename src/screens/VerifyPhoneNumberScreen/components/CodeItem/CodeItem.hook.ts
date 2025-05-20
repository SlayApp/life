import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {inOutQuad} from '~/motion/timingFunctions';
import {theme} from '~/theme/theme';

const timingConfig = {
  duration: 200,
  easing: inOutQuad,
};

export const useCodeItem = (focused: boolean) => {
  const transition = useDerivedValue(() =>
    withTiming(focused ? 1 : 0, timingConfig),
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        transition.value,
        [0, 1],
        [theme.colors.subdued95, theme.colors.subdued98],
      ),
      boxShadow: [
        {
          ...theme.shadows.whiteOnWhite[0],
          color: interpolateColor(
            transition.value,
            [0, 1],
            ['rgba(238,238,238,0)', theme.shadows.whiteOnWhite[0].color],
          ),
        },
        {
          ...theme.shadows.whiteOnWhite[1],
          color: interpolateColor(
            transition.value,
            [0, 1],
            ['rgba(66,71,76,0)', theme.shadows.whiteOnWhite[1].color],
          ),
        },
        {
          ...theme.shadows.whiteOnWhite[2],
          color: interpolateColor(
            transition.value,
            [0, 1],
            ['rgba(66,71,76,0)', theme.shadows.whiteOnWhite[2].color],
          ),
        },
        {
          ...theme.shadows.whiteOnWhite[3],
          color: interpolateColor(
            transition.value,
            [0, 1],
            ['rgba(255,255,255,0)', theme.shadows.whiteOnWhite[3].color],
          ),
        },
      ],
    };
  });

  return {
    animatedStyles,
  };
};
