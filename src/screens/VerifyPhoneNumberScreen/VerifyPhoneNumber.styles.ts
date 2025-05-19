import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  resendCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
}));
