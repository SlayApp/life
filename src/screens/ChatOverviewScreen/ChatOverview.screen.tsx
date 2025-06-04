import React from 'react';
import {View} from 'react-native';

import {
  AnimatedFlashList,
  keyExtractor,
  ListHeaderComponent,
  ListRenderItemSeparator,
} from './ChatOverview.helpers';
import {useChatOverview} from './ChatOverview.hook';
import {styles} from './ChatOverview.styles';
import {Header} from './components';

export const ChatOverviewScreen: React.FC = () => {
  const {chats, window, renderItem, onScroll, scrollOffset} = useChatOverview();

  return (
    <View style={styles.container}>
      <Header scrollOffset={scrollOffset} />
      <AnimatedFlashList
        data={chats}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ListRenderItemSeparator}
        keyExtractor={keyExtractor}
        estimatedItemSize={100}
        estimatedListSize={window}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};
