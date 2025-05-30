import {queryClient} from './cache/queryClient';
import {getCharacterTypingKey} from './getCharacterTypingKey';

export const setIsCharacterTyping = (
  characterId: string,
  isTyping: boolean,
) => {
  queryClient.setQueryData(getCharacterTypingKey(characterId), isTyping);
};
