import {useCallback} from 'react';

import {useDeleteUser} from '~/hooks/useDeleteUser';
import {useUser} from '~/hooks/useUser';

export const useHeader = () => {
  const user = useUser();
  const logOut = useDeleteUser();
  const onPress = useCallback(() => {
    logOut();
  }, [logOut]);

  return {user, onPress};
};
