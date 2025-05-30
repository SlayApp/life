import {FlashList} from '@shopify/flash-list';
import React, {forwardRef} from 'react';
import {View} from 'react-native';

import {KeyboardAvoidingView} from '~/components/KeyboardAvoidingView';

import {TMessage} from '../../Chat.types';
import {
  AnimatedFlashList,
  keyExtractor,
  ListFooterComponent,
  ListHeaderComponent,
} from './ChatList.helper';
import {useChatList} from './ChatList.hook';
import {styles} from './ChatList.styles';
import {IChatListProps} from './ChatList.type';

export const ChatList = forwardRef<FlashList<TMessage>, IChatListProps>(
  (props, ref) => {
    const {
      items,
      renderItem,
      windowDimensions,
      scrollHandler,
      keyboardVerticalOffset,
    } = useChatList(props);

    return (
      <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={windowDimensions}>
          <AnimatedFlashList
            inverted
            ref={ref}
            keyExtractor={keyExtractor}
            data={items}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainerStyle}
            onScroll={scrollHandler}
            onEndReached={props.onEndReached}
            ListHeaderComponent={<ListFooterComponent />}
            ListFooterComponent={<ListHeaderComponent />}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
          />
        </View>
      </KeyboardAvoidingView>
    );
  },
);
