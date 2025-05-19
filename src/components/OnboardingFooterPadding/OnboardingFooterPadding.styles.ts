import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    height:
      theme.layout.buttonHeight +
      theme.insets.bottom +
      theme.layout.buttonKeyboardOffset,
  },
}));
