import * as Sentry from '@sentry/react-native';
import {UserResponseDto} from 'api-client/api';
import * as Application from 'expo-application';
import {OneSignal} from 'react-native-onesignal';

import {initOneSignal} from '~/utils/initOneSignal';

import {mixpanel} from './Mixpanel';
import {initSentry} from './Sentry';

export class AnalyticsManager {
  private static instance: AnalyticsManager | undefined;

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new AnalyticsManager();
    }

    return this.instance;
  };

  static setup = () => {
    initOneSignal();
    mixpanel.init();
    initSentry();
  };

  static trackScreenView = (screenName: string) => {
    mixpanel.track('screen_view', {
      screen_name: screenName,
    });
  };

  static trackEvent: typeof mixpanel.track = (event, properties) => {
    mixpanel.track(event, properties);
  };

  static identify = async (user: UserResponseDto) => {
    const {id} = user;
    if (!id) return;
    OneSignal.login(id);
    OneSignal.User.addTags({
      name: user.firstName,
      version: Application.nativeApplicationVersion,
    });
    Sentry.setUser({id, username: user.firstName});
    mixpanel.identify(id);
    mixpanel.getPeople().set({
      $first_name: user.firstName,
      $last_name: user.lastName,
      $phone: user.phoneNumber,
      $created_at: user.createdAt,
      $updated_at: user.updatedAt,
      $version: Application.nativeApplicationVersion,
    });
  };
}
