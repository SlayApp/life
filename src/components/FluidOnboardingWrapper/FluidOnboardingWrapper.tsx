import {View} from 'react-native';

import {TFCWithChildren} from '~/types/TFCWithChildren';

import {OnboardingFooterPadding} from '../OnboardingFooterPadding/OnboardingFooterPadding';
import {OnboardingHeaderPadding} from '../OnboardingHeaderPadding/OnboardingHeaderPadding';
import {styles} from './FluidOnboardingWrapper.styles';

export const FluidOnboardingWrapper: TFCWithChildren = ({children}) => {
  return (
    <View style={styles.container}>
      <OnboardingHeaderPadding />
      {children}
      <OnboardingFooterPadding />
    </View>
  );
};
