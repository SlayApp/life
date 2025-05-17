import {MessageResponseDto} from 'api-client/api';
import {useCallback} from 'react';

import {useUser} from '~/hooks/useUser';
import {optimisticUpdateGetAllUserChats} from '~/utils/optimisticUpdateGetAllUserChats';
import {optimisticUpdateGetConversation} from '~/utils/optimisticUpdateGetConversation';

export const useOptimisticPrepend = (characterId: number) => {
  const user = useUser();

  return useCallback(
    (message: MessageResponseDto) => {
      optimisticUpdateGetAllUserChats({
        characterId,
        userId: user.id,
        message: {
          content: message.content,
          // @ts-expect-error backend badly typed
          createdAt: message.createdAt,
          id: message.id,
          isFromUser: message.isFromUser,
        },
      });
      optimisticUpdateGetConversation({
        characterId,
        userId: user.id,
        message,
      });
    },
    [characterId, user.id],
  );
};
