import {StyleSheet} from 'react-native-unistyles';

import {CHAT_HEADER_HEIGHT} from '../ChatScreen/Chat.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    paddingTop: CHAT_HEADER_HEIGHT + 16,
    paddingHorizontal: 20,
  },
  separator: {
    height: 20,
  },
});
