import {useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {spring} from '~/motion/spring';

import {ANIMATION_DELAY} from './TypingIndicatorDots.constants';

export const useTypingIndicatorDots = () => {
  const selected = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    selected.value = withTiming(1, {duration: 0}, () => {
      selected.value = withRepeat(
        withSequence(
          withDelay(ANIMATION_DELAY, withTiming(2, {duration: 0})),
          withDelay(ANIMATION_DELAY, withTiming(0, {duration: 0})),
          withDelay(ANIMATION_DELAY, withTiming(1, {duration: 0})),
        ),
        -1,
      );
    });
    scaleAnimation.value = withRepeat(
      withSequence(
        spring(1, {response: 1, dampingFraction: 0.9}),
        spring(1, {response: 1, dampingFraction: 0.9}),
      ),
      -1,
      false,
    );
  }, [scaleAnimation, selected]);

  const scaleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleAnimation.value,
        },
      ],
    };
  });

  return {scaleStyles, selected};
};
