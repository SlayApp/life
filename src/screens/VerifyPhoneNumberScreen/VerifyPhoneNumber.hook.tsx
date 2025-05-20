import {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';

import {CODE_LENGTH} from './VerifyPhoneNumber.constants';

export const useVerifyPhoneNumberScreen = () => {
  const {phoneNumber} = useUnauthorizedStack();

  const ref = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const {goBack, navigate} = useFluidOnboardingNavigation();

  const onCodeInputPress = useCallback(() => {
    ref.current?.focus();
  }, []);

  const onChangeText = useCallback((text: string) => {
    if (text.length > CODE_LENGTH) {
      return;
    }
    setCode(text);
  }, []);

  const onNextPress = useCallback(() => {
    if (code.length !== CODE_LENGTH) {
      return;
    }

    navigate(EFluidOnboardingStack.EnterName);
  }, [code, navigate]);

  const onResendCodePress = useCallback(() => {}, []);

  useEffect(() => {
    if (code.length >= CODE_LENGTH) {
      onNextPress();
    }
  }, [code.length, onNextPress]);

  useSetFluidOnboardingStackProps({
    onPress: onNextPress,
    onBackPress: goBack,
    disabled: code.length !== CODE_LENGTH,
  });

  return {
    phoneNumber: phoneNumber.current,
    code,
    setCode,
    ref,
    onCodeInputPress,
    onChangeText,
    loading,
    onResendCodePress,
  };
};
