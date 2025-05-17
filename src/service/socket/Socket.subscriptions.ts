import {ESubscriptionEvents} from '~/enums/ESubscriptionEvents';

import {TSocketEvents} from './Socket.interface';

export type TSocketEventsForced = {
  [K in ESubscriptionEvents]: TSocketEvents[K];
};

export const SocketSubscriptions: TSocketEventsForced = {
  [ESubscriptionEvents.CONNECT]: () => {
    console.log('onConnect');
  },
  [ESubscriptionEvents.CHARACTER_RESPONSE]: data => {
    console.log('onCharacterResponse', data);
  },
  [ESubscriptionEvents.CHARACTER_MESSAGE]: data => {
    console.log('onCharacterMessage', data);
  },
  [ESubscriptionEvents.CHARACTER_MESSAGE_SENT]: data => {
    console.log('onCharacterMessageSent', data);
  },
} as const;
