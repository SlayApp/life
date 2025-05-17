import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    gap: 32,
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontSize: 26,
  },
  subtitle: {
    fontSize: 17,
    color: '#9B9B9B',
  },
  input: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  button: {},
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  buttonContainer: {
    marginHorizontal: 32,
  },
});
