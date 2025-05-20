import React, {useMemo} from 'react';
import {View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';

import {GenderItem} from './components';
import {GENDER_ITEMS} from './SelectGender.constants';
import {useSelectGender} from './SelectGender.hook';
import {styles} from './SelectGender.styles';

export const SelectGenderScreen: React.FC = () => {
  const {selectedGender, setSelectedGender} = useSelectGender();

  const itemsMarkup = useMemo(
    () =>
      GENDER_ITEMS.map(item => (
        <GenderItem
          id={item}
          selected={selectedGender === item}
          key={item}
          title={item}
          onPress={setSelectedGender}
        />
      )),
    [selectedGender, setSelectedGender],
  );

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="What is your gender?"
        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr">
        <View style={styles.genderContainer}>{itemsMarkup}</View>
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
