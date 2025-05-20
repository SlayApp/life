import {useNavigation} from '@react-navigation/native';
import {randomUUID} from 'expo-crypto';
import {useCallback, useRef, useState} from 'react';
import {useUnistyles} from 'react-native-unistyles';

import {IInput} from '~/components/Input';
import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';

import {TInterest} from './SelectInterests.types';

export const useSelectInterestsScreen = () => {
  const ref = useRef<IInput>(null);
  const {theme} = useUnistyles();
  const [interest, setInterest] = useState<string>('');
  const [interests, setInterests] = useState<TInterest[]>([]);
  const {goBack} = useFluidOnboardingNavigation();
  const {navigate} = useNavigation();

  const validInterest = !!interest.trim();

  const onAddInterestPress = useCallback(async () => {
    const text = await ref.current?.clearText();

    if (!text) {
      return;
    }

    const uuid = randomUUID();
    setInterests(prev => [...prev, {name: text.trim(), id: uuid}]);
    setInterest('');
  }, []);

  const onPress = useCallback(() => {
    navigate(EUnauthorizedStack.Loading);
  }, [navigate]);

  const onRemoveInterestPress = useCallback((id: string) => {
    setInterests(prev => prev.filter(interest => interest.id !== id));
  }, []);

  useSetFluidOnboardingStackProps({
    disabled: interests.length < 3,
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
