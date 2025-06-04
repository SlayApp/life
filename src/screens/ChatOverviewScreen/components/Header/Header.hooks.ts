import {useCallback} from 'react';

import {useDeleteUser} from '~/hooks/useDeleteUser';
import {useScrollBottomBorderTransition} from '~/hooks/useScrollBottomBorderTransition';
import {useUser} from '~/hooks/useUser';

import {IHeaderProps} from './Header.types';

export const useHeader = ({scrollOffset}: IHeaderProps) => {
  const user = useUser();
  const logOut = useDeleteUser();
  const animatedStyle = useScrollBottomBorderTransition(scrollOffset);

  const onPress = useCallback(() => {
    logOut();
  }, [logOut]);

  return {user, onPress, animatedStyle};
};
