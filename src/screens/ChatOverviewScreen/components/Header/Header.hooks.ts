import {useActionSheet} from '@expo/react-native-action-sheet';
import {useCallback} from 'react';

import {useDeleteUser} from '~/hooks/useDeleteUser';
import {useScrollBottomBorderTransition} from '~/hooks/useScrollBottomBorderTransition';
import {useUser} from '~/hooks/useUser';

import {IHeaderProps} from './Header.types';

const options = ['Delete account', 'Cancel'];
const destructiveButtonIndex = 0;
const cancelButtonIndex = 1;

export const useHeader = ({scrollOffset}: IHeaderProps) => {
  const user = useUser();
  const deleteAccount = useDeleteUser();
  const animatedStyle = useScrollBottomBorderTransition(scrollOffset);
  const {showActionSheetWithOptions} = useActionSheet();

  const onPress = useCallback(() => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      selectedIndex => {
        if (selectedIndex === destructiveButtonIndex) {
          deleteAccount();

          return;
        }
      },
    );
  }, [deleteAccount, showActionSheetWithOptions]);

  return {user, onPress, animatedStyle};
};
