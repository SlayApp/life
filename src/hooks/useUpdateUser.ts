import {usersApi} from '~/api/api';
import {queryClient} from '~/utils/cache/queryClient';
import {userQueryKey} from '~/utils/userQueryKey';

import {useAPIMutation} from './useAPIMutation';

export const useUpdateUser = () => {
  const [updateUser] = useAPIMutation(usersApi.update, {
    onSuccess: data => {
      queryClient.setQueryData(userQueryKey, data);
    },
  });

  return updateUser;
};
