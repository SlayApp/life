import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {MessageResponseDto} from 'api-client/api';
import React, {forwardRef, useCallback} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {useAnimatedScrollHandler} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {KeyboardAvoidingView} from '~/components/KeyboardAvoidingView';

import {KEYBOARD_OPEN_INPUT_VERTICAL_PADDING} from '../../Chat.constants';
import {useChatScreenContainer} from '../../Chat.provider';
import {ChatMessage} from '../ChatMessage/ChatMessage';
import {
  AnimatedFlashList,
  keyExtractor,
  ListFooterComponent,
  ListHeaderComponent,
} from './ChatList.helper';
import {styles} from './ChatList.styles';
import {IChatListProps} from './ChatList.type';

export const ChatList = forwardRef<
  FlashList<MessageResponseDto>,
  IChatListProps
>(({data, onEndReached}, ref) => {
  const {scrollOffset} = useChatScreenContainer();
  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();
  const keyboardVerticalOffset =
    -insets.bottom + KEYBOARD_OPEN_INPUT_VERTICAL_PADDING;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  const renderItem: ListRenderItem<MessageResponseDto> = useCallback(
    ({item, index}) => {
      return <ChatMessage messages={data} message={item} index={index} />;
    },
    [data],
  );

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={windowDimensions}>
        <AnimatedFlashList
          inverted
          ref={ref}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          onScroll={scrollHandler}
          onEndReached={onEndReached}
          ListHeaderComponent={<ListFooterComponent />}
          ListFooterComponent={<ListHeaderComponent />}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
        />
      </View>
    </KeyboardAvoidingView>
  );
});
