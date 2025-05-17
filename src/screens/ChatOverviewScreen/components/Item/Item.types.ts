export interface IItemProps {
  name: string;
  lastMessage: string;
  lastMessageCreatedAt: string;
  isLastMessageFromUser: boolean;
  profilePictureUri?: string;
  id: number;
  onPress: (id: number) => void;
}
