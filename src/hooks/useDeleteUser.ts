import {useCallback} from 'react';

import {useRootStackContainer} from '~/navigation/RootStack/RootStack.provider';
import {LifetimeStorage} from '~/service/LifetimeStorage';

export const useDeleteUser = () => {
  const {setUser} = useRootStackContainer();

  return useCallback(() => {
    setUser(null);
    LifetimeStorage.delete('id');
  }, [setUser]);
};
