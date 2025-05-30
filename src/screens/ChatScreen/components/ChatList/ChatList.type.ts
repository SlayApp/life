import {TMessage} from '../../Chat.types';

export interface IChatListProps {
  data: TMessage[];
  isChatPartnerTyping: boolean;
  onEndReached: () => void;
}
