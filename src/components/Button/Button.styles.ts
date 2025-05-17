import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create({
  buttonContainer: (disabled: boolean) => ({
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    height: 52,
    opacity: disabled ? 0.5 : 1,
  }),
});
