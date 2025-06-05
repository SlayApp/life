import {isMessageDateHeader, isTypingMessage, TMessage} from '../../Chat.types';

export const getItemType = (item: TMessage) => {
  if (isMessageDateHeader(item)) {
    return 'date-header';
  }

  if (isTypingMessage(item)) {
    return 'typing-message';
  }

  return 'message';
};
