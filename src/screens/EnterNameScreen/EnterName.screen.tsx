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
        title="What's your name?"
        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr">
        <OnboardingTextInput
          ref={ref}
          initialValue={name}
          onChangeText={setName}
          placeholder="Name"
          textAlign="center"
          autoComplete="given-name"
          inputMode="text"
        />
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
