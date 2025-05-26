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
  const nextMessage = messages[index - 1];
  const previousMessage = messages[index + 1];

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

  const containerStyle = useMemo(() => {
    const isPreviousSameUser =
      previousMessage?.isFromUser === message.isFromUser;
    const isNextSameUser = nextMessage?.isFromUser === message.isFromUser;

    let marginBottom = isNextSameUser ? 1 : 8;
    let marginTop = isPreviousSameUser ? 1 : 8;

    // If the message is the first in the list, we don't want to have a margin top
    if (!previousMessage) {
      marginTop = 0;
    }
    // If the message is the last in the list, we don't want to have a margin bottom
    if (!nextMessage) {
      marginBottom = 0;
    }

    return {
      marginTop,
      marginBottom,
    };
  }, [message, previousMessage, nextMessage]);

  const innerStyle = useMemo(() => {
    return [
      styles.container(message.isFromUser),
      {
        borderTopRightRadius: nextBorderTopRightRadius,
        borderBottomRightRadius: nextBorderBottomRightRadius,
      },
    ];
  }, [
    nextBorderTopRightRadius,
    nextBorderBottomRightRadius,
    message.isFromUser,
  ]);

  return (
    <View style={containerStyle}>
      <Animated.View style={innerStyle}>
        <Text
          variant="body"
          color={message.isFromUser ? 'inverted' : 'primary'}>
          {message.content}
        </Text>
      </Animated.View>
    </View>
  );
};
