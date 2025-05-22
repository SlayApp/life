import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';
import {LandingScreen} from '~/screens/LandingScreen/Landing.screen';
import {LoadingScreen} from '~/screens/LoadingScreen';

import {FluidOnboardingStack} from '../FluidOnboardingStack/FluidOnboardingStack';
import {UnauthorizedStackProvider} from './UnauthorizedStack.provider';
import {TUnauthorizedStackParamList} from './UnauthorizedStack.types';

export const Stack = createNativeStackNavigator<TUnauthorizedStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animationDuration: 500,
  animation: 'slide_and_push',
};

export const UnauthorizedStack: React.FC = () => {
  return (
    <UnauthorizedStackProvider>
      <Stack.Navigator
        initialRouteName={EUnauthorizedStack.Landing}
        screenOptions={screenOptions}>
        <Stack.Screen
          name={EUnauthorizedStack.Landing}
          component={LandingScreen}
        />
        <Stack.Screen
          name={EUnauthorizedStack.FluidOnboarding}
          options={{gestureEnabled: false}}
          component={FluidOnboardingStack}
        />
        <Stack.Screen
          name={EUnauthorizedStack.Loading}
          component={LoadingScreen}
        />
      </Stack.Navigator>
    </UnauthorizedStackProvider>
  );
};
