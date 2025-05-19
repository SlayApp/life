import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {memo} from 'react';

import {EFluidOnboardingStack} from '~/enums/EFluidOnboardingStack.enum';
import {EnterNameScreen} from '~/screens/EnterNameScreen/EnterName.screen';
import {EnterPhoneNumberScreen} from '~/screens/EnterPhoneNumberScreen';
import {SelectInterestsScreen} from '~/screens/SelectInterestsScreen';
import {VerifyPhoneNumberScreen} from '~/screens/VerifyPhoneNumberScreen';

import {TFluidOnboardingStackParamList} from './FluidOnboardingStack.types';

const Stack = createNativeStackNavigator<TFluidOnboardingStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_and_push_fade',
  headerShown: false,
  navigationBarHidden: true,
  gestureEnabled: false,
  animationDuration: 500,
  contentStyle: {backgroundColor: 'transparent'},
};

export const FluidOnboardingStackNavigator: React.FC = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={EFluidOnboardingStack.EnterPhoneNumber}
      screenOptions={screenOptions}>
      <Stack.Screen
        name={EFluidOnboardingStack.EnterPhoneNumber}
        component={EnterPhoneNumberScreen}
      />
      <Stack.Screen
        name={EFluidOnboardingStack.VerifyPhoneNumber}
        component={VerifyPhoneNumberScreen}
      />
      <Stack.Screen
        name={EFluidOnboardingStack.EnterName}
        component={EnterNameScreen}
      />
      <Stack.Screen
        name={EFluidOnboardingStack.SelectInterests}
        component={SelectInterestsScreen}
      />
    </Stack.Navigator>
  );
});
