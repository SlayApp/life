import {SymbolView} from 'expo-symbols';
import {memo} from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {spring} from '~/motion/spring';

import {styles} from './ChatSendMessageButton.styles';

interface IProps {
  onPress: () => void;
  show: boolean;
}

export const ChatSendMessageButton = memo(({onPress, show}: IProps) => {
  const derivedStyle = useDerivedValue(() =>
    spring(show ? 1 : 0, {dampingFraction: 1, response: 0.185}),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: derivedStyle.value}],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable onPress={onPress} style={styles.container}>
        <SymbolView
          name="arrow.up"
          style={styles.icon}
          tintColor="white"
          weight="bold"
          type="monochrome"
        />
      </Pressable>
    </Animated.View>
  );
});
