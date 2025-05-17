import {UserResponseDto} from 'api-client/api';
import {createContext, useContext} from 'react';

interface IUserContext {
  user: UserResponseDto;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = UserContext.Provider;

export const useUserProvider = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserProvider has to be used within <UserProvider>');
  }

  return context;
};
