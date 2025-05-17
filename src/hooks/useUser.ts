import {useUserProvider} from '~/navigation/AuthorizedStack/AuthorizedStack.provider';

export const useUser = () => {
  const {user} = useUserProvider();

  return user;
};
