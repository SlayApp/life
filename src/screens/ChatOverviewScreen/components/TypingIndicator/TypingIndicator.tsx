import React from 'react';
import {View} from 'react-native';

import {TypingIndicatorDots} from '~/components/TypingIndicatorDots/TypingIndicatorDots';

import {styles} from './TypingIndicator.styles';

interface IProps {
  size?: number;
}

export const TypingIndicator: React.FC<IProps> = ({size}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TypingIndicatorDots size={size} />
      </View>
    </View>
  );
};
