import {Text as RNText, View} from 'react-native';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';
import {OnboardingTextInput} from '~/components/OnboardingTextInput';
import {styles as onboardingTextInputStyles} from '~/components/OnboardingTextInput/OnboardingTextInput.styles';
import {Text} from '~/components/Text';

import {useEnterPhoneNumberScreen} from './EnterPhoneNumber.hook';
import {styles} from './EnterPhoneNumber.styles';

export const EnterPhoneNumberScreen: React.FC = () => {
  const {phoneNumber, setPhoneNumber} = useEnterPhoneNumberScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="Enter your phone number"
        subtitle={"We'll send a verification code\nto this phone number"}>
        <View style={styles.container}>
          <View style={onboardingTextInputStyles.container}>
            <View style={styles.countryCodeContainer}>
              <RNText>🇺🇸</RNText>
              <Text variant="h3">+1</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <OnboardingTextInput
              autoFocus
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="123456"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
