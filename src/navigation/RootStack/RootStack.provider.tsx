import {UserResponseDto} from 'api-client/api';
import {useMemo, useState} from 'react';
import {createContainer} from 'unstated-next';

const useContainer = () => {
  const [user, setUser] = useState<UserResponseDto | null>(null);

  return useMemo(() => ({user, setUser}), [user]);
};

const Container = createContainer(useContainer);
export const RootStackProvider = Container.Provider;
export const useRootStackContainer = Container.useContainer;
