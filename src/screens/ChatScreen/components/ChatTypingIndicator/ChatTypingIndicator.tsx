import {View} from 'react-native';

import {TypingIndicatorDots} from '~/components/TypingIndicatorDots/TypingIndicatorDots';

import {TMessage, TSyntheticTypingMessage} from '../../Chat.types';
import {ChatMessageWrapper} from '../ChatMessageWrapper';
import {styles} from './ChatTypingIndicator.styles';

interface IProps {
  message: TSyntheticTypingMessage;
  index: number;
  messages: TMessage[];
}

export const ChatTypingIndicator: React.FC<IProps> = ({
  message,
  index,
  messages,
}) => {
  return (
    <ChatMessageWrapper message={message} index={index} messages={messages}>
      <View style={styles.container}>
        <TypingIndicatorDots />
      </View>
    </ChatMessageWrapper>
  );
};
