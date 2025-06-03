import {ListRenderItem} from '@shopify/flash-list';
import {useCallback, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {useAnimatedScrollHandler} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  KEYBOARD_OPEN_INPUT_VERTICAL_PADDING,
  TYPING_INDICATOR_ITEM,
} from '../../Chat.constants';
import {useChatScreenContainer} from '../../Chat.provider';
import {isMessageDateHeader, isTypingMessage, TMessage} from '../../Chat.types';
import {ChatDateHeaderMessage} from '../ChatDateHeaderMessage';
import {ChatMessage} from '../ChatMessage';
import {ChatTypingIndicator} from '../ChatTypingIndicator';
import {IChatListProps} from './ChatList.type';

export const useChatList = ({
  data,
  isChatPartnerTyping: isCharacterTyping,
}: IChatListProps) => {
  const {scrollOffset} = useChatScreenContainer();
  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });
  const keyboardVerticalOffset =
    -insets.bottom + KEYBOARD_OPEN_INPUT_VERTICAL_PADDING;

  const items = useMemo<TMessage[]>(() => {
    if (isCharacterTyping) {
      return [TYPING_INDICATOR_ITEM, ...data];
    }

    return data;
  }, [data, isCharacterTyping]);

  const renderItem: ListRenderItem<TMessage> = useCallback(
    ({item, index}) => {
      if (isTypingMessage(item)) {
        return (
          <ChatTypingIndicator messages={items} message={item} index={index} />
        );
      }

      if (isMessageDateHeader(item)) {
        return <ChatDateHeaderMessage date={item.date} />;
      }

      return <ChatMessage messages={items} message={item} index={index} />;
    },
    [items],
  );

  return {
    items,
    renderItem,
    windowDimensions,
    scrollHandler,
    keyboardVerticalOffset,
  };
};
