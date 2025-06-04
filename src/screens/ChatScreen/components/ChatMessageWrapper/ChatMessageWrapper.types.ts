import {MessageResponseDto} from 'api-client/api';
import {ViewStyle} from 'react-native';
import {AnimatedStyle} from 'react-native-reanimated';

import {TMessage} from '../../Chat.types';

export interface IChatMessageWrapperProps {
  message: Pick<MessageResponseDto, 'isFromUser' | 'id'>;
  index: number;
  messages: TMessage[];
  animatedStyle?: AnimatedStyle<ViewStyle>;
}
