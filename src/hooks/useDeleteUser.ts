import axios from 'axios';
import {useCallback} from 'react';

import {usersApi} from '~/api/api';
import {LifetimeStorage} from '~/service/LifetimeStorage';
import {queryClient} from '~/utils/cache/queryClient';
import {log} from '~/utils/log.util';
import {resetToUnuthorizedStack} from '~/utils/resetToUnauthorizedStack';
import {userQueryKey} from '~/utils/userQueryKey';

import {useAPIMutation} from './useAPIMutation';
import {useUser} from './useUser';

export const useDeleteUser = () => {
  const user = useUser();
  const [deleteUser] = useAPIMutation(usersApi.remove, {
    onSuccess: async () => {
      LifetimeStorage.delete('userId');
      LifetimeStorage.delete('authToken');
      axios.defaults.headers.common.Authorization = undefined;
      queryClient.removeQueries({queryKey: userQueryKey, exact: true});
      queryClient.clear();
      resetToUnuthorizedStack();
    },
  });

  return useCallback(async () => {
    try {
      await deleteUser(user.id);
    } catch (error) {
      log.error('Error deleting user', error);
    }
  }, [deleteUser, user]);
};
