import React from 'react';
import {View} from 'react-native';

import {TypingIndicatorDots} from '~/components/TypingIndicatorDots/TypingIndicatorDots';

import {styles} from './TypingIndicator.styles';

export const TypingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TypingIndicatorDots />
      </View>
    </View>
  );
};
