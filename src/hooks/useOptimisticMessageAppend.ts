import {MessageResponseDto} from 'api-client/api';
import {useCallback} from 'react';

import {messagesApi} from '~/api/api';
import {useUser} from '~/hooks/useUser';
import {LIMIT} from '~/screens/ChatScreen/Chat.constants';
import {
  getInfiniteCacheOf,
  setInfiniteCacheOf,
} from '~/utils/cache/accessCacheOf';

export const useOptimisticPrepend = (characterId: number) => {
  const user = useUser();

  return useCallback(
    (message: MessageResponseDto) => {
      const prev = getInfiniteCacheOf(messagesApi.getConversation)(
        characterId,
        user.id,
        undefined,
        LIMIT,
      );

      if (!prev) return;
      if (!prev.pages.length) return;

      const added = [message, ...prev.pages[0].data];
      const data = {
        ...prev,
        pages: prev.pages.map((page, i) =>
          i === 0 ? {...page, data: added} : page,
        ),
      };

      setInfiniteCacheOf(messagesApi.getConversation)(
        data,
        characterId,
        user.id,
        undefined,
        LIMIT,
      );
    },
    [characterId, user.id],
  );
};
