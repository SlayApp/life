import {useIsTypingStore} from '~/stores/useIsTyping';

export const useIsCharacterTyping = (characterId: string) => {
  return useIsTypingStore(s => s.getIsTyping(characterId));
};
