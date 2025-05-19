import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';

export const useLandingScreen = () => {
  const {navigate} = useNavigation();

  const onPress = useCallback(() => {
    navigate(EUnauthorizedStack.FluidOnboarding, {
      screen: EFluidOnboardingStack.EnterPhoneNumber,
    });
  }, [navigate]);

  return {onPress};
};
