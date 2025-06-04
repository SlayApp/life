import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: theme.spacing['32'],
  },

  flex1: {
    flex: 1,
    marginHorizontal: theme.spacing['20'],
    borderRadius: 20,
    borderCurve: 'circular',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.spacing['4'],
  },

  buttonContainer: {
    marginHorizontal: 20,
  },
}));
