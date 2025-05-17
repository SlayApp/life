import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';
import {EnterNameScreen} from '~/screens/EnterNameScreen';
import {LandingScreen} from '~/screens/LandingScreen/Landing.screen';
import {SelectInterestsScreen} from '~/screens/SelectInterestsScreen';

export const Stack = createNativeStackNavigator();

export const UnauthorizedStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={EUnauthorizedStack.Landing}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={EUnauthorizedStack.Landing}
        component={LandingScreen}
      />
      <Stack.Screen
        name={EUnauthorizedStack.EnterName}
        component={EnterNameScreen}
      />
      <Stack.Screen
        name={EUnauthorizedStack.SelectInterests}
        component={SelectInterestsScreen}
      />
    </Stack.Navigator>
  );
};
