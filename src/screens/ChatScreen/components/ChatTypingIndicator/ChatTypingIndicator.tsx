import {View} from 'react-native';

import {TMessage, TSyntheticTypingMessage} from '../../Chat.types';
import {ChatMessageWrapper} from '../ChatMessageWrapper';
import {TypingIndicatorDot} from '../TypingIndicatorDot';
import {INDICATORS} from './ChatTypingIndicator.constants';
import {useChatTypingIndicator} from './ChatTypingIndicator.hook';
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
  const {scaleStyles, selected} = useChatTypingIndicator();

  return (
    <ChatMessageWrapper
      animatedStyle={scaleStyles}
      message={message}
      index={index}
      messages={messages}>
      <View style={styles.container}>
        {INDICATORS.map((item, index) => (
          <TypingIndicatorDot key={index} selected={selected} index={index} />
        ))}
      </View>
    </ChatMessageWrapper>
  );
};
