import {StyleSheet} from 'react-native-unistyles';

import {LIST_VERTICAL_PADDING} from '../../Chat.constants';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: LIST_VERTICAL_PADDING,
  },
  listSeperatorComponent: {
    height: 8,
  },
});
