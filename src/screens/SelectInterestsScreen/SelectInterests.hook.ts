import {useCallback, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useUnistyles} from 'react-native-unistyles';

import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';

export const useSelectInterestsScreen = () => {
  const ref = useRef<TextInput>(null);
  const {theme} = useUnistyles();
  const [interest, setInterest] = useState<string>('');
  const [interests, setInterests] = useState<string[]>([]);
  const {goBack} = useFluidOnboardingNavigation();

  const validInterest = !!interest.trim();

  const onAddInterestPress = useCallback(() => {
    setInterests(prev => [...prev, interest]);
    setInterest('');
  }, [interest]);

  const onPress = useCallback(() => {}, []);

  const onRemoveInterestPress = useCallback((index: number) => {
    setInterests(prev => prev.filter((_, i) => i !== index));
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
