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
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Rounded-Medium',
    color: '#9B9B9B',
  },
  input: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  button: {
    height: 52,
    backgroundColor: '#000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  buttonContainer: {
    marginHorizontal: 32,
  },
});
