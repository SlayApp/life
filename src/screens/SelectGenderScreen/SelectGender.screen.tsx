import React, {useMemo} from 'react';
import {View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';

import {GenderItem} from './components';
import {GENDER_ITEMS} from './SelectGender.constants';
import {useSelectGender} from './SelectGender.hook';
import {styles} from './SelectGender.styles';

export const SelectGenderScreen: React.FC = () => {
  const {selectedGenderIndex, setSelectedGenderIndex} = useSelectGender();

  const itemsMarkup = useMemo(
    () =>
      GENDER_ITEMS.map((item, index) => (
        <GenderItem
          selected={selectedGenderIndex === index}
          key={item}
          title={item}
          onPress={setSelectedGenderIndex}
          index={index}
        />
      )),
    [selectedGenderIndex, setSelectedGenderIndex],
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
