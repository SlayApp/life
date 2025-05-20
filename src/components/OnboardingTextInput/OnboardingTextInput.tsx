import {forwardRef, memo} from 'react';

import {IInput, Input} from '../Input';
import {TInputProps} from '../Input/Input';
import {WhiteOnWhiteShadow} from '../WhiteOnWhiteShadow/WhiteOnWhiteShadow';
import {styles} from './OnboardingTextInput.styles';

export const OnboardingTextInput = memo(
  forwardRef<IInput, TInputProps>((props, ref) => {
    return (
      <WhiteOnWhiteShadow style={styles.container}>
        <Input
          {...props}
          numberOfLines={1}
          ref={ref}
          style={[props.style, styles.input]}
        />
      </WhiteOnWhiteShadow>
    );
  }),
);
