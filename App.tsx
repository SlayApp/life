import 'react-native-url-polyfill/auto';

import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native-unistyles';

import {RessourceLoader} from '~/components/RessourceLoader';
import {RootStack} from '~/navigation/RootStack';
import {queryClient} from '~/utils/cache/queryClient';

StyleSheet.configure({});

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
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
