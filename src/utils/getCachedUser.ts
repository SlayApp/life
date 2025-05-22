import {UserResponseDto} from 'api-client/api';

import {queryClient} from './cache/queryClient';
import {userQueryKey} from './userQueryKey';

export const getCachedUser = () => {
  return queryClient.getQueryData<UserResponseDto>(userQueryKey);
};
