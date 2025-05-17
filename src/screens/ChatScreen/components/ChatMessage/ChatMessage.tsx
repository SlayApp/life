import {MessageResponseDto} from 'api-client/api';
import {useMemo} from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

import {Text} from '~/components/Text';

import {styles} from './ChatMessage.styles';
import {areMessagesGrouped} from './ChatMessage.utils';

interface IProps {
  message: MessageResponseDto;
  index: number;
  messages: MessageResponseDto[];
}

export const ChatMessage: React.FC<IProps> = ({message, index, messages}) => {
  const nextMessage: MessageResponseDto | undefined = messages[index - 1];
  const previousMessage: MessageResponseDto | undefined = messages[index + 1];

  const nextBorderTopRightRadius = useMemo(() => {
    if (areMessagesGrouped(message, previousMessage)) {
      return 4;
    }

    return 16;
  }, [message, previousMessage]);

  const nextBorderBottomRightRadius = useMemo(() => {
    if (areMessagesGrouped(message, nextMessage)) {
      return 4;
    }

    return 16;
  }, [message, nextMessage]);

  return (
    <View
      style={{
        marginTop: previousMessage && previousMessage?.isFromUser ? 1 : 8,
        marginBottom: nextMessage && nextMessage?.isFromUser ? 1 : 8,
      }}>
      <Animated.View
        style={[
          styles.container(message.isFromUser),
          {
            borderTopRightRadius: nextBorderTopRightRadius,
            borderBottomRightRadius: nextBorderBottomRightRadius,
          },
        ]}>
        <Text
          variant="body"
          color={message.isFromUser ? 'inverted' : 'primary'}>
          {message.content}
        </Text>
      </Animated.View>
    </View>
  );
};
