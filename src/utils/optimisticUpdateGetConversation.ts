import {MessageResponseDto} from 'api-client/api';
import {CharacterRTO} from 'backend/src/characters/rto/character.rto';

import {messagesApi} from '~/api/api';
import {LIMIT} from '~/screens/ChatScreen/Chat.constants';

import {getInfiniteCacheOf, setInfiniteCacheOf} from './cache/accessCacheOf';

type TArgs = {
  userId: number;
  character: CharacterRTO;
  message: MessageResponseDto;
};

export const optimisticUpdateGetConversation = ({
  character,
  userId,
  message,
}: TArgs) => {
  const prevMessages = getInfiniteCacheOf(messagesApi.getConversation)(
    character.id,
    userId,
    undefined,
    LIMIT,
  );

  // const previousMessages = prevMessages?.pages[0]?.data ?? [];
  // const newMessages = [message, ...previousMessages];
  // const newMeta = {
  //   total: (prevMessages?.pages[0]?.meta?.total ?? 0) + 1,
  //   page: prevMessages?.pages[0]?.meta?.page ?? 1,
  //   limit: LIMIT,
  //   totalPages: prevMessages?.pages[0]?.meta?.totalPages ?? 1,
  // };

  if (!prevMessages || !prevMessages.pages.length) {
    const data = {
      pageParams: [0],
      pages: [
        {
          data: [message],
          meta: {total: 1, page: 1, limit: LIMIT, totalPages: 1},
        },
      ],
    };

    setInfiniteCacheOf(messagesApi.getConversation)(
      data,
      character.id,
      userId,
      undefined,
      LIMIT,
    );

    return;
  }

  const added = [message, ...prevMessages.pages[0].data];
  const data = {
    ...prevMessages,
    pages: prevMessages.pages.map((page, i) =>
      i === 0
        ? {
            ...page,
            data: added,
            meta: {
              ...page.meta,
              total: (page.meta.total ?? 0) + 1,
            },
          }
        : page,
    ),
  };

  setInfiniteCacheOf(messagesApi.getConversation)(
    data,
    character.id,
    userId,
    undefined,
    LIMIT,
  );
};
