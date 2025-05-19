import {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';

export const useSelectInterestsScreen = () => {
  const ref = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const keyboardVerticalOffset = -insets.bottom + 16;
  const {goBack, navigate} = useFluidOnboardingNavigation();

  return {};
};
