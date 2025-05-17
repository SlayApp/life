import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  findNodeHandle,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import NativeTextInputHelpers from 'specs/NativeTextInputHelpers';

import {SafeAreaWrapper} from '../../../../components/SafeAreaWrapper';
import {LINE_HEIGHT} from '../../Chat.constants';
import {useChatScreenContainer} from '../../Chat.provider';
import {ChatSendMessageButton} from '../ChatSendMessageButton';
import {AnimatedBlurView, AnimatedTextInput} from './ChatInput.helper';
import {styles} from './ChatInput.styles';

export interface IChatInputRef {
  getMessage: () => string;
}

export interface IChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = memo(
  forwardRef<IChatInputRef, IChatInputProps>(({onSend}, ref) => {
    const textInputRef = useRef<TextInput>(null);
    const {height} = useWindowDimensions();
    const [message, setMessage] = useState('');
    const {currentNumberOfLines, currentInputHeight} = useChatScreenContainer();
    const showSendButton = message.trim().length > 0;

    useImperativeHandle(ref, () => ({
      getMessage: () => message,
    }));

    const onSendPress = useCallback(async () => {
      if (message.trim() === '') return;
      const handle = findNodeHandle(textInputRef.current);
      const value = handle
        ? await NativeTextInputHelpers.clearText(handle)
        : '';

      if (value.trim() === '') return;

      onSend(value.trim());
    }, [message, onSend]);

    const onContentSizeChange = useCallback(
      (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        currentNumberOfLines.value = Math.ceil(
          event.nativeEvent.contentSize.height / LINE_HEIGHT,
        );
      },
      [currentNumberOfLines],
    );

    const onLayout = useCallback(
      (event: LayoutChangeEvent) => {
        currentInputHeight.value = event.nativeEvent.layout.height;
      },
      [currentInputHeight],
    );

    return (
      <AnimatedBlurView
        onLayout={onLayout}
        intensity={90}
        tint="light"
        style={styles.blurView}>
        <SafeAreaWrapper style={styles.safeArea} edges="bottom">
          <Animated.View style={styles.inputContainer}>
            <AnimatedTextInput
              ref={textInputRef}
              multiline
              placeholder="Message"
              placeholderTextColor="#D0CDD0"
              value={message}
              onContentSizeChange={onContentSizeChange}
              onChangeText={setMessage}
              style={[styles.input, {maxHeight: height * 0.2}]}
            />
            <View style={styles.sendButtonContainer}>
              <ChatSendMessageButton
                show={showSendButton}
                onPress={onSendPress}
              />
            </View>
          </Animated.View>
        </SafeAreaWrapper>
      </AnimatedBlurView>
    );
  }),
);
