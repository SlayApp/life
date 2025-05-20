import {useCallback, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';

export const useEnterPhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {goBack, navigate} = useFluidOnboardingNavigation();

  const {setPhoneNumber: setUnauthorizedStackPhoneNumber} =
    useUnauthorizedStack();

  const onPress = useCallback(async () => {
    setUnauthorizedStackPhoneNumber(`+1 ${phoneNumber}`);
    navigate(EFluidOnboardingStack.VerifyPhoneNumber);
  }, [navigate, phoneNumber, setUnauthorizedStackPhoneNumber]);

  useSetFluidOnboardingStackProps({
    onPress,
    onBackPress: goBack,
    disabled: !phoneNumber.trim(),
  });

  return {onPress, setPhoneNumber};
};
