import {LogLevel, OneSignal} from 'react-native-onesignal';

import {Environment} from '~/service/Environment';

export const initOneSignal = () => {
  if (__DEV__) {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  }

  OneSignal.initialize(Environment.ONE_SIGNAL_APP_ID);
  OneSignal.Notifications.requestPermission(true);
};
