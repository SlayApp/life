import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  input: {
    ...theme.fonts.variant.h3,
  },
  container: {
    backgroundColor: theme.colors.subdued98,
    paddingVertical: theme.spacing['12'],
    paddingHorizontal: theme.spacing['16'],
    borderRadius: 16,
    borderCurve: 'continuous',
  },
}));
