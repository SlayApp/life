import React from 'react';
import {View} from 'react-native';

import {styles} from './OnboardingFooterPadding.styles';

export const OnboardingFooterPadding: React.FC = () => {
  return <View collapsable={false} style={styles.container} />;
};
