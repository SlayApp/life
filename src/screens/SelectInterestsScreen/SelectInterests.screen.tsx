import {View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';

import {useSelectInterestsScreen} from './SelectInterests.hook';
import {styles} from './SelectInterests.styles';

export const SelectInterestsScreen: React.FC = () => {
  useSelectInterestsScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Name your character"
        subtitle="Choose a name for your character">
        <View style={styles.inputContainer} />
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
