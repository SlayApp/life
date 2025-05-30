import {randomUUID} from 'expo-crypto';

import {TSyntheticTypingMessage} from '../../Chat.types';

export const TYPING_INDICATOR_ITEM: TSyntheticTypingMessage = {
  id: 'typing-indicator',
  isFromUser: false,
  deduplicationId: randomUUID(),
};
