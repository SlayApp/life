import React from 'react';
import {View} from 'react-native';
import {KeyboardStickyView} from 'react-native-keyboard-controller';

import {KEYBOARD_OPEN_INPUT_VERTICAL_PADDING} from './Chat.constants';
import {useChat} from './Chat.hook';
import {ChatScreenProvider} from './Chat.provider';
import {styles} from './Chat.styles';
import {ChatHeader, ChatInput, ChatList} from './components';

export const ChatScreen: React.FC = () => {
  const {
    chatInputRef,
    insets,
    messages,
    listRef,
    handleSend,
    chatPartner,
    onEndReached,
  } = useChat();

  return (
    <ChatScreenProvider>
      <View style={styles.container}>
        <ChatHeader
          name={chatPartner?.name}
          profilePictureUri={chatPartner?.profilePicture}
        />
        <ChatList ref={listRef} data={messages} onEndReached={onEndReached} />
        <KeyboardStickyView
          offset={{
            opened: insets.bottom - KEYBOARD_OPEN_INPUT_VERTICAL_PADDING,
          }}>
          <View style={styles.inputContainer}>
            <ChatInput ref={chatInputRef} onSend={handleSend} />
          </View>
        </KeyboardStickyView>
      </View>
    </ChatScreenProvider>
  );
};
