import {useMemo} from 'react';

import {isMessageDateHeader, isUserMessage} from '../../Chat.types';
import {styles} from './ChatMessageWrapper.styles';
import {IChatMessageWrapperProps} from './ChatMessageWrapper.types';
import {areMessagesGrouped} from './ChatMessageWrapper.utils';

export const useChatMessageWrapper = ({
  message,
  index,
  messages,
}: IChatMessageWrapperProps) => {
  const nextMessage = messages[index - 1];
  const previousMessage = messages[index + 1];

  const nextBorderTopRadius = useMemo(() => {
    if (!previousMessage || isMessageDateHeader(previousMessage)) {
      return 16;
    }

    if (areMessagesGrouped(message, previousMessage)) {
      return 4;
    }

    return 16;
  }, [message, previousMessage]);

  const nextBorderBottomRadius = useMemo(() => {
    if (!nextMessage && !message.isFromUser) {
      return 4;
    }

    if (!nextMessage || isMessageDateHeader(nextMessage)) {
      return 16;
    }

    if (areMessagesGrouped(message, nextMessage)) {
      return 4;
    }

    return 16;
  }, [message, nextMessage]);

  const containerStyle = useMemo(() => {
    const isPreviousSameUser =
      previousMessage && isUserMessage(previousMessage)
        ? previousMessage.isFromUser === message.isFromUser
        : false;

    const isNextSameUser =
      nextMessage && isUserMessage(nextMessage)
        ? nextMessage.isFromUser === message.isFromUser
        : false;

    let marginBottom = isNextSameUser ? 1 : 4;
    let marginTop = isPreviousSameUser ? 1 : 4;

    // If the message is the first in the list, we don't want to have a margin top
    if (!previousMessage || isMessageDateHeader(previousMessage)) {
      marginTop = 0;
    }
    // If the message is the last in the list, we don't want to have a margin bottom
    if (!nextMessage || isMessageDateHeader(nextMessage)) {
      marginBottom = 0;
    }

    return {
      marginTop,
      marginBottom,
    };
  }, [previousMessage, message.isFromUser, nextMessage]);

  const innerStyle = useMemo(() => {
    return [
      styles.container(message.isFromUser),
      message.isFromUser
        ? {
            borderTopRightRadius: nextBorderTopRadius,
            borderBottomRightRadius: nextBorderBottomRadius,
          }
        : {
            borderTopLeftRadius: nextBorderTopRadius,
            borderBottomLeftRadius: nextBorderBottomRadius,
          },
    ];
  }, [message.isFromUser, nextBorderTopRadius, nextBorderBottomRadius]);

  return {
    containerStyle,
    innerStyle,
  };
};
