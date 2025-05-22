import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  itemContainer: {
    paddingVertical: theme.spacing['16'],
    paddingHorizontal: theme.spacing['20'],
    borderRadius: 18,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.subdued98,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  symbolView: {
    height: 24,
    width: 24,
  },
}));
