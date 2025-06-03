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

  const messages = useMemo(() => {
    const items = data?.pages.flatMap(page => page.data) ?? [];

    return buildTimeline(items);
  }, [data]);

  const onEndReached = useCallback(() => {
    const total = data?.pages[0]?.meta.total ?? 0;
    const loaded = data?.pages.flatMap(p => p.data).length ?? 0;

    if (isFetching || total > loaded) return;

    fetchNextPage();
  }, [data?.pages, isFetching, fetchNextPage]);

  return {messages, onEndReached};
};
