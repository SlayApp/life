import {UpdateUserDtoGenderEnum} from 'api-client/api';
import {useCallback, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useAfterFirstRenderEffect} from '~/hooks/useAfterFirstRenderEffect';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useGetCachedUser} from '~/hooks/useGetCachedUser';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUpdateUser} from '~/hooks/useUpdateUser';

export const useSelectGender = () => {
  const {goBack, navigate, popTo} = useFluidOnboardingNavigation();
  const user = useGetCachedUser();
  const updateUser = useUpdateUser();
  const [selectedGender, setSelectedGender] =
    useState<UpdateUserDtoGenderEnum | null>(null);

  const onPress = useCallback(() => {
    if (!selectedGender) {
      return;
    }

    if (!user?.id) {
      popTo(EFluidOnboardingStack.EnterPhoneNumber);

      return;
    }

    updateUser(user.id, {gender: selectedGender}).catch(() => {
      popTo(EFluidOnboardingStack.SelectGender);
    });
    navigate(EFluidOnboardingStack.SelectInterests);
  }, [navigate, popTo, selectedGender, updateUser, user?.id]);

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
