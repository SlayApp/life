import {CharacterDto, MessageResponseDto} from 'api-client';

import {TPartialBy} from '~/types/TPartialBy';

import {optimisticUpdateGetAllUserChats} from '../optimisticUpdateGetAllUserChats';
import {optimisticUpdateGetConversation} from '../optimisticUpdateGetConversation';

export const optimisticAddMessage = (
  message: TPartialBy<MessageResponseDto, 'id'>,
  chatPartner: CharacterDto,
  userId: string,
) => {
  optimisticUpdateGetAllUserChats({
    character: chatPartner,
    userId,
    lastMessage: {
      ...message,
      id: message.id ?? 0,
    },
  });
  optimisticUpdateGetConversation({
    character: chatPartner,
    userId,
    message: {
      ...message,
      id: message.id ?? 0,
    },
  });
};
