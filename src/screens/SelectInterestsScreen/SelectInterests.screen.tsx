import {View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';
import {OnboardingTextInput} from '~/components/OnboardingTextInput';

import {AddButton} from './components';
import {InterestList} from './components/InterestList/InterestList';
import {useSelectInterestsScreen} from './SelectInterests.hook';
import {styles} from './SelectInterests.styles';

export const SelectInterestsScreen: React.FC = () => {
  const {
    ref,
    theme,
    onAddInterestPress,
    interests,
    setInterest,
    validInterest,
    onRemoveInterestPress,
  } = useSelectInterestsScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Add your interest"
        subtitle="Enter at least 3 interests">
        <View style={styles.innerContainer}>
          <OnboardingTextInput
            ref={ref}
            placeholder="Taylor Swift"
            textAlign="center"
            onChangeText={setInterest}
            placeholderTextColor={theme.colors.subdued80}
          />
          {validInterest ? (
            <View style={styles.buttonContainer}>
              <AddButton onPress={onAddInterestPress} />
            </View>
          ) : null}
        </View>
        <InterestList
          onRemoveInterestPress={onRemoveInterestPress}
          interests={interests}
        />
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
