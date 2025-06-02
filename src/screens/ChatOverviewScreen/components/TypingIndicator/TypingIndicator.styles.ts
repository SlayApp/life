import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  inner: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#F0EFF4',
    borderRadius: 10,
    borderCurve: 'continuous',
    borderBottomLeftRadius: 0,
    gap: 2,
  },
}));
