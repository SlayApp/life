import {isMessageDateHeader, TMessage} from '../../Chat.types';

export const getItemType = (item: TMessage) => {
  if (isMessageDateHeader(item)) {
    return 'date-header';
  }

  return 'message';
};
