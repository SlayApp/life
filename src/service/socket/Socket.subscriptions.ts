import {ESocketSubEvents} from '~/enums/ESubscriptionEvents';

import {TSocketSubEvents} from './Socket.interface';

export type TSocketEventsForced = {
  [K in ESocketSubEvents]: TSocketSubEvents[K];
};
