import {View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';
import {OnboardingTextInput} from '~/components/OnboardingTextInput';

import {AddButton} from './components';
import {InterestList} from './components/InterestList/InterestList';
import {useSelectInterestsScreen} from './SelectInterests.hook';

export const SelectInterestsScreen: React.FC = () => {
  const {
    ref,
    theme,
    onAddInterestPress,
    interests,
    setInterest,
    interest,
    validInterest,
    onRemoveInterestPress,
  } = useSelectInterestsScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Add your interest"
        subtitle="Enter at least 3 interests">
        <View style={{justifyContent: 'center'}}>
          <OnboardingTextInput
            ref={ref}
            placeholder="Taylor Swift"
            textAlign="center"
            value={interest}
            onChangeText={setInterest}
            placeholderTextColor={theme.colors.subdued80}
          />
          {validInterest ? (
            <View style={{position: 'absolute', zIndex: 99, right: 8}}>
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
