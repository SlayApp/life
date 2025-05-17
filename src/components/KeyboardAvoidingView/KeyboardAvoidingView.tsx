import {memo} from 'react';
import {ViewProps} from 'react-native';
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

type TProps = ViewProps & {
  keyboardVerticalOffset?: number;
};

export const KeyboardAvoidingView: React.FC<TProps> = memo(
  ({children, keyboardVerticalOffset = 0, style, ...props}) => {
    const {height, progress} = useReanimatedKeyboardAnimation();

    const translateY = useAnimatedStyle(() => {
      const offset = interpolate(
        progress.value,
        [0, 1],
        [0, keyboardVerticalOffset],
      );

      return {
        transform: [{translateY: height.value - offset}],
      };
    }, [height, keyboardVerticalOffset]);

    return (
      <Animated.View {...props} style={[style, translateY]}>
        {children}
      </Animated.View>
    );
  },
);
