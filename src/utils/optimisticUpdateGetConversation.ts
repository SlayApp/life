import {MessageResponseDto, PaginatedMessagesResponseDto} from 'api-client';

import {messagesApi} from '~/api/api';
import {LIMIT} from '~/screens/ChatScreen/Chat.constants';

import {getInfiniteCacheOf, setInfiniteCacheOf} from './cache/accessCacheOf';

type Args = {
  userId: string;
  characterId: string;
  message: MessageResponseDto;
};

export const optimisticUpdateGetConversation = ({
  userId,
  characterId,
  message,
}: Args) => {
  /** ── 1. read existing infinite cache ─────────────────────────────── */
  const cache = getInfiniteCacheOf(messagesApi.getConversation)(
    characterId,
    userId,
    undefined, // first-page cursor is always undefined
    LIMIT,
  );

  if (!cache || cache.pages.length === 0) {
    setInfiniteCacheOf(messagesApi.getConversation)(
      {
        pageParams: [undefined],
        pages: [{data: [message], meta: {hasMore: true}}],
      },
      characterId,
      userId,
      undefined,
      LIMIT,
    );

    return;
  }

  const firstPage = cache.pages[0]!;
  const restPages = cache.pages.slice(1);
  const firstItems = firstPage.data;

  let newPages: PaginatedMessagesResponseDto[];
  let newPageParams;

  if (firstItems.length < LIMIT) {
    newPages = [{...firstPage, data: [message, ...firstItems]}, ...restPages];
    newPageParams = cache.pageParams;
  } else {
    const newFirstPage = {data: [message], meta: {hasMore: true}};

    newPages = [newFirstPage, ...cache.pages];
    newPageParams = [undefined, ...cache.pageParams];
  }

  setInfiniteCacheOf(messagesApi.getConversation)(
    {...cache, pages: newPages, pageParams: newPageParams},
    characterId,
    userId,
    undefined,
    LIMIT,
  );
};
