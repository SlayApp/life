import {useCallback} from 'react';

import {usersApi} from '~/api/api';
import {log} from '~/utils/log.util';
import {logOut} from '~/utils/logOut';

import {useAPIMutation} from './useAPIMutation';
import {useUser} from './useUser';

export const useDeleteUser = () => {
  const user = useUser();
  const [deleteUser] = useAPIMutation(usersApi.remove, {
    onSuccess: logOut,
  });

  return useCallback(async () => {
    try {
      await deleteUser(user.id);
    } catch (error) {
      log.error('Error deleting user', error);
    }
  }, [deleteUser, user]);
};
