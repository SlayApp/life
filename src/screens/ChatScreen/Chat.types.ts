import {MessageResponseDto} from 'api-client/api';

export type TSyntheticTypingMessage = {
  id: 'typing-indicator';
  isFromUser: false;
  deduplicationId: string;
};

export type TMessage = MessageResponseDto | TSyntheticTypingMessage;

export const isTypingMessage = (
  message: TMessage,
): message is TSyntheticTypingMessage => {
  return message.id === 'typing-indicator';
};

export const isMessage = (message: TMessage): message is MessageResponseDto => {
  return message.id !== 'typing-indicator';
};
