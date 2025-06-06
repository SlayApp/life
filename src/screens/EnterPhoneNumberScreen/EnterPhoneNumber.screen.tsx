import {Text as RNText, View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';
import {OnboardingTextInput} from '~/components/OnboardingTextInput';
import {styles as onboardingTextInputStyles} from '~/components/OnboardingTextInput/OnboardingTextInput.styles';
import {Text} from '~/components/Text';
import {WhiteOnWhiteShadow} from '~/components/WhiteOnWhiteShadow/WhiteOnWhiteShadow';

import {useEnterPhoneNumberScreen} from './EnterPhoneNumber.hook';
import {styles} from './EnterPhoneNumber.styles';

export const EnterPhoneNumberScreen: React.FC = () => {
  const {onChangeText, countryCode, ref} = useEnterPhoneNumberScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Enter your phone number"
        subtitle={"We'll send a verification code\nto this phone number"}>
        <View style={styles.container}>
          <WhiteOnWhiteShadow
            style={[
              onboardingTextInputStyles.container,
              styles.countryCodeWrapperOverride,
            ]}>
            <View style={styles.countryCodeContainer}>
              <RNText>{countryCode.flag}</RNText>
              <Text variant="h3">{countryCode.dial_code}</Text>
            </View>
          </WhiteOnWhiteShadow>
          <View style={styles.inputContainer}>
            <OnboardingTextInput
              ref={ref}
              onChangeText={onChangeText}
              placeholder="123 456 789"
              inputMode="tel"
              autoComplete="tel"
            />
          </View>
        </View>
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
