import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    width: theme.screen.width,
    height: theme.screen.height,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 999,
  },
  textInputContainer: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 50,
    height: 50,
  },
  full: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 999,
  },
  keyboardAvoidView: {
    marginHorizontal: 24,
  },
}));
