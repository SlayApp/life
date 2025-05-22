import 'react-native-url-polyfill/auto';
import '~/theme/theme';

import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';

import {RessourceLoader} from '~/components/RessourceLoader';
import {RootStack} from '~/navigation/RootStack';
import {queryClient} from '~/utils/cache/queryClient';
import {navigationRef} from '~/utils/navigationRef';

enableFreeze(true);

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <KeyboardProvider>
              <RessourceLoader>
                <RootStack />
              </RessourceLoader>
            </KeyboardProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
