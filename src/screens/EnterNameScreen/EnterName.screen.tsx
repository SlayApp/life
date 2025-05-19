import React from 'react';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';
import {OnboardingTextInput} from '~/components/OnboardingTextInput';

import {useEnterNameScreen} from './EnterName.hook';

export const EnterNameScreen: React.FC = () => {
  const {name, setName, ref} = useEnterNameScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Name your character"
        subtitle="Choose a name for your character">
        <OnboardingTextInput
          ref={ref}
          autoFocus
          value={name}
          onChangeText={setName}
          placeholder="Name"
          textAlign="center"
        />
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
