import {UserResponseDto} from 'api-client';

import {queryClient} from './cache/queryClient';
import {userQueryKey} from './userQueryKey';

export const getCachedUser = () => {
  return queryClient.getQueryData<UserResponseDto>(userQueryKey);
};
