import {MessageResponseDto} from 'api-client/api';

import {messagesApi} from '~/api/api';
import {LIMIT} from '~/screens/ChatScreen/Chat.constants';

import {getInfiniteCacheOf, setInfiniteCacheOf} from './cache/accessCacheOf';

type TArgs = {
  characterId: number;
  userId: number;
  message: MessageResponseDto;
};

export const optimisticUpdateGetConversation = ({
  characterId,
  userId,
  message,
}: TArgs) => {
  const prevMessages = getInfiniteCacheOf(messagesApi.getConversation)(
    characterId,
    userId,
    undefined,
    LIMIT,
  );

  if (!prevMessages) return;
  if (!prevMessages.pages.length) return;

  const added = [message, ...prevMessages.pages[0].data];
  const data = {
    ...prevMessages,
    pages: prevMessages.pages.map((page, i) =>
      i === 0 ? {...page, data: added} : page,
    ),
  };

  setInfiniteCacheOf(messagesApi.getConversation)(
    data,
    characterId,
    userId,
    undefined,
    LIMIT,
  );
};
