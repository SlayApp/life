import {ParamListBase} from '@react-navigation/native';

import {TAuthorizedStackParamList} from '~/navigation/AuthorizedStack';
import {TFluidOnboardingStackParamList} from '~/navigation/FluidOnboardingStack';
import {TRootStackParamList} from '~/navigation/RootStack';
import {TUnauthorizedStackParamList} from '~/navigation/UnauthorizedStack';

export interface TRootParamList
  extends ParamListBase,
    TRootStackParamList,
    TFluidOnboardingStackParamList,
    TUnauthorizedStackParamList,
    TAuthorizedStackParamList {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootParamList {}
  }
}
