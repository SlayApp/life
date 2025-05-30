import {UserChatResponseDto} from 'api-client';
import {View} from 'react-native';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';

import {styles} from './ChatOverview.styles';

export const keyExtractor = (item: UserChatResponseDto) =>
  item.character.id.toString();

export const ListRenderItemSeparator = () => <View style={styles.separator} />;

export const ListHeaderComponent = () => <SafeAreaWrapper edges="top" />;

export const sortChats = (chats: UserChatResponseDto[] | undefined) =>
  chats?.sort((a, b) =>
    b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt),
  ) ?? [];
