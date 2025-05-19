import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TFluidOnboardingStackParamList} from '~/navigation/FluidOnboardingStack';

export const useFluidOnboardingNavigation = () => {
  return useNavigation<
    NativeStackNavigationProp<TFluidOnboardingStackParamList>
  >();
};
