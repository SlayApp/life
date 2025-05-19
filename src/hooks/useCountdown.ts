import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef, useState} from 'react';

interface UseCountdownOptions {
  autoStart?: boolean;
}

type UseCountdownReturn = {
  secondsLeft: number;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  reset: (newSeconds?: number) => void;
};

export function useCountdown(
  initialSeconds: number,
  onFinish?: () => void,
  {autoStart = true}: UseCountdownOptions = {},
): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setSecondsLeft(prev => (prev <= 1 ? 0 : prev - 1));
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);

  const resume = useCallback(() => {
    if (secondsLeft > 0) setIsPaused(false);
  }, [secondsLeft]);

  const reset = useCallback(
    (newSeconds: number = initialSeconds) => {
      clear();
      setSecondsLeft(newSeconds);
      setIsPaused(false);
    },
    [initialSeconds, clear],
  );

  useFocusEffect(
    useCallback(() => {
      if (isPaused || secondsLeft === 0) {
        clear();

        return;
      }

      if (!intervalRef.current) {
        intervalRef.current = setInterval(tick, 1_000);
      }

      return clear;
    }, [isPaused, secondsLeft, tick, clear]),
  );

  useFocusEffect(
    useCallback(() => {
      if (secondsLeft === 0) {
        clear();
        onFinish?.();
      }
    }, [secondsLeft, clear, onFinish]),
  );

  return {secondsLeft, isPaused, pause, resume, reset};
}
