import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  flex1: {
    flex: 1,
    backgroundColor: theme.colors.inverted,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.layout.onboardingScreenMarginHorizontal,
    gap: theme.spacing['32'],
    marginTop: theme.spacing['20'],
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing['4'],
  },
}));
