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
  const derivedValue = useDerivedValue(() =>
    withTiming(focused ? 1 : 0, timingConfig),
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        derivedValue.value,
        [0, 1],
        [theme.colors.subdued95, theme.colors.subdued98],
      ),
      boxShadow: [
        {
          offsetX: 0,
          offsetY: 8,
          blurRadius: 48,
          color: interpolateColor(
            derivedValue.value,
            [0, 1],
            ['rgba(238,238,238,0)', 'rgba(238,238,238,1)'],
          ),
        },
        {
          offsetX: 0,
          offsetY: 4,
          blurRadius: 8,
          color: interpolateColor(
            derivedValue.value,
            [0, 1],
            ['rgba(66,71,76,0)', 'rgba(66,71,76,0.06)'],
          ),
        },
        {
          offsetX: 0,
          offsetY: 0,
          blurRadius: 1.5,
          color: interpolateColor(
            derivedValue.value,
            [0, 1],
            ['rgba(66,71,76,0)', 'rgba(66,71,76,0.32)'],
          ),
        },
        {
          offsetX: 0,
          offsetY: 2,
          blurRadius: 1,
          inset: true,
          color: interpolateColor(
            derivedValue.value,
            [0, 1],
            ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
          ),
        },
      ],
    };
  });

  return {
    animatedStyles,
  };
};
