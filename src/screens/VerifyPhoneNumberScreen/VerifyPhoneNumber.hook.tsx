import {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';

import {authApi} from '~/api/api';
import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useAPIMutation} from '~/hooks/useAPIMutation';
import {useCreateUser} from '~/hooks/useCreateUser';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';
import {log} from '~/utils/log.util';

import {CODE_LENGTH} from './VerifyPhoneNumber.constants';

export const useVerifyPhoneNumberScreen = () => {
  const {phoneNumber} = useUnauthorizedStack();

  const ref = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const createUser = useCreateUser();
  const [resendOtp] = useAPIMutation(authApi.sendOtp);
  const {goBack, navigate, popTo} = useFluidOnboardingNavigation();

  const onCodeInputPress = useCallback(() => {
    ref.current?.focus();
  }, []);

  const onChangeText = useCallback((text: string) => {
    if (text.length > CODE_LENGTH) {
      return;
    }
    setCode(text);
  }, []);

  const onNextPress = useCallback(async () => {
    if (code.length !== CODE_LENGTH) {
      return;
    }

    if (!phoneNumber.current) {
      popTo(EFluidOnboardingStack.EnterPhoneNumber);

      return;
    }

    setLoading(true);
    try {
      await createUser({
        phoneNumber: phoneNumber.current,
        otp: code,
      });
      navigate(EFluidOnboardingStack.EnterName);
    } catch (error) {
      log.error('Error verifying OTP', error);
    } finally {
      setLoading(false);
    }
  }, [code, createUser, navigate, phoneNumber, popTo]);

  const onResendCodePress = useCallback(async () => {
    if (!phoneNumber.current) {
      popTo(EFluidOnboardingStack.EnterPhoneNumber);

      return;
    }

    try {
      await resendOtp({
        phoneNumber: phoneNumber.current,
      });
    } catch (error) {
      log.error('Error resending OTP', error);
    }
  }, [phoneNumber, popTo, resendOtp]);

  useEffect(() => {
    if (code.length >= CODE_LENGTH) {
      onNextPress();
    }
  }, [code.length, onNextPress]);

  useSetFluidOnboardingStackProps({
    onPress: onNextPress,
    onBackPress: goBack,
    disabled: code.length !== CODE_LENGTH,
    loading,
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
