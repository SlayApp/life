import {parsePhoneNumber} from 'awesome-phonenumber';
import {useCallback, useRef, useState} from 'react';

import {authApi} from '~/api/api';
import {IInput} from '~/components/Input';
import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useAPIMutation} from '~/hooks/useAPIMutation';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useFocusTransitionEndEffect} from '~/hooks/useFocusTransitionEndEffect';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useFluidOnboardingStack} from '~/navigation/FluidOnboardingStack';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';
import {getCountryCode} from '~/utils/countryCodes';
import {log} from '~/utils/log.util';

export const useEnterPhoneNumberScreen = () => {
  const ref = useRef<IInput>(null);
  const [countryCode, _] = useState(getCountryCode());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendOtp] = useAPIMutation(authApi.sendOtp);
  const {focusTextInput} = useFluidOnboardingStack();
  const {goBack, navigate, popTo} = useFluidOnboardingNavigation();
  const {setPhoneNumber: setUnauthorizedStackPhoneNumber} =
    useUnauthorizedStack();
  const parsedPhoneNumber = parsePhoneNumber(
    countryCode.dial_code + phoneNumber,
  );

  useFocusTransitionEndEffect(
    useCallback(() => {
      ref.current?.focus();
    }, []),
  );

  const onPress = useCallback(async () => {
    try {
      const e164 = parsedPhoneNumber.number?.e164;
      if (!parsedPhoneNumber.valid || !e164) {
        throw new Error('Invalid phone number');
      }

      sendOtp({
        phoneNumber: e164,
      }).catch(e => {
        log.error('Error sending OTP', e);
        popTo(EFluidOnboardingStack.EnterPhoneNumber);
        setUnauthorizedStackPhoneNumber('');
      });

      setUnauthorizedStackPhoneNumber(e164);
      focusTextInput('numeric', 'one-time-code');
      navigate(EFluidOnboardingStack.VerifyPhoneNumber);
    } catch (error) {
      log.error('Error in EnterPhoneNumber', error);
    }
  }, [
    focusTextInput,
    navigate,
    parsedPhoneNumber.number?.e164,
    parsedPhoneNumber.valid,
    popTo,
    sendOtp,
    setUnauthorizedStackPhoneNumber,
  ]);

  useSetFluidOnboardingStackProps({
    onPress,
    onBackPress: goBack,
    disabled: !parsedPhoneNumber.valid,
  });

  return {onPress, setPhoneNumber, countryCode, ref};
};
