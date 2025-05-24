import {MessageResponseDto} from 'api-client/api';
import {useCallback} from 'react';

import {useUser} from '~/hooks/useUser';
import {optimisticUpdateGetAllUserChats} from '~/utils/optimisticUpdateGetAllUserChats';
import {optimisticUpdateGetConversation} from '~/utils/optimisticUpdateGetConversation';

export const useOptimisticPrepend = (characterId: number) => {
  const user = useUser();

  return useCallback(
    (message: Omit<MessageResponseDto, 'id'>) => {
      optimisticUpdateGetAllUserChats({
        characterId,
        userId: user.id,
        lastMessage: message,
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
