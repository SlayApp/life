import * as Haptics from 'expo-haptics';
import {useCallback, useMemo} from 'react';
import {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useUnistyles} from 'react-native-unistyles';

import {spring} from '~/motion/spring';
import {hexToHsl} from '~/utils/hexToHsl';
import {hexToRgba} from '~/utils/hexToRgba';
import {hslToHex} from '~/utils/hslToHex';

import {DEFAULT_ACTIVE_SCALE, IButtonProps} from './Button.types';

const springConfig = {response: 0.2, dampingFraction: 0.825};

export const useButton = (props: IButtonProps) => {
  const {onPress, disabled = false, activeScale = DEFAULT_ACTIVE_SCALE} = props;
  const {theme} = useUnistyles();
  const color = theme.colors.accent;
  const disabledTransition = useDerivedValue(
    () => spring(disabled ? 1 : 0, springConfig),
    [disabled],
  );
  const pressedTransition = useSharedValue(0);

  const activeColor = useMemo(() => {
    const hsl = hexToHsl(color);
    const hue = Math.max(hsl[0], 0);
    const saturation = Math.max(hsl[2] - 0.1, 0);
    const hex = hslToHex([hue, hsl[1], saturation]);

    return hex;
  }, [color]);

  const onPressHandler = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }, [onPress]);

  const onPressIn = useCallback(() => {
    pressedTransition.value = spring(1, springConfig);
  }, [pressedTransition]);

  const onPressOut = useCallback(() => {
    pressedTransition.value = spring(0, springConfig);
  }, [pressedTransition]);

  const animatedStyles = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        pressedTransition.value,
        [0, 1],
        [color, activeColor],
      ),
      opacity: interpolate(
        disabledTransition.value,
        [0, 1],
        [1, 0.2],
        Extrapolation.CLAMP,
      ),
      boxShadow: [
        {
          offsetX: 0,
          offsetY: 0,
          color: interpolateColor(
            disabledTransition.value,
            [0, 1],
            [
              hexToRgba(theme.colors.primary, 0.15),
              hexToRgba(theme.colors.primary, 0),
            ],
          ),
          blurRadius: 8,
        },
      ],
      transform: [
        {
          scale: interpolate(
            pressedTransition.value,
            [0, 1],
            [1, activeScale],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [color],
  );

  return {onPressIn, onPressOut, animatedStyles, onPressHandler, disabled};
};
