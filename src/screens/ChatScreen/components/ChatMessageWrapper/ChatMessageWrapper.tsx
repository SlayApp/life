import {View} from 'react-native';
import Animated from 'react-native-reanimated';

import {TFCWithChildren} from '~/types/TFCWithChildren';

import {useChatMessageWrapper} from './ChatMessageWrapper.hook';
import {styles} from './ChatMessageWrapper.styles';
import {IChatMessageWrapperProps} from './ChatMessageWrapper.types';

export const ChatMessageWrapper: TFCWithChildren<IChatMessageWrapperProps> = ({
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
