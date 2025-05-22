import {UserResponseDto} from 'api-client/api';
import {useMemo} from 'react';

import {queryClient} from '~/utils/cache/queryClient';
import {userQueryKey} from '~/utils/userQueryKey';

export const useGetCachedUser = () => {
  const user = useMemo(
    () => queryClient.getQueryData<UserResponseDto>(userQueryKey),
    [],
  );

  return user;
};
