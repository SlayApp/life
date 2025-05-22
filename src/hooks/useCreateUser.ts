import axios from 'axios';

import {authApi} from '~/api/api';
import {Environment} from '~/service/Environment';
import {UnauthorizedStorage} from '~/service/UnauthorizedStorage';
import {queryClient} from '~/utils/cache/queryClient';
import {userQueryKey} from '~/utils/userQueryKey';

import {useAPIMutation} from './useAPIMutation';

export const useCreateUser = () => {
  const [createUser] = useAPIMutation(authApi.login, {
    onSuccess: data => {
      const {access_token, user} = data;
      UnauthorizedStorage.set('authToken', access_token);
      axios.defaults.baseURL = Environment.API_BASE_URL;
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      queryClient.setQueryData(userQueryKey, user);
    },
  });

  return createUser;
};
