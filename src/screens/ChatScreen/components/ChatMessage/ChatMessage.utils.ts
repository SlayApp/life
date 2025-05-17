import {MessageResponseDto} from 'api-client/api';

export const areMessagesGrouped = (
  current: MessageResponseDto,
  next: MessageResponseDto | undefined,
) => {
  'worklet';

  if (!next) {
    return false;
  }

  return current.isFromUser === next.isFromUser;
};
