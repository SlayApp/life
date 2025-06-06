import axios from 'axios';
import {useCallback, useEffect, useRef} from 'react';

import {ERootStack} from '~/enums/ERootStack';
import {useFindUser} from '~/hooks/useFindUser';
import {AnalyticsManager} from '~/service/AnalyticsManager';
import {Environment} from '~/service/Environment';
import {LifetimeStorage} from '~/service/LifetimeStorage';
import {navigationRef} from '~/utils/navigationRef';

export const useRootStack = () => {
  const routeNameRef = useRef<string>('');

  useEffect(() => {
    const token = LifetimeStorage.getString('authToken');

    axios.defaults.baseURL = Environment.API_BASE_URL;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  const {user, isLoading} = useFindUser();

  const onReady = useCallback(() => {
    const routeName = navigationRef.current?.getCurrentRoute()?.name ?? '';
    routeNameRef.current = routeName;
    AnalyticsManager.trackScreenView(routeName);
  }, []);

  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      navigationRef.current?.getCurrentRoute()?.name ?? '';

    if (previousRouteName !== currentRouteName) {
      AnalyticsManager.trackScreenView(currentRouteName);
    }

    routeNameRef.current = currentRouteName;
  }, []);

  const initialRouteName = user
    ? ERootStack.Authorized
    : ERootStack.Unauthorized;

  return {loading: isLoading, user, initialRouteName, onStateChange, onReady};
};
