// hooks/useResetToAuthorizedStack.ts
import {CommonActions} from '@react-navigation/native';

import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ERootStack} from '~/enums/ERootStack';
import {navigationRef} from '~/utils/navigationRef';

export const resetToUnuthorizedStack = (screen?: EAuthorizedStack) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: ERootStack.Unauthorized,
          params: {
            screen: screen ?? EAuthorizedStack.ChatOverview,
          },
        },
      ],
    }),
  );
};
