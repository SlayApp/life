import {useQuery} from '@tanstack/react-query';

import {getCharacterTypingKey} from '~/utils/getCharacterTypingKey';

export const useIsCharacterTyping = (characterId: string) => {
  const {data: isTypingData} = useQuery<boolean>({
    queryKey: getCharacterTypingKey(characterId),
    queryFn: () => false,
  });

  return !!isTypingData;
};
