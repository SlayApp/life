import {randomUUID} from 'expo-crypto';
import {useCallback, useRef, useState} from 'react';
import {useUnistyles} from 'react-native-unistyles';

import {interestApi} from '~/api/api';
import {IInput} from '~/components/Input';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useAPIMutation} from '~/hooks/useAPIMutation';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useFocusTransitionEndEffect} from '~/hooks/useFocusTransitionEndEffect';
import {useGetCachedUser} from '~/hooks/useGetCachedUser';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {log} from '~/utils/log.util';
import {resetToAuthorizedStack} from '~/utils/resetToAuthorizedStack';

import {MIN_INTERESTS_COUNT} from './SelectInterests.constants';
import {TInterest} from './SelectInterests.types';

export const useSelectInterestsScreen = () => {
  const user = useGetCachedUser();
  const ref = useRef<IInput>(null);
  const {theme} = useUnistyles();
  const [interest, setInterest] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [interests, setInterests] = useState<TInterest[]>([]);
  const {goBack, popTo} = useFluidOnboardingNavigation();
  const [addInterest] = useAPIMutation(interestApi.addUserInterest);

  const validInterest = !!interest.trim();

  useFocusTransitionEndEffect(
    useCallback(() => {
      ref.current?.focus();
    }, []),
  );

  const onAddInterestPress = useCallback(async () => {
    const text = await ref.current?.clearText();

    if (!text) {
      return;
    }

    const uuid = randomUUID();
    setInterests(prev => [...prev, {name: text.trim(), id: uuid}]);
    setInterest('');
  }, []);

  const onPress = useCallback(async () => {
    if (!user?.id) {
      popTo(EFluidOnboardingStack.EnterPhoneNumber);

      return;
    }

    const interestsNames = interests.map(interest => interest.name);
    try {
      setLoading(true);
      addInterest(user.id, {
        interests: interestsNames,
      }).catch(() => {
        popTo(EFluidOnboardingStack.SelectInterests);
      });

      resetToAuthorizedStack(EAuthorizedStack.Loading, {
        interests: interestsNames,
      });
    } catch (error) {
      log.error('Error in SelectInterestsScreen', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, popTo, addInterest, interests]);

  const onRemoveInterestPress = useCallback((id: string) => {
    setInterests(prev => prev.filter(interest => interest.id !== id));
  }, []);

  useSetFluidOnboardingStackProps({
    loading,
    disabled: interests.length < MIN_INTERESTS_COUNT || loading,
    onBackPress: goBack,
    onPress,
  });

  return {
    ref,
    theme,
    interest,
    interests,
    setInterest,
    validInterest,
    onAddInterestPress,
    onRemoveInterestPress,
  };
};
