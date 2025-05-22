// hooks/useResetToAuthorizedStack.ts
import {CommonActions} from '@react-navigation/native';

import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ERootStack} from '~/enums/ERootStack';
import {LifetimeStorage} from '~/service/LifetimeStorage';
import {UnauthorizedStorage} from '~/service/UnauthorizedStorage';
import {getCachedUser} from '~/utils/getCachedUser';
import {navigationRef} from '~/utils/navigationRef';

export const resetToAuthorizedStack = (screen?: EAuthorizedStack) => {
  const authToken = UnauthorizedStorage.getString('authToken');
  const user = getCachedUser();

  if (!authToken || !user) {
    return;
  }

  LifetimeStorage.set('authToken', authToken);
  LifetimeStorage.set('userId', user.id);

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: ERootStack.Authorized,
          params: {
            screen: screen ?? EAuthorizedStack.ChatOverview,
            user,
          },
        },
      ],
    }),
  );
};
