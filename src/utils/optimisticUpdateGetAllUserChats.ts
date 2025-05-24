import {CharacterDto, UserChatResponseDto} from 'api-client/api';

import {messagesApi} from '~/api/api';
import {components} from '~/types/asyncapi';

import {getCacheOf, setCacheOf} from './cache/accessCacheOf';

type TArgs = {
  character: Pick<components['schemas']['CharacterRTO'], 'id'> &
    Partial<Omit<components['schemas']['CharacterRTO'], 'id'>>;
  userId: number;
  lastMessage: components['schemas']['MessageResponseDto'];
};

export const optimisticUpdateGetAllUserChats = ({
  userId,
  character,
  lastMessage,
}: TArgs) => {
  const prevChats = getCacheOf(messagesApi.getAllUserChats)(userId);

  const filtered =
    prevChats?.filter(chat => chat.character.id !== character.id) ?? [];
  const found = prevChats?.find(chat => chat.character.id === character.id);

  const newCharacter: CharacterDto = {
    id: character.id,
    name: found?.character.name ?? character.name ?? '',
    profilePicture: found?.character.profilePicture ?? character.profilePicture,
  };

  const optimisticChat: UserChatResponseDto = {
    ...found,
    character: newCharacter,
    lastMessage,
  };

  const newChats = [...filtered, optimisticChat];

  setCacheOf(messagesApi.getAllUserChats)(newChats, userId);
};
