import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {ANIMATION_DELAY} from '../../TypingIndicatorDots.constants';
import {ITypingIndicatorDotProps} from './TypingIndicatorDot.types';

export const useTypingIndicatorDot = ({
  index,
  selected,
}: Pick<ITypingIndicatorDotProps, 'index' | 'selected'>) => {
  const transition = useDerivedValue(() =>
    withTiming(selected.value === index ? 0.5 : 0.2, {
      duration: ANIMATION_DELAY,
    }),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: transition.value,
    };
  });

  return {animatedStyle};
};
