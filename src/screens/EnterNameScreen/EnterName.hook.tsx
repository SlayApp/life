import {useCallback, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {usersApi} from '~/api/api';
import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {useAPIMutation} from '~/hooks/useAPIMutation';
import {useFluidOnboardingNavigation} from '~/hooks/useFluidOnboardingNavigation';
import {useSetFluidOnboardingStackProps} from '~/hooks/useSetFluidOnboardingStackProps';
import {useUpdateUser} from '~/hooks/useUpdateUser';
import {LifetimeStorage} from '~/service/LifetimeStorage';

export const useEnterNameScreen = () => {
  const ref = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const keyboardVerticalOffset = -insets.bottom + 16;
  const [createUser] = useAPIMutation(usersApi.create);
  const updateUser = useUpdateUser();
  const {goBack, navigate} = useFluidOnboardingNavigation();

  const onPress = useCallback(async () => {
    try {
      const response = await createUser({
        username: name,
        password: name,
        age: 18,
        firstName: name,
        lastName: name,
      });
      updateUser(response);
      LifetimeStorage.set('id', response.id.toString());
    } catch (e) {
      // TODO: handle error
    }
  }, [createUser, name, updateUser]);

  const onPressTest = useCallback(async () => {
    navigate(EFluidOnboardingStack.SelectInterests);
  }, [navigate]);

  useSetFluidOnboardingStackProps({
    onBackPress: goBack,
    onPress: onPressTest,
    disabled: !name,
  });

  return {
    name,
    setName,
    keyboardVerticalOffset,
    onPress: onPressTest,
    ref,
  };
};
