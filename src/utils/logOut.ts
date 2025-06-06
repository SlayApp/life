import axios from 'axios';

import {LifetimeStorage} from '~/service/LifetimeStorage';

import {queryClient} from './cache/queryClient';
import {resetToUnuthorizedStack} from './resetToUnauthorizedStack';
import {userQueryKey} from './userQueryKey';

export const logOut = () => {
  LifetimeStorage.delete('userId');
  LifetimeStorage.delete('authToken');
  axios.defaults.headers.common.Authorization = undefined;
  queryClient.removeQueries({queryKey: userQueryKey, exact: true});
  queryClient.clear();
  resetToUnuthorizedStack();
};
