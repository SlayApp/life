import React, {memo} from 'react';
import Animated from 'react-native-reanimated';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useResendCode} from './ResendCode.hook';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface IProps {
  loading: boolean;
  onPress: () => void;
}

export const ResendCode: React.FC<IProps> = memo(({loading, onPress}) => {
  const {secondsLeft, animatedTextStyles, disabled} = useResendCode(loading);

  return (
    <PressableScale disabled={disabled} onPress={onPress}>
      <Animated.View>
        <AnimatedText
          align="center"
          variant="body"
          weight="medium"
          color="secondary"
          style={animatedTextStyles}>
          Resend{secondsLeft > 0 ? ` in ${secondsLeft}s` : ' code'}
        </AnimatedText>
      </Animated.View>
    </PressableScale>
  );
});
