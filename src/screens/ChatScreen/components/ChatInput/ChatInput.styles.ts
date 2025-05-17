import {StyleSheet} from 'react-native-unistyles';

import {
  HEIGHT_ONE_LINE,
  INPUT_VERTICAL_PADDING,
  KEYBOARD_OPEN_INPUT_VERTICAL_PADDING,
  LINE_HEIGHT,
  SEND_MESSAGE_BUTTON_SIZE,
} from '../../Chat.constants';

export const styles = StyleSheet.create({
  blurView: {
    flex: 1,
    paddingTop: KEYBOARD_OPEN_INPUT_VERTICAL_PADDING,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  container: {
    flex: 1,
  },
  safeArea: {
    marginHorizontal: 20,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    transformOrigin: 'bottom',
    opacity: 0,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ECE9EC',
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    transformOrigin: 'bottom',
    borderRadius: LINE_HEIGHT,
  },
  input: {
    paddingVertical: INPUT_VERTICAL_PADDING,
    fontSize: 16,
    flex: 1,
    fontFamily: 'SF-Pro-Rounded-Medium',
    lineHeight: LINE_HEIGHT,
  },
  sendButtonContainer: {
    right: (HEIGHT_ONE_LINE - SEND_MESSAGE_BUTTON_SIZE) / 2,
    bottom: (HEIGHT_ONE_LINE - SEND_MESSAGE_BUTTON_SIZE) / 2,
  },
});
