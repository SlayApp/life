import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Insets} from '~/components/Insets/Insets';
import {ERootStack} from '~/enums/ERootStack';
import {TRootParamList} from '~/types/navigation';

import {AuthorizedStack} from '../AuthorizedStack';
import {UnauthorizedStack} from '../UnauthorizedStack/UnauthorizedStack';
import {useRootStack} from './RootStack.hook';
import {RootStackProvider} from './RootStack.provider';

export const Stack = createNativeStackNavigator<TRootParamList>();

const RootStackInner: React.FC = () => {
  const {user, loading} = useRootStack();
  const initialRouteName = user
    ? ERootStack.Authorized
    : ERootStack.Unauthorized;

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen
          initialParams={{user}}
          name={ERootStack.Authorized}
          component={AuthorizedStack}
        />
      ) : (
        <Stack.Screen
          name={ERootStack.Unauthorized}
          component={UnauthorizedStack}
        />
      )}
    </Stack.Navigator>
  );
};

export const RootStack: React.FC = () => {
  return (
    <RootStackProvider>
      <Insets />
      <RootStackInner />
    </RootStackProvider>
  );
};
