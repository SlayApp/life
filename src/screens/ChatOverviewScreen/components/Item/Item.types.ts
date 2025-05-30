import {MessageResponseDto} from 'api-client/api';

export interface IItemProps {
  name: string;
  message: MessageResponseDto;
  profilePictureUri?: string;
  id: string;
  onPress: (id: string) => void;
}
