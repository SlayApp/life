export interface IEnvironment {
  API_BASE_URL: string;
  APPSFLYER_IOS_DEV_KEY: string;
  APPSFLYER_IOS_APP_ID: string;
  ONE_SIGNAL_APP_ID: string;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const Environment: IEnvironment = require('../../.env.json');
