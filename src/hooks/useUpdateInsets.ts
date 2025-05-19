import {useLayoutEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UnistylesRuntime} from 'react-native-unistyles';

export const useUpdateInsets = () => {
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    UnistylesRuntime.updateTheme('main', prev => ({
      ...prev,
      insets: {
        ...prev.insets,
        top: insets.top,
        bottom: insets.bottom,
        left: insets.left,
        right: insets.right,
      },
    }));
  }, [insets]);
};
