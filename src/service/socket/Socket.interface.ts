import {ESocketPubEvents, ESocketSubEvents} from '~/enums/ESubscriptionEvents';
import {components} from '~/types/asyncapi';

export type TSocketSubEvents = {
  [ESocketSubEvents.CONNECT]: () => void;
  [ESocketSubEvents.DISCONNECT]: () => void;
  [ESocketSubEvents.CHARACTER_RESPONSE]: (
    data: components['schemas']['CharacterResponseRTO'],
  ) => void;
};

export type TSocketPubEvents = {
  [ESocketPubEvents.CHARACTER_MESSAGE]: (
    data: components['schemas']['CharacterMessageDto'],
  ) => void;
  [ESocketPubEvents.INITIALIZE_INTEREST_BASED_CONVERSATION]: (
    data: components['schemas']['InitializeInterestBasedConversationDto'],
  ) => void;
};
