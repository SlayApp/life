import 'react-native-url-polyfill/auto';
import '~/theme/theme';

import * as Sentry from '@sentry/react-native';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';

import {FocusManager} from '~/components/FocusManager';
import {RessourceLoader} from '~/components/RessourceLoader';
import {RootStack} from '~/navigation/RootStack';
import {AnalyticsManager} from '~/service/AnalyticsManager';
import {queryClient} from '~/utils/cache/queryClient';
import {clientPersister} from '~/utils/persist';

enableFreeze(true);
AnalyticsManager.setup();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister: clientPersister}}>
        <FocusManager />
        <SafeAreaProvider>
          <KeyboardProvider>
            <RessourceLoader>
              <RootStack />
            </RessourceLoader>
          </KeyboardProvider>
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(App);
