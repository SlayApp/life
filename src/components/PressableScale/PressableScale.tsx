import * as Haptics from 'expo-haptics';
import {ComponentPropsWithoutRef, ReactNode, useCallback} from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {spring} from '~/motion/spring';

const springConfig = {response: 0.2, dampingFraction: 0.825};

interface Props extends ComponentPropsWithoutRef<typeof Pressable> {
  activeScale?: number;
  children: ReactNode;
  onPress?: () => void;
  haptics?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export function PressableScale({
  children,
  onPressIn,
  onPressOut,
  onPress,
  activeScale = 0.94,
  haptics = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1);

  const onPressHandler = useCallback(() => {
    if (haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  }, [haptics, onPress]);

  const onPressInHandler = useCallback(() => {
    scale.value = spring(activeScale, springConfig);
    onPressIn?.();
  }, [activeScale, onPressIn, scale]);

  const onPressOutHandler = useCallback(() => {
    scale.value = spring(1, springConfig);
    onPressOut?.();
  }, [scale, onPressOut]);

  const styles = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: scale.value,
        },
      ],
    }),
    [],
  );

  return (
    <Pressable
      {...rest}
      onPress={onPressHandler}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}>
      <Animated.View style={styles}>{children}</Animated.View>
    </Pressable>
  );
}
