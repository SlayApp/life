import {Mixpanel} from 'mixpanel-react-native';

import {Environment} from './Environment';

const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel(
  Environment.MIXPANEL_PROJECT_TOKEN,
  trackAutomaticEvents,
);
