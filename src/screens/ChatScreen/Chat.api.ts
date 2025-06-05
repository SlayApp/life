import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useMemo} from 'react';

import {messagesApi} from '~/api/api';
import {useInfiniteAPIRequest} from '~/hooks/useInfiniteAPIRequest';
import {useOnAppOpen} from '~/hooks/useOnAppOpen';
import {optimisticUpdateGetAllUserChats} from '~/utils/optimisticUpdateGetAllUserChats';

import {LIMIT} from './Chat.constants';
import {buildTimeline} from './Chat.utils';

export const useChatApi = (characterId: string, userId: string) => {
  const {data, fetchNextPage, refetch, isFetchingNextPage} =
    useInfiniteAPIRequest(
      messagesApi.getConversation,
      {
        initialPageParam: undefined,
        getNextPageParam: lastPage => lastPage.data.at(-1)?.createdAt,
        staleTime: Infinity,
      },
      characterId,
      userId,
      undefined,
      LIMIT,
    );

  useEffect(() => {
    const lastMessage = data?.pages.at(0)?.data.at(0);

    if (!lastMessage) return;

    optimisticUpdateGetAllUserChats({
      userId,
      character: {id: characterId},
      lastMessage,
    });
  }, [characterId, data, userId]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  useOnAppOpen(refetch);

  const messages = useMemo(() => {
    const items = data?.pages.flatMap(page => page.data) ?? [];

    return buildTimeline(items);
  }, [data]);

  const onEndReached = useCallback(() => {
    const hasMore = data?.pages.at(-1)?.meta.hasMore ?? false;

    if (isFetchingNextPage || !hasMore) return;

    fetchNextPage();
  }, [data?.pages, isFetchingNextPage, fetchNextPage]);

  return {messages, onEndReached};
};
