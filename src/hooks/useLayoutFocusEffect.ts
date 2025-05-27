import {useIsFocused} from '@react-navigation/native';
import {DependencyList, useLayoutEffect} from 'react';

export const useLayoutFocusEffect = (
  effectInner: () => void,
  deps: DependencyList,
) => {
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (!isFocused) {
      return;
    }

    effectInner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, isFocused]);
};
