import {useEffect, useState} from 'react';

import {usersApi} from '~/api/api';
import {useAPIMutation} from '~/hooks/useAPIMutation';
import {LifetimeStorage} from '~/service/LifetimeStorage';

import {useRootStackContainer} from './RootStack.provider';

export const useRootStack = () => {
  const [loading, setLoading] = useState(true);
  const {setUser, user} = useRootStackContainer();
  const [findUser] = useAPIMutation(usersApi.findOne);

  useEffect(() => {
    const id = LifetimeStorage.getString('id');
    if (!id) {
      setLoading(false);

      return;
    }

    const doIt = async () => {
      const user = await findUser(Number(id));
      setUser(user);
      setLoading(false);
    };

    doIt();
  }, [findUser, setUser]);

  return {loading, user};
};
