import {ESubscriptionEvents} from '~/enums/ESubscriptionEvents';
import {components} from '~/types/asyncapi';

export type TSocketEvents = {
  [ESubscriptionEvents.CONNECT]: () => void;
  [ESubscriptionEvents.CHARACTER_RESPONSE]: (
    data: components['schemas']['CharacterResponseDto'],
  ) => void;
  [ESubscriptionEvents.CHARACTER_MESSAGE]: (
    data: components['schemas']['CharacterMessageDto'],
  ) => void;
  // [ESubscriptionEvents.CHARACTER_MESSAGE_SENT]: (
  //   data: components['schemas']['Char'],
  // ) => void;
};

export type TEmitEvents = {
  [ESubscriptionEvents.CHARACTER_MESSAGE]: (
    data: components['schemas']['CharacterMessageDto'],
  ) => void;
};
