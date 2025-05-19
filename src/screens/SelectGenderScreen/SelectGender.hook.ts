import {useCallback, useEffect, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';

export const useSelectGender = () => {
  const {goBack, navigate} = useFluidOnboardingNavigation();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (selectedGenderIndex !== null) {
      navigate(EFluidOnboardingStack.SelectInterests);
    }
  }, [selectedGenderIndex, navigate]);

  const onPress = useCallback(() => {
    navigate(EFluidOnboardingStack.SelectGender);
  }, [navigate]);

  useSetFluidOnboardingStackProps({
    disabled: selectedGenderIndex === null,
    onBackPress: goBack,
    onPress,
  });

  return {
    onPress,
    selectedGenderIndex,
    setSelectedGenderIndex,
  };
};
