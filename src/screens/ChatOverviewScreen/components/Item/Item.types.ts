import {MessageResponseDto} from 'api-client';

export interface IItemProps {
  name: string;
  message: MessageResponseDto;
  profilePictureUri?: string;
  id: string;
  hasUnreadMessages: boolean;
  onPress: (id: string) => void;
}
