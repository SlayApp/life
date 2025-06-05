// useOnAppOpen.ts
import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

/**
 * useOnAppOpen
 * Runs `callback` whenever the app enters the "active" state
 * (user returns from the background).
 */
export function useOnAppOpen(callback: () => void) {
  const lastState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleChange = (nextState: AppStateStatus) => {
      if (
        lastState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        callback();
      }
      lastState.current = nextState;
    };

    const sub = AppState.addEventListener('change', handleChange);

    return () => sub.remove();
  }, [callback]);
}
