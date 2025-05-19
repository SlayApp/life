import {forwardRef} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';

import {styles} from './OnboardingTextInput.styles';

export const OnboardingTextInput = forwardRef<TextInput, TextInputProps>(
  (props, ref) => {
    return (
      <View style={styles.container}>
        <TextInput
          {...props}
          numberOfLines={1}
          ref={ref}
          style={[props.style, styles.input]}
        />
      </View>
    );
  },
);
