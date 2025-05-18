import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    height: theme.layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.layout.screenMarginHorizontal,
  },
  leftAction: {
    width: 24,
    height: 24,
  },
  midAction: {
    flex: 1,
  },
  flex1: {},
  symbol: {
    width: '100%',
    height: '100%',
  },
}));
