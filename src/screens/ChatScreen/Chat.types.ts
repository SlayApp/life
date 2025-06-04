import {MessageResponseDto} from 'api-client';

import {DATE_HEADER_ID, TYPING_INDICATOR_ID} from './Chat.constants';

export type TMessageDateHeader = {
  id: number;
  date: string;
  deduplicationId: string;
};

export type TSyntheticTypingMessage = {
  id: number;
  isFromUser: false;
  deduplicationId: string;
};

export type TMessage =
  | MessageResponseDto
  | TSyntheticTypingMessage
  | TMessageDateHeader;

export const isTypingMessage = (
  message: TMessage,
): message is TSyntheticTypingMessage => {
  return message.id === TYPING_INDICATOR_ID;
};

export const isMessageDateHeader = (
  message: TMessage,
): message is TMessageDateHeader => {
  return message.id === DATE_HEADER_ID;
};

export const isMessage = (message: TMessage): message is MessageResponseDto => {
  return message.id !== TYPING_INDICATOR_ID;
};

export const isUserMessage = (
  message: TMessage,
): message is MessageResponseDto | TSyntheticTypingMessage => {
  return message.id !== DATE_HEADER_ID;
};
