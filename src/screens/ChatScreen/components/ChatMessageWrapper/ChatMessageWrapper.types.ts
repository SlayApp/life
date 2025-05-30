import {TMessage} from '../../Chat.types';

export interface IChatMessageWrapperProps {
  message: Pick<TMessage, 'isFromUser' | 'id'>;
  index: number;
  messages: Pick<TMessage, 'isFromUser' | 'id'>[];
}
