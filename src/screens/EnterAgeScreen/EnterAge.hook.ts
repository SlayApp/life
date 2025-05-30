import {UserResponseDto} from 'api-client';
import {differenceInYears, isBefore, startOfToday} from 'date-fns';
import {useCallback, useMemo, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useGetCachedUser} from '~/hooks/useGetCachedUser';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUpdateUser} from '~/hooks/useUpdateUser';

import {getBirthday} from './EnterAge.utils';

export const useEnterAgeScreen = () => {
  const user = useGetCachedUser();
  const [date, setDate] = useState(getBirthday(user) ?? new Date());
  const {goBack, navigate, popTo} = useFluidOnboardingNavigation();
  const updateUser = useUpdateUser();

  const isDateValid = useMemo(() => {
    return isBefore(date, startOfToday());
  }, [date]);

  const onPress = useCallback(() => {
    if (!user?.id) {
      popTo(EFluidOnboardingStack.EnterPhoneNumber);

      return;
    }

    const ageInYears = differenceInYears(new Date(), date);
    const updateUserPayload: Partial<UserResponseDto> = {
      age: ageInYears,
    };

    updateUser(user.id, updateUserPayload).catch(() => {
      popTo(EFluidOnboardingStack.EnterAge);
    });
    navigate(EFluidOnboardingStack.SelectGender);
  }, [date, navigate, popTo, user?.id, updateUser]);

  useSetFluidOnboardingStackProps({
    onPress,
    onBackPress: goBack,
    disabled: !isDateValid,
  });

  return {date, setDate};
};
