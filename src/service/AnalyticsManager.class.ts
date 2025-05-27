import {UserResponseDto} from 'api-client/api';
import appsFlyer, {InitSDKOptions} from 'react-native-appsflyer';

import {log} from '~/utils/log.util';

import {Environment} from './Environment';

export class AnalyticsManager {
  private appsFlyerPromise = (options: InitSDKOptions) => {
    return new Promise((resolve, reject) => {
      appsFlyer.initSdk(
        options,
        res => {
          log.info(`AppsFlyer: ${res}`);
          resolve(res);
        },
        error => {
          reject(error);
          log.error('[appsFlyer]', error);
        },
      );
    });
  };

  private static instance: AnalyticsManager | undefined;

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new AnalyticsManager();
    }

    return this.instance;
  };

  static initAppsFlyer = async () => {
    const options: InitSDKOptions = {
      devKey: Environment.APPSFLYER_IOS_DEV_KEY,
      isDebug: false,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      appId: Environment.APPSFLYER_IOS_APP_ID,
    };
    await AnalyticsManager.getInstance().appsFlyerPromise(options);
  };

  static identify = async ({id}: Pick<UserResponseDto, 'id'>) => {
    if (!id) return;
    appsFlyer.setCustomerUserId(id.toString());
  };
}
