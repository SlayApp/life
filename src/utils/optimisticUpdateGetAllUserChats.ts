import {LastMessageDto, UserChatResponseDto} from 'api-client/api';

import {messagesApi} from '~/api/api';

import {getCacheOf, setCacheOf} from './cache/accessCacheOf';

type TArgs = {
  characterId: number;
  userId: number;
  message: LastMessageDto;
};

export const optimisticUpdateGetAllUserChats = ({
  userId,
  characterId,
  message,
}: TArgs) => {
  const prevChats = getCacheOf(messagesApi.getAllUserChats)(userId);

  if (!prevChats) return;
  if (!prevChats.length) return;

  const filtered = prevChats.filter(chat => chat.character.id !== characterId);
  const found = prevChats.find(chat => chat.character.id === characterId);
  if (!found) return;

  const optimisticChat: UserChatResponseDto = {
    ...found,
    lastMessage: message,
    isLastMessageFromUser: true,
  };

  const newChats = [...filtered, optimisticChat].sort((a, b) =>
    b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt),
  );

  setCacheOf(messagesApi.getAllUserChats)(newChats, userId);
};
