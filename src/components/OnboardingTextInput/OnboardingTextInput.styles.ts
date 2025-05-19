import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  input: {
    ...theme.fonts.variant.h3,
  },
  container: {
    backgroundColor: theme.colors.subdued95,
    paddingVertical: theme.spacing['12'],
    paddingHorizontal: theme.spacing['16'],
    borderRadius: 12,
    borderCurve: 'continuous',
  },
}));
