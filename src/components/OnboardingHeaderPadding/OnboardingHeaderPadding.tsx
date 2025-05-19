import React from 'react';
import {View} from 'react-native';

import {styles} from './OnboardingHeaderPadding.styles';

export const OnboardingHeaderPadding: React.FC = () => {
  return <View collapsable={false} style={styles.container} />;
};
