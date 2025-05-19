import React from 'react';
import {Pressable, TextInput, View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';

import {CodeField, ResendCode} from './components';
import {useVerifyPhoneNumberScreen} from './VerifyPhoneNumber.hook';
import {styles} from './VerifyPhoneNumber.styles';

export const VerifyPhoneNumberScreen: React.FC = () => {
  const {
    code,
    ref,
    onCodeInputPress,
    onChangeText,
    loading,
    onResendCodePress,
  } = useVerifyPhoneNumberScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Confirm your phone number"
        subtitle={'Please enter the code we sent\nto +1 123 456'}>
        <View>
          <Pressable style={styles.container} onPress={onCodeInputPress}>
            <CodeField code={code} />
          </Pressable>
          <View style={styles.hiddenInput}>
            <TextInput
              autoFocus
              ref={ref}
              value={code}
              onChangeText={onChangeText}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View style={styles.resendCodeContainer}>
          <ResendCode loading={loading} onPress={onResendCodePress} />
        </View>
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
