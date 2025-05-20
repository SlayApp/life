import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing['8'],
    paddingVertical: theme.spacing['4'],
    borderRadius: 20,
  },
}));
