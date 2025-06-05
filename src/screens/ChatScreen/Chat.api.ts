import {useFocusEffect} from '@react-navigation/native';
import {InfiniteData} from '@tanstack/react-query';
import {useCallback, useMemo} from 'react';

import {messagesApi} from '~/api/api';
import {useInfiniteAPIRequest} from '~/hooks/useInfiniteAPIRequest';
import {queryClient} from '~/utils/cache/queryClient';
import {getQueryKey} from '~/utils/getQueryKey';

import {LIMIT} from './Chat.constants';
import {buildTimeline} from './Chat.utils';

export const useChatApi = (characterId: string, userId: string) => {
  const {data, fetchNextPage, refetch, isFetchingNextPage} =
    useInfiniteAPIRequest(
      messagesApi.getConversation,
      {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
          const total = lastPage.meta.totalPages ?? 0;
          const currentCount = allPages.length;

          if (currentCount >= total) {
            return undefined;
          }

          return allPages.length + 1;
        },
        staleTime: Infinity,
      },
      characterId,
      userId,
      LIMIT,
    );

  useFocusEffect(
    useCallback(() => {
      queryClient.setQueryData(
        getQueryKey([
          messagesApi.getConversation.getKeyName(),
          characterId,
          userId,
          LIMIT,
        ]),
        (
          prev:
            | InfiniteData<
                Awaited<ReturnType<typeof messagesApi.getConversation>>
              >
            | undefined,
        ) => {
          return {
            pages: [],
            pageParams: prev?.pageParams.slice(0, 1) ?? [],
          };
        },
      );
      refetch();
    }, [characterId, refetch, userId]),
  );

  const messages = useMemo(() => {
    const items = data?.pages.flatMap(page => page.data) ?? [];

    return buildTimeline(items);
  }, [data]);

  const onEndReached = useCallback(() => {
    const total = data?.pages[0]?.meta.totalPages ?? 0;
    const items = data?.pages ?? [];

    if (isFetchingNextPage || total <= items.length) return;

    fetchNextPage();
  }, [data?.pages, isFetchingNextPage, fetchNextPage]);

  return {messages, onEndReached};
};
