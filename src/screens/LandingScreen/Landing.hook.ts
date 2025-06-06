import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';

export const useLandingScreen = () => {
  const {navigate, preload} = useNavigation();

  useEffect(() => {
    preload(EUnauthorizedStack.FluidOnboarding, {
      screen: EFluidOnboardingStack.EnterPhoneNumber,
    });
  }, [preload]);

  const onPress = useCallback(() => {
    navigate(EUnauthorizedStack.FluidOnboarding, {
      screen: EFluidOnboardingStack.EnterPhoneNumber,
    });
  }, [navigate]);

  return {onPress};
};
