import {FlashList} from '@shopify/flash-list';
import {MessageResponseDto} from 'api-client/api';
import {useCallback, useMemo, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {messagesApi} from '~/api/api';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {useInfiniteAPIRequest} from '~/hooks/useInfiniteAPIRequest';
import {useRoute} from '~/hooks/useRoute';
import {useUser} from '~/hooks/useUser';

import {LIMIT} from './Chat.constants';
import {IChatInputRef} from './components';
import {useGetChatPartner, useOptimisticPrepend} from './hooks';

export const useChat = () => {
  const {
    params: {id: characterId},
  } = useRoute<EAuthorizedStack.Chat>();
  const user = useUser();
  const chatInputRef = useRef<IChatInputRef>(null);
  const insets = useSafeAreaInsets();
  const chatPartner = useGetChatPartner(characterId);
  const listRef = useRef<FlashList<MessageResponseDto>>(null);
  const optimisticPrepend = useOptimisticPrepend(characterId);

  const {data, fetchNextPage, isFetching} = useInfiniteAPIRequest(
    messagesApi.getConversation,
    {
      initialPageParam: 0,
      getNextPageParam: (_, pages) => pages.flatMap(page => page.data).length,
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
      const date = new Date();
      const id = date.getTime();
      const createdAt = date.toISOString();

      optimisticPrepend({
        // @ts-expect-error backend is typed wrong
        createdAt,
        content: message,
        isFromUser: true,
        id,
      });
      // Socket.emit(ESubscriptionEvents.CHARACTER_MESSAGE, {
      //   characterId,
      //   message,
      //   userId: user.id,
      // });
    },
    [optimisticPrepend],
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
