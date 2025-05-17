import {UserChatResponseDto} from 'api-client/api';
import {View} from 'react-native';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';

import {styles} from './ChatOverview.styles';

export const keyExtractor = (item: UserChatResponseDto) =>
  item.character.id.toString();

export const ListRenderItemSeparator = () => <View style={styles.separator} />;

export const ListHeaderComponent = () => <SafeAreaWrapper edges="top" />;
