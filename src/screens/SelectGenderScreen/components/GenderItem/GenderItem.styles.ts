import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  itemContainer: {
    paddingVertical: theme.spacing['16'],
    paddingHorizontal: theme.spacing['20'],
    borderRadius: 18,
    borderWidth: 2.5,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.subdued99,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));
