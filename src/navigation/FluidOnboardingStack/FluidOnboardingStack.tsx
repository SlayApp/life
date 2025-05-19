import React from 'react';
import {TextInput, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {Button} from '~/components/Button';
import {KeyboardAvoidingView} from '~/components/KeyboardAvoidingView';
import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {ScreenHeader} from '~/components/ScreenHeader/ScreenHeader';
import {TFCWithChildren} from '~/types/TFCWithChildren';

import {FluidOnboardingStackNavigator} from './FluidOnboardingStack.navigator';
import {
  FluidOnboardingStackProvider,
  useFluidOnboardingStack,
} from './FluidOnboardingStack.provider';
import {styles} from './FluidOnboardingStack.styles';

const FluidOnboardingStackInner: TFCWithChildren = ({children}) => {
  const {
    buttonLabel,
    onPressHandler,
    disabled,
    hiddenTextInputRef,
    autoComplete,
    inputMode,
    keyboardVerticalOffset,
    header,
  } = useFluidOnboardingStack();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ScreenHeader
          leftAction={header.leftAction}
          midAction={header.midAction}
          rightAction={header.rightAction}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          ref={hiddenTextInputRef}
          style={styles.full}
          inputMode={inputMode}
          autoComplete={autoComplete}
        />
      </View>
      {children}
      <Animated.View style={styles.buttonContainer}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardAvoidView}>
          <Button
            label={buttonLabel.value}
            disabled={disabled}
            onPress={onPressHandler}
          />
        </KeyboardAvoidingView>
        <SafeAreaWrapper edges="bottom" />
      </Animated.View>
    </View>
  );
};

export const FluidOnboardingStack: React.FC = () => {
  return (
    <FluidOnboardingStackProvider>
      <FluidOnboardingStackInner>
        <FluidOnboardingStackNavigator />
      </FluidOnboardingStackInner>
    </FluidOnboardingStackProvider>
  );
};
