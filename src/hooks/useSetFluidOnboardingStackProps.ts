import {useFluidOnboardingStack} from '~/navigation/FluidOnboardingStack';
import {noop} from '~/utils/noop';

import {useLayoutFocusEffect} from './useLayoutFocusEffect';

type TArgs = {
  onBackPress?: () => void;
  onPress?: () => void;
  disabled?: boolean;
  buttonLabel?: string;
  loading?: boolean;
};

export const useSetFluidOnboardingStackProps = (args: TArgs) => {
  const {onBackPress, buttonLabel, setLoading, setDisabled, onPress} =
    useFluidOnboardingStack();

  useLayoutFocusEffect(() => {
    setLoading(!!args.loading);
  }, [args.loading, setLoading]);

  useLayoutFocusEffect(() => {
    buttonLabel.value = args.buttonLabel ?? 'Next';
  }, [args.buttonLabel, buttonLabel]);

  useLayoutFocusEffect(() => {
    onBackPress.current = args.onBackPress ?? noop;
  }, [args.onBackPress, onBackPress]);

  useLayoutFocusEffect(() => {
    onPress.current = args.onPress ?? noop;
  }, [args.onPress, onPress]);

  useLayoutFocusEffect(() => {
    setDisabled(!!args.disabled);
  }, [setDisabled, args.disabled]);
};
