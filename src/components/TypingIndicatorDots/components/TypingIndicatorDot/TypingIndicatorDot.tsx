import React from 'react';
import Animated from 'react-native-reanimated';

import {useTypingIndicatorDot} from './TypingIndicatorDot.hook';
import {styles} from './TypingIndicatorDot.styles';
import {ITypingIndicatorDotProps} from './TypingIndicatorDot.types';

export const TypingIndicatorDot: React.FC<ITypingIndicatorDotProps> = props => {
  const {animatedStyle} = useTypingIndicatorDot(props);

  return <Animated.View style={[animatedStyle, styles.container]} />;
};
