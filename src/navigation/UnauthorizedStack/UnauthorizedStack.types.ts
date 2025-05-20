import {NavigatorScreenParams} from '@react-navigation/native';

import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';

import {TFluidOnboardingStackParamList} from '../FluidOnboardingStack/FluidOnboardingStack.types';

export type TUnauthorizedStackParamList = {
  [EUnauthorizedStack.Landing]: undefined;
  [EUnauthorizedStack.FluidOnboarding]: NavigatorScreenParams<TFluidOnboardingStackParamList>;
  [EUnauthorizedStack.Loading]: undefined;
};
