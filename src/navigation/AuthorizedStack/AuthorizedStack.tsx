import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';

import {InitSocket} from '~/components/InitSocket/InitSocket';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ERootStack} from '~/enums/ERootStack';
import {useRoute} from '~/hooks/useRoute';
import {ChatOverviewScreen} from '~/screens/ChatOverviewScreen';
import {ChatScreen} from '~/screens/ChatScreen';
import {LoadingScreen} from '~/screens/LoadingScreen/Loading.screen';
import {SocketConnectionProvider} from '~/service/socket/Socket.provider';

import {UserProvider} from './AuthorizedStack.provider';
import {TAuthorizedStackParamList} from './AuthorizedStack.types';

export const Stack = createNativeStackNavigator<TAuthorizedStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthorizedStackInner: React.FC = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={EAuthorizedStack.ChatOverview}
      screenOptions={screenOptions}>
      <Stack.Screen name={EAuthorizedStack.Chat} component={ChatScreen} />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          animation: 'slide_and_push',
        }}
        name={EAuthorizedStack.ChatOverview}
        component={ChatOverviewScreen}
      />
      <Stack.Screen
        name={EAuthorizedStack.Loading}
        options={{gestureEnabled: false, animation: 'slide_and_push'}}
        component={LoadingScreen}
      />
    </Stack.Navigator>
  );
});

export const AuthorizedStack: React.FC = () => {
  const {params} = useRoute<ERootStack.Authorized>();

  return (
    <UserProvider value={{user: params.user}}>
      <SocketConnectionProvider>
        <InitSocket />
        <AuthorizedStackInner />
      </SocketConnectionProvider>
    </UserProvider>
  );
};
