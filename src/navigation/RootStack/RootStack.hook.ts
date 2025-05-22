import axios from 'axios';
import {useEffect} from 'react';

import {ERootStack} from '~/enums/ERootStack';
import {useFindUser} from '~/hooks/useFindUser';
import {Environment} from '~/service/Environment';
import {LifetimeStorage} from '~/service/LifetimeStorage';

export const useRootStack = () => {
  useEffect(() => {
    const token = LifetimeStorage.getString('authToken');

    axios.defaults.baseURL = Environment.API_BASE_URL;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  const {user, isLoading} = useFindUser();

  const initialRouteName = user
    ? ERootStack.Authorized
    : ERootStack.Unauthorized;

  return {loading: isLoading, user, initialRouteName};
};
