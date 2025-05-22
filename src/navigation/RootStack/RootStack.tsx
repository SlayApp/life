import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import {Insets} from '~/components/Insets/Insets';
import {ERootStack} from '~/enums/ERootStack';
import {TRootParamList} from '~/types/navigation';

import {AuthorizedStack} from '../AuthorizedStack';
import {UnauthorizedStack} from '../UnauthorizedStack/UnauthorizedStack';
import {useRootStack} from './RootStack.hook';

export const Stack = createNativeStackNavigator<TRootParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_and_push',
};

const RootStackInner: React.FC = () => {
  const {user, loading, initialRouteName} = useRootStack();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}>
      {user ? (
        <Stack.Screen
          initialParams={{user}}
          name={ERootStack.Authorized}
          component={AuthorizedStack}
        />
      ) : null}
      <Stack.Screen
        name={ERootStack.Unauthorized}
        component={UnauthorizedStack}
      />
    </Stack.Navigator>
  );
};

export const RootStack: React.FC = () => {
  return (
    <>
      <Insets />
      <RootStackInner />
    </>
  );
};
