import {ESubscriptionEvents} from '~/enums/ESubscriptionEvents';
import {components} from '~/types/asyncapi';

export type TSocketEvents = {
  [ESubscriptionEvents.CONNECT]: () => void;
  [ESubscriptionEvents.CHARACTER_RESPONSE]: (
    data: components['schemas']['CharacterResponse'],
  ) => void;
  [ESubscriptionEvents.CHARACTER_MESSAGE]: (
    data: components['schemas']['CharacterMessage'],
  ) => void;
  [ESubscriptionEvents.CHARACTER_MESSAGE_SENT]: (
    data: components['schemas']['CharacterMessageSent'],
  ) => void;
};

export type TEmitEvents = {
  [ESubscriptionEvents.CHARACTER_MESSAGE]: (
    data: components['schemas']['CharacterMessage'],
  ) => void;
};
