import {MessageResponseDto} from 'api-client';

export interface IItemProps {
  name: string;
  message: MessageResponseDto;
  profilePictureUri?: string;
  id: string;
  onPress: (id: string) => void;
}
