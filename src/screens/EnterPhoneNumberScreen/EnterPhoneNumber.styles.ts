import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing['8'],
  },
  inputContainer: {
    flex: 1,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeWrapperOverride: {
    paddingHorizontal: theme.spacing['12'],
  },
}));
