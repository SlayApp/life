import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';

import {
  keyExtractor,
  ListHeaderComponent,
  ListRenderItemSeparator,
} from './ChatOverview.helpers';
import {useChatOverview} from './ChatOverview.hook';
import {styles} from './ChatOverview.styles';
import {Header} from './components';

export const ChatOverviewScreen: React.FC = () => {
  const {chats, window, renderItem} = useChatOverview();

  return (
    <View style={styles.container}>
      <Header />
      <FlashList
        data={chats}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ListRenderItemSeparator}
        keyExtractor={keyExtractor}
        estimatedItemSize={100}
        estimatedListSize={window}
      />
    </View>
  );
};
