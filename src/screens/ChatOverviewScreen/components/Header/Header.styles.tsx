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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: theme.layout.screenMarginHorizontal,
  },
  backButton: {
    height: theme.spacing[20],
    width: 20,
  },
  nameContainer: {
    width: 28,
    height: 28,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeholderButton: {
    opacity: 0,
  },
}));
