import {useCallback, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IInput} from '~/components/Input';
import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUnauthorizedStack} from '~/navigation/UnauthorizedStack/UnauthorizedStack.provider';

export const useEnterNameScreen = () => {
  const {setName: setUnauthorizedStackName, name: unauthorizedStackName} =
    useUnauthorizedStack();

  const ref = useRef<IInput>(null);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(unauthorizedStackName.current ?? '');
  const keyboardVerticalOffset = -insets.bottom + 16;

  const {goBack, navigate} = useFluidOnboardingNavigation();

  const onPress = useCallback(() => {
    const trimmedName = name.trim();
    setUnauthorizedStackName(trimmedName);
    navigate(EFluidOnboardingStack.EnterAge);
  }, [navigate, name, setUnauthorizedStackName]);

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
