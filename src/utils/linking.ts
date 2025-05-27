import {LinkingOptions} from '@react-navigation/native';

import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ERootStack} from '~/enums/ERootStack';
import {TAuthorizedStackParamList} from '~/navigation/AuthorizedStack';
import {TRootStackParamList} from '~/navigation/RootStack';

const authorizedLinking: LinkingOptions<TAuthorizedStackParamList>['config'] = {
  initialRouteName: EAuthorizedStack.ChatOverview,
  screens: {
    [EAuthorizedStack.Chat]: {
      path: '/chat/:id',
      parse: {
        id: (id: string) => {
          return Number(id);
        },
      },
    },
  },
};

export const linking: LinkingOptions<TRootStackParamList> = {
  prefixes: ['example://'],
  config: {
    screens: {
      [ERootStack.Authorized]: {...authorizedLinking},
    },
  },
};
