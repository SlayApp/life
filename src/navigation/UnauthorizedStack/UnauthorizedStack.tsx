import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';
import {LandingScreen} from '~/screens/LandingScreen/Landing.screen';

import {FluidOnboardingStack} from '../FluidOnboardingStack/FluidOnboardingStack';
import {TUnauthorizedStackParamList} from './UnauthorizedStack.types';

export const Stack = createNativeStackNavigator<TUnauthorizedStackParamList>();

export const UnauthorizedStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={EUnauthorizedStack.Landing}
      screenOptions={{
        headerShown: false,
        animationDuration: 500,
        animation: 'slide_and_push',
      }}>
      <Stack.Screen
        name={EUnauthorizedStack.Landing}
        component={LandingScreen}
      />
      <Stack.Screen
        name={EUnauthorizedStack.FluidOnboarding}
        component={FluidOnboardingStack}
      />
    </Stack.Navigator>
  );
};
