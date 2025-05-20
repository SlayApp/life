import {isBefore, startOfToday} from 'date-fns';
import {useCallback, useMemo, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';

export const useEnterAgeScreen = () => {
  const {setBirthday, birthday} = useUnauthorizedStack();
  const [date, setDate] = useState(birthday.current ?? new Date());
  const {goBack, navigate} = useFluidOnboardingNavigation();

  const isDateValid = useMemo(() => {
    return isBefore(date, startOfToday());
  }, [date]);

  const onPress = useCallback(() => {
    // const ageInYears = differenceInYears(new Date(), date);
    setBirthday(date);
    navigate(EFluidOnboardingStack.SelectGender);
  }, [date, navigate, setBirthday]);

  useSetFluidOnboardingStackProps({
    onPress,
    onBackPress: goBack,
    disabled: !isDateValid,
  });

  return {date, setDate};
};
