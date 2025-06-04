import {MessageResponseDto} from 'api-client/api';

export const areMessagesGrouped = (
  current: Pick<MessageResponseDto, 'isFromUser'>,
  next: Pick<MessageResponseDto, 'isFromUser'> | undefined,
) => {
  'worklet';

  if (!next) {
    return false;
  }

  return current.isFromUser === next.isFromUser;
};
