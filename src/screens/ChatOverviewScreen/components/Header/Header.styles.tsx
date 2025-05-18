import {StyleSheet} from 'react-native-unistyles';

import {CHAT_HEADER_HEIGHT} from '~/screens/ChatScreen/Chat.constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  headerContent: {
    height: CHAT_HEADER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  placeholderButton: {
    opacity: 0,
  },
});
