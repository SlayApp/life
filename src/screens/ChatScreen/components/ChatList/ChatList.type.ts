import {MessageResponseDto} from 'api-client/api';

export interface IChatListProps {
  data: MessageResponseDto[];
  onEndReached: () => void;
}
