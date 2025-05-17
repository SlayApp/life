import {useRootStackContainer} from '~/navigation/RootStack/RootStack.provider';

export const useUpdateUser = () => {
  const {setUser} = useRootStackContainer();

  return setUser;
};
