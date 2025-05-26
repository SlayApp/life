import {forwardRef, memo} from 'react';
import {useUnistyles} from 'react-native-unistyles';

import {IInput, Input} from '../Input';
import {TInputProps} from '../Input/Input';
import {WhiteOnWhiteShadow} from '../WhiteOnWhiteShadow/WhiteOnWhiteShadow';
import {styles} from './OnboardingTextInput.styles';

export const OnboardingTextInput = memo(
  forwardRef<IInput, TInputProps>((props, ref) => {
    const {theme} = useUnistyles();

    return (
      <WhiteOnWhiteShadow style={styles.container}>
        <Input
          {...props}
          numberOfLines={1}
          ref={ref}
          style={[props.style, styles.input]}
          placeholderTextColor={theme.colors.subdued80}
        />
      </WhiteOnWhiteShadow>
    );
  }),
);
