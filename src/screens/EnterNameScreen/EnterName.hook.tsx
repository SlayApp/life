import {useNavigation} from '@react-navigation/native';
import {useCallback, useMemo, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {usersApi} from '~/api/api';
import {IScreenHeader} from '~/components/ScreenHeader/ScreenHeader.types';
import {useAPIMutation} from '~/hooks/useAPIMutation';
import {useUpdateUser} from '~/hooks/useUpdateUser';
import {LifetimeStorage} from '~/service/LifetimeStorage';

export const useEnterNameScreen = () => {
  const ref = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const keyboardVerticalOffset = -insets.bottom + 16;
  const [createUser] = useAPIMutation(usersApi.create);
  const updateUser = useUpdateUser();
  const {goBack} = useNavigation();

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
      console.error(e);
    }
  }, [createUser, name, updateUser]);

  const header: IScreenHeader = useMemo(
    () => ({
      leftAction: {
        name: 'chevron.left',
        onPress: goBack,
      },
    }),
    [goBack],
  );

  return {name, setName, keyboardVerticalOffset, onPress, ref, header};
};
