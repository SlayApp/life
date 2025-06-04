import React from 'react';
import Animated from 'react-native-reanimated';

import {useTypingIndicatorDot} from './TypingIndicatorDot.hook';
import {styles} from './TypingIndicatorDot.styles';
import {ITypingIndicatorDotProps} from './TypingIndicatorDot.types';

export const TypingIndicatorDot: React.FC<ITypingIndicatorDotProps> = ({
  size = 8,
  ...rest
}) => {
  const {animatedStyle} = useTypingIndicatorDot(rest);

  return <Animated.View style={[animatedStyle, styles.container(size)]} />;
};
