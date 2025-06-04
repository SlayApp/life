import {useCallback, useMemo} from 'react';

import {messagesApi} from '~/api/api';
import {useInfiniteAPIRequest} from '~/hooks/useInfiniteAPIRequest';

import {LIMIT} from './Chat.constants';
import {buildTimeline} from './Chat.utils';

export const useChatApi = (characterId: string, userId: string) => {
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
    userId,
    undefined,
    LIMIT,
  );

  const total = data?.pages[0]?.meta.total ?? 0;
  const messages = useMemo(() => {
    const items = data?.pages.flatMap(page => page.data) ?? [];

    return buildTimeline(items);
  }, [data]);

  const onEndReached = useCallback(() => {
    if (isFetching || total <= messages.length) return;

    fetchNextPage();
  }, [isFetching, total, messages.length, fetchNextPage]);

  return {messages, onEndReached};
};
