import {ParamListBase} from '@react-navigation/native';

import {TAuthorizedStackParamList} from '~/navigation/AuthorizedStack';
import {TRootStackParamList} from '~/navigation/RootStack';
import {TUnauthorizedStackParamList} from '~/navigation/UnauthorizedStack';

export interface TRootParamList
  extends ParamListBase,
    TRootStackParamList,
    TUnauthorizedStackParamList,
    TAuthorizedStackParamList {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootParamList {}
  }
}
