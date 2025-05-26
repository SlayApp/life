import {FlashList} from '@shopify/flash-list';
import {MessageResponseDto} from 'api-client/api';
import {randomUUID} from 'expo-crypto';
import {useCallback, useMemo, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {messagesApi} from '~/api/api';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ESocketPubEvents} from '~/enums/ESubscriptionEvents';
import {useInfiniteAPIRequest} from '~/hooks/useInfiniteAPIRequest';
import {useRoute} from '~/hooks/useRoute';
import {useUser} from '~/hooks/useUser';
import {Socket} from '~/service/socket/Socket.class';
import {optimisticAddMessage} from '~/utils/cache/optimisticAddMessage';

import {LIMIT} from './Chat.constants';
import {IChatInputRef} from './components';
import {useGetChatPartner} from './hooks';

export const useChat = () => {
  const {
    params: {id: characterId},
  } = useRoute<EAuthorizedStack.Chat>();
  const user = useUser();
  const chatInputRef = useRef<IChatInputRef>(null);
  const insets = useSafeAreaInsets();
  const chatPartner = useGetChatPartner(characterId);
  const listRef = useRef<FlashList<MessageResponseDto>>(null);

  const {data, fetchNextPage, isFetching} = useInfiniteAPIRequest(
    messagesApi.getConversation,
    {
      initialPageParam: 0,
      getNextPageParam: (_, pages) => pages.flatMap(page => page.data).length,
      staleTime: Infinity,
      refetchOnWindowFocus: 'always',
      refetchOnMount: 'always',
    },
    characterId,
    user.id,
    undefined,
    LIMIT,
  );
  const total = data?.pages[0]?.meta.total ?? 0;
  const messages = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data],
  );

  const handleSend = useCallback(
    (message: string) => {
      if (!chatPartner) return;

      const date = new Date();
      const deduplicationId = randomUUID();
      const createdAt = date.toISOString();
      const newMessage: Omit<MessageResponseDto, 'id'> = {
        content: message,
        createdAt,
        deduplicationId,
        isFromUser: true,
      };

      optimisticAddMessage(newMessage, chatPartner, user.id);

      Socket.emit(ESocketPubEvents.CHARACTER_MESSAGE, {
        characterId,
        message,
        deduplicationId,
      });
    },
    [characterId, chatPartner, user.id],
  );

  const onEndReached = useCallback(() => {
    if (isFetching || total <= messages.length) return;

    fetchNextPage();
  }, [isFetching, fetchNextPage, total, messages.length]);

  return {
    chatInputRef,
    insets,
    messages,
    listRef,
    handleSend,
    chatPartner,
    onEndReached,
  };
};
