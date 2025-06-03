import {randomUUID} from 'expo-crypto';

import {stringToHash} from '~/utils/stringToHash';

import {TSyntheticTypingMessage} from './Chat.types';

export const LINE_HEIGHT = 20;
export const INPUT_VERTICAL_PADDING = 8;

// This is the height of the input when it has one line of text
export const HEIGHT_ONE_LINE = LINE_HEIGHT + INPUT_VERTICAL_PADDING * 2;

export const KEYBOARD_OPEN_INPUT_VERTICAL_PADDING = 8;
export const SEND_MESSAGE_BUTTON_SIZE = 30;

export const LIST_VERTICAL_PADDING = 8;
export const CHAT_HEADER_HEIGHT = 48;

export const LIMIT = 20;

export const DATE_HEADER_ID = stringToHash('date-header');
export const TYPING_INDICATOR_ID = stringToHash('typing-indicator');

export const TYPING_INDICATOR_ITEM: TSyntheticTypingMessage = {
  id: TYPING_INDICATOR_ID,
  isFromUser: false,
  deduplicationId: randomUUID(),
};
