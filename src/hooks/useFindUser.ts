import {useQuery} from '@tanstack/react-query';
import {OneSignal} from 'react-native-onesignal';

import {usersApi} from '~/api/api';
import {LifetimeStorage} from '~/service/LifetimeStorage';
import {userQueryKey} from '~/utils/userQueryKey';

import {useLazyAPIRequest} from './useLazyAPIRequest';

export const useFindUser = () => {
  const [findUser] = useLazyAPIRequest(usersApi.findOne);
  const {data: user, isLoading} = useQuery({
    queryKey: userQueryKey,
    queryFn: async () => {
      const userId = LifetimeStorage.getString('userId');
      const token = LifetimeStorage.getString('authToken');

      if (!userId || !token) {
        return null;
      }

      OneSignal.login(userId);

      return await findUser(userId);
    },
  });

  return {user, isLoading};
};
