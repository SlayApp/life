import {useQuery} from '@tanstack/react-query';

import {usersApi} from '~/api/api';
import {AnalyticsManager} from '~/service/AnalyticsManager';
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

      const user = await findUser(userId);
      AnalyticsManager.identify(user);

      return user;
    },
  });

  return {user, isLoading};
};
