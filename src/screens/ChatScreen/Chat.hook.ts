import {FlashList} from '@shopify/flash-list';
import {MessageResponseDto} from 'api-client';
import {randomUUID} from 'expo-crypto';
import {useCallback, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ESocketPubEvents} from '~/enums/ESubscriptionEvents';
import {useRoute} from '~/hooks/useRoute';
import {useUser} from '~/hooks/useUser';
import {AnalyticsManager} from '~/service/AnalyticsManager';
import {Socket} from '~/service/socket/Socket.class';
import {useIsTypingStore} from '~/stores/useIsTyping';
import {optimisticAddMessage} from '~/utils/cache/optimisticAddMessage';

import {useChatApi} from './Chat.api';
import {TMessage} from './Chat.types';
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
  const listRef = useRef<FlashList<TMessage>>(null);
  const isChatPartnerTyping = useIsTypingStore(s => s.getIsTyping(characterId));
  const {messages, onEndReached} = useChatApi(characterId, user.id);

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

      AnalyticsManager.trackEvent('message_sent', {
        ...newMessage,
        characterId,
      });
    },
    [characterId, chatPartner, user.id],
  );

  return {
    chatInputRef,
    insets,
    messages,
    listRef,
    handleSend,
    chatPartner,
    onEndReached,
    isChatPartnerTyping,
  };
};
