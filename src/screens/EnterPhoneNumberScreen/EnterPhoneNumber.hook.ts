import {useCallback, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';

export const useEnterPhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {goBack, navigate} = useFluidOnboardingNavigation();

  const onPress = useCallback(() => {
    navigate(EFluidOnboardingStack.VerifyPhoneNumber);
  }, [navigate]);

  useSetFluidOnboardingStackProps({
    onPress,
    onBackPress: goBack,
    disabled: !phoneNumber.trim(),
  });

  return {phoneNumber, setPhoneNumber, onPress};
};
