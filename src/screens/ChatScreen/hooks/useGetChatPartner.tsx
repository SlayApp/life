import {useMemo} from 'react';

import {messagesApi} from '~/api/api';
import {useAPIRequest} from '~/hooks/useAPIRequest';
import {useUser} from '~/hooks/useUser';

export const useGetChatPartner = (characterId: number) => {
  const user = useUser();
  const {data: chats} = useAPIRequest(messagesApi.getAllUserChats, user.id);

  return useMemo(
    () => chats?.find(chat => chat.character.id === characterId)?.character,
    [chats, characterId],
  );
};
