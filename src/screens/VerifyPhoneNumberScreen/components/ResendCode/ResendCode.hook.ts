import {useEffect} from 'react';
import {TextStyle} from 'react-native';
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useUnistyles} from 'react-native-unistyles';

import {useCountdown} from '~/hooks/useCountdown';
import {inOutQuad} from '~/motion/timingFunctions';

import {RESEND_CODE_COUNTDOWN} from '../../VerifyPhoneNumber.constants';

const timingConfig = {
  duration: 250,
  easing: inOutQuad,
};

export const useResendCode = (loading: boolean) => {
  const {theme} = useUnistyles();
  const {secondsLeft, pause, resume} = useCountdown(RESEND_CODE_COUNTDOWN);
  const disabled = secondsLeft > 0;
  const transition = useDerivedValue(() =>
    withTiming(disabled ? 0 : 1, timingConfig),
  );

  useEffect(() => {
    if (loading) {
      pause();
    } else {
      resume();
    }
  }, [loading, pause, resume]);

  const animatedTextStyles = useAnimatedStyle<TextStyle>(() => {
    return {
      color: interpolateColor(
        transition.value,
        [0, 1],
        [theme.colors.subdued60, theme.colors.primary],
      ),
    };
  }, [theme, transition.value]);

  return {secondsLeft, pause, resume, animatedTextStyles, disabled};
};
