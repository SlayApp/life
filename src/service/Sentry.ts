import * as Sentry from '@sentry/react-native';
import * as Application from 'expo-application';

import {Environment} from './Environment';

export const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

const bundle = Application.applicationId;
const correctVersion = Application.nativeApplicationVersion;
const buildNumber = Application.nativeBuildVersion;

export const initSentry = () => {
  Sentry.init({
    environment: __DEV__ ? 'development' : 'production',
    dsn: Environment.SENTRY_DSN,
    dist: buildNumber ?? undefined,
    release: `${bundle}@${correctVersion}+${buildNumber}`,
    enabled: true,
    integrations: [routingInstrumentation],
    normalizeDepth: 5,
  });
};
