import {useEffect} from 'react';

import {useIsFirstRender} from './useIsFirstRender';

/**
 * This hook is used to run a callback after the first render.
 */
export const useAfterFirstRenderEffect = (callback: () => void) => {
  const firstRender = useIsFirstRender();

  useEffect(() => {
    if (firstRender) {
      return;
    }

    callback();
  }, [callback, firstRender]);
};
