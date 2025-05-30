import {UserResponseDto} from 'api-client';
import {useCallback, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IInput} from '~/components/Input';
import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useFocusTransitionEndEffect} from '~/hooks/useFocusTransitionEndEffect';
import {useGetCachedUser} from '~/hooks/useGetCachedUser';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUpdateUser} from '~/hooks/useUpdateUser';
import {log} from '~/utils/log.util';

export const useEnterNameScreen = () => {
  const user = useGetCachedUser();
  const updateUser = useUpdateUser();

  const ref = useRef<IInput>(null);
  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset = -insets.bottom + 16;
  const [name, setName] = useState(user?.firstName ?? '');
  const {goBack, navigate, popTo} = useFluidOnboardingNavigation();

  useFocusTransitionEndEffect(
    useCallback(() => {
      ref.current?.focus();
    }, []),
  );

  const onPress = useCallback(async () => {
    if (!user?.id) {
      popTo(EFluidOnboardingStack.EnterPhoneNumber);

      return;
    }

    try {
      const trimmedName = name.trim();
      const updateUserPayload: Partial<UserResponseDto> = {
        firstName: trimmedName,
      };

      updateUser(user.id, updateUserPayload).catch(() => {
        popTo(EFluidOnboardingStack.EnterName);
      });
      navigate(EFluidOnboardingStack.EnterAge);
    } catch (error) {
      log.error('Error updating name', error);
    }
  }, [user?.id, popTo, name, updateUser, navigate]);

  useSetFluidOnboardingStackProps({
    onBackPress: goBack,
    onPress,
    disabled: !name,
  });

  return {
    name,
    setName,
    keyboardVerticalOffset,
    onPress,
    ref,
  };
};
