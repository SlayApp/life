import {useNavigation} from '@react-navigation/native';
import {ListRenderItem} from '@shopify/flash-list';
import {UserChatResponseDto} from 'api-client';
import {useCallback} from 'react';
import {useWindowDimensions} from 'react-native';

import {messagesApi} from '~/api/api';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {useAPIRequestWithOptions} from '~/hooks/useAPIRequestWithOptions';
import {useUser} from '~/hooks/useUser';

import {sortChats} from './ChatOverview.helpers';
import {Item} from './components';

export const useChatOverview = () => {
  const window = useWindowDimensions();
  const user = useUser();
  const {data: chats} = useAPIRequestWithOptions(
    messagesApi.getAllUserChats,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: 'always',
      refetchOnMount: 'always',
      select: sortChats,
    },
    user.id,
  );
  const {navigate} = useNavigation();

  const onPressHandler = useCallback(
    (id: string) => {
      navigate(EAuthorizedStack.Chat, {id});
    },
    [navigate],
  );

  const renderItem: ListRenderItem<UserChatResponseDto> = useCallback(
    ({item}) => (
      <Item
        id={item.character.id}
        onPress={onPressHandler}
        name={item.character.name}
        message={item.lastMessage}
        hasUnreadMessages={false}
        profilePictureUri={item.character.profilePicture}
      />
    ),
    [onPressHandler],
  );

  return {chats, window, renderItem};
};
