import {useCallback, useMemo, useRef, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createContainer} from 'unstated-next';

import {IScreenHeader} from '~/components/ScreenHeader/ScreenHeader.types';
import {noop} from '~/utils/noop';

const useFluidOnboarding = () => {
  const insets = useSafeAreaInsets();
  const onPress = useRef<() => void>(noop);
  const onBackPress = useRef<() => void>(noop);
  const buttonLabel = useSharedValue('Next');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const keyboardVerticalOffset = -insets.bottom + 16;

  const hiddenTextInputRef = useRef<TextInput>(null);
  const [inputMode, setInputMode] = useState<TextInputProps['inputMode']>();
  const [autoComplete, setAutoComplete] =
    useState<TextInputProps['autoComplete']>();

  const focusTextInput = useCallback(
    (
      nextInputMode: TextInputProps['inputMode'],
      nextAutoComplete: TextInputProps['autoComplete'],
    ) => {
      setInputMode(nextInputMode);
      setAutoComplete(nextAutoComplete);
      hiddenTextInputRef.current?.focus();
    },
    [],
  );

  const onPressHandler = useCallback(() => {
    onPress.current();
  }, []);

  const onBackPressHandler = useCallback(() => {
    onBackPress.current();
  }, []);

  const header: IScreenHeader = useMemo(
    () => ({
      leftAction: {
        name: 'chevron.left',
        onPress: onBackPressHandler,
      },
    }),
    [onBackPressHandler],
  );

  return useMemo(() => {
    return {
      header,
      inputMode,
      autoComplete,
      hiddenTextInputRef,
      setDisabled,
      setLoading,
      onPressHandler,
      onBackPressHandler,
      onPress,
      onBackPress,
      buttonLabel,
      disabled,
      loading,
      focusTextInput,
      keyboardVerticalOffset,
    };
  }, [
    header,
    inputMode,
    autoComplete,
    onPressHandler,
    onBackPressHandler,
    buttonLabel,
    disabled,
    loading,
    focusTextInput,
    keyboardVerticalOffset,
  ]);
};

const Container = createContainer(useFluidOnboarding);
export const FluidOnboardingStackProvider = Container.Provider;
export const useFluidOnboardingStack = Container.useContainer;
