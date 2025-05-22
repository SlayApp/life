import {StyleSheet} from 'react-native-unistyles';

import {CHAT_HEADER_HEIGHT} from '../ChatScreen/Chat.constants';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainerStyle: {
    paddingTop: CHAT_HEADER_HEIGHT + theme.spacing[16],
    paddingHorizontal: theme.layout.screenMarginHorizontal,
  },
  separator: {
    height: theme.spacing[28],
  },
}));
