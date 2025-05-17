import {StyleSheet} from 'react-native-unistyles';

import {SEND_MESSAGE_BUTTON_SIZE} from '../../Chat.constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00B3FF',
    height: SEND_MESSAGE_BUTTON_SIZE,
    width: SEND_MESSAGE_BUTTON_SIZE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
});
