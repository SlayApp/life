import {useCallback, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {EUserGender} from '~/enums/EUserGender';
import {useAfterFirstRenderEffect} from '~/hooks/useAfterFirstRenderEffect';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';

export const useSelectGender = () => {
  const {goBack, navigate} = useFluidOnboardingNavigation();
  const {setGender: setUnauthorizedStackGender, gender} =
    useUnauthorizedStack();
  const [selectedGender, setSelectedGender] = useState<EUserGender | null>(
    gender.current ?? null,
  );

  const onPress = useCallback(() => {
    if (!selectedGender) {
      return;
    }

    setUnauthorizedStackGender(selectedGender);
    navigate(EFluidOnboardingStack.SelectInterests);
  }, [navigate, selectedGender, setUnauthorizedStackGender]);

  useAfterFirstRenderEffect(
    useCallback(() => {
      if (selectedGender !== null) {
        onPress();
      }
    }, [selectedGender, onPress]),
  );

  useSetFluidOnboardingStackProps({
    disabled: !selectedGender,
    onBackPress: goBack,
    onPress,
  });

  return {
    onPress,
    selectedGender,
    setSelectedGender,
  };
};
