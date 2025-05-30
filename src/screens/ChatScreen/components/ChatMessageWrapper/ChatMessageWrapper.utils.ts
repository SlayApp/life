import {TMessage} from '../../Chat.types';

export const areMessagesGrouped = (
  current: Pick<TMessage, 'isFromUser'>,
  next: Pick<TMessage, 'isFromUser'> | undefined,
) => {
  'worklet';

  if (!next) {
    return false;
  }

  return current.isFromUser === next.isFromUser;
};
