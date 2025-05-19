import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.layout.onboardingScreenMarginHorizontal,
    gap: theme.spacing['24'],
    marginTop: theme.spacing['40'],
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing['4'],
  },
  inputContainer: {
    marginHorizontal: theme.spacing['16'],
    backgroundColor: theme.colors.subdued95,
    paddingVertical: theme.spacing['12'],
    paddingHorizontal: theme.spacing['16'],
    borderRadius: 12,
    borderCurve: 'continuous',
  },
}));
