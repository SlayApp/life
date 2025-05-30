import {StyleProp, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import {TFCWithChildren} from '~/types/TFCWithChildren';

import {TMessage} from '../../Chat.types';
import {useChatMessageWrapper} from './ChatMessageWrapper.hook';
import {styles} from './ChatMessageWrapper.styles';

interface IProps {
  message: TMessage;
  index: number;
  messages: TMessage[];
  animatedStyle?: StyleProp<ViewStyle>;
}

export const ChatMessageWrapper: TFCWithChildren<IProps> = ({
  children,
  animatedStyle,
  ...props
}) => {
  const {containerStyle, innerStyle} = useChatMessageWrapper(props);

  return (
    <View style={containerStyle}>
      <Animated.View style={[innerStyle, animatedStyle]}>
        <View style={styles.inner}>{children}</View>
      </Animated.View>
    </View>
  );
};
