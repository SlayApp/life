import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ERootStack} from '~/enums/ERootStack';
import {useRoute} from '~/hooks/useRoute';
import {useSocket} from '~/hooks/useSocket';
import {ChatOverviewScreen} from '~/screens/ChatOverviewScreen';
import {ChatScreen} from '~/screens/ChatScreen';

import {UserProvider} from './AuthorizedStack.provider';
import {TAuthorizedStackParamList} from './AuthorizedStack.types';

export const Stack = createNativeStackNavigator<TAuthorizedStackParamList>();

const AuthorizedStackInner: React.FC = () => {
  useSocket();

  return (
    <Stack.Navigator
      initialRouteName={EAuthorizedStack.ChatOverview}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={EAuthorizedStack.Chat} component={ChatScreen} />
      <Stack.Screen
        name={EAuthorizedStack.ChatOverview}
        component={ChatOverviewScreen}
      />
    </Stack.Navigator>
  );
};

export const AuthorizedStack: React.FC = () => {
  const {params} = useRoute<ERootStack.Authorized>();

  return (
    <UserProvider value={{user: params.user}}>
      <AuthorizedStackInner />
    </UserProvider>
  );
};
