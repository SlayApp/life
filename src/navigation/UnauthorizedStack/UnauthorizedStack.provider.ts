import {useCallback, useRef} from 'react';
import {createContainer} from 'unstated-next';

const useContainer = () => {
  const phoneNumber = useRef<string | null>(null);

  const setPhoneNumber = useCallback((incomingPhoneNumber: string) => {
    phoneNumber.current = incomingPhoneNumber;
  }, []);

  return {
    phoneNumber,
    setPhoneNumber,
  };
};

const Container = createContainer(useContainer);
export const UnauthorizedStackProvider = Container.Provider;
export const useUnauthorizedStack = Container.useContainer;
