import {memo} from 'react';
import {Pressable} from 'react-native';
import Animated from 'react-native-reanimated';

import {Text} from '../Text';
import {useButton} from './Button.hook';
import {styles} from './Button.styles';
import {IButtonProps} from './Button.types';

export const Button: React.FC<IButtonProps> = memo(props => {
  const {onPressIn, onPressOut, animatedStyles, onPressHandler} =
    useButton(props);

  return (
    <Pressable
      disabled={props.disabled}
      onPress={onPressHandler}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={[animatedStyles, styles.buttonContainer]}>
        <Text variant="title" color="inverted">
          {props.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
});
