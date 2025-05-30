import {MessageResponseDto} from 'api-client/api';

import {Text} from '~/components/Text';

import {TMessage} from '../../Chat.types';
import {ChatMessageWrapper} from '../ChatMessageWrapper';

interface IProps {
  message: MessageResponseDto;
  index: number;
  messages: TMessage[];
}

export const ChatMessage: React.FC<IProps> = ({message, index, messages}) => {
  return (
    <ChatMessageWrapper message={message} index={index} messages={messages}>
      <Text variant="body" color={message.isFromUser ? 'inverted' : 'primary'}>
        {message.content}
      </Text>
    </ChatMessageWrapper>
  );
};
