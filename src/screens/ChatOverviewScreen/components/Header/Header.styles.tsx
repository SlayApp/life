import {StyleSheet} from 'react-native-unistyles';

import {CHAT_HEADER_HEIGHT} from '~/screens/ChatScreen/Chat.constants';

export const styles = StyleSheet.create(theme => ({
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
    paddingHorizontal: theme.layout.screenMarginHorizontal,
    justifyContent: 'space-between',
  },
  backButton: {
    height: theme.spacing[20],
    width: 20,
  },
  nameContainer: {
    width: 28,
    height: 28,
    backgroundColor: '#000',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderButton: {
    opacity: 0,
  },
}));
