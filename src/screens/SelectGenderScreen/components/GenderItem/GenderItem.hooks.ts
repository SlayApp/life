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

export const useGenderItem = ({selected, onPress, id}: IGenderItemProps) => {
  const {theme} = useUnistyles();
  const transition = useDerivedValue(
    () => withTiming(selected ? 1 : 0, timingConfig),
    [selected],
  );

  const onPressHandler = useCallback(() => {
    onPress(id);
  }, [onPress, id]);

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        transition.value,
        [0, 1],
        [theme.colors.subdued96, theme.colors.subdued98],
      ),
      boxShadow: [
        {
          offsetX: 0,
          offsetY: 8,
          blurRadius: 48,
          color: interpolateColor(
            transition.value,
            [0, 1],
            ['rgba(238,238,238,0)', 'rgba(238,238,238,1)'],
          ),
        },
        {
          offsetX: 0,
          offsetY: 4,
          blurRadius: 8,
          color: interpolateColor(
            transition.value,
            [0, 1],
            ['rgba(66,71,76,0)', 'rgba(66,71,76,0.06)'],
          ),
        },
        {
          offsetX: 0,
          offsetY: 0,
          blurRadius: 1.5,
          color: interpolateColor(
            transition.value,
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
            transition.value,
            [0, 1],
            ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
          ),
        },
      ],
    };
  });

  const animatedCheckmarkStyle = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  return {
    theme,
    onPressHandler,
    animatedContainerStyles,
    animatedCheckmarkStyle,
  };
};
