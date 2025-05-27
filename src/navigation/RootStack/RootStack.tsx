import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {UserResponseDto} from 'api-client/api';
import React from 'react';

import {Insets} from '~/components/Insets/Insets';
import {ERootStack} from '~/enums/ERootStack';
import {TRootParamList} from '~/types/navigation';
import {linking} from '~/utils/linking';
import {navigationRef} from '~/utils/navigationRef';

import {AuthorizedStack} from '../AuthorizedStack';
import {UnauthorizedStack} from '../UnauthorizedStack/UnauthorizedStack';
import {useRootStack} from './RootStack.hook';

export const Stack = createNativeStackNavigator<TRootParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_and_push',
};

interface IProps {
  initialRouteName: ERootStack;
  loading: boolean;
  user: UserResponseDto | null | undefined;
}

const RootStackInner: React.FC<IProps> = ({
  initialRouteName,
  loading,
  user,
}) => {
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
  const {user, loading, initialRouteName} = useRootStack();

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Insets />
      <RootStackInner
        user={user}
        loading={loading}
        initialRouteName={initialRouteName}
      />
    </NavigationContainer>
  );
};
