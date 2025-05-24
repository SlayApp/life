import {useNavigation} from '@react-navigation/native';
import {ListRenderItem} from '@shopify/flash-list';
import {UserChatResponseDto} from 'api-client/api';
import {useCallback, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';

import {messagesApi} from '~/api/api';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {useAPIRequest} from '~/hooks/useAPIRequest';
import {useUser} from '~/hooks/useUser';

import {Item} from './components';

export const useChatOverview = () => {
  const window = useWindowDimensions();
  const user = useUser();
  const {data} = useAPIRequest(messagesApi.getAllUserChats, user.id);
  const chats = useMemo(
    () =>
      data?.sort((a, b) =>
        b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt),
      ) ?? [],
    [data],
  );
  const {navigate} = useNavigation();

  const onPressHandler = useCallback(
    (id: number) => {
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
        profilePictureUri={item.character.profilePicture}
      />
    ),
    [onPressHandler],
  );

  return {chats, window, renderItem};
};
