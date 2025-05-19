import {isBefore, startOfToday} from 'date-fns';
import {useCallback, useMemo, useState} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';

export const useEnterAgeScreen = () => {
  const [date, setDate] = useState(new Date());
  const {goBack, navigate} = useFluidOnboardingNavigation();

  const isDateValid = useMemo(() => {
    return isBefore(date, startOfToday());
  }, [date]);

  const onPress = useCallback(() => {
    navigate(EFluidOnboardingStack.SelectGender);
  }, [navigate]);

  useSetFluidOnboardingStackProps({
    onPress,
    onBackPress: goBack,
    disabled: !isDateValid,
  });

  return {date, setDate};
};
