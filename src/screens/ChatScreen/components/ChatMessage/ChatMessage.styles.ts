import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create({
  container: (isMe: boolean) => ({
    alignSelf: isMe ? 'flex-end' : 'flex-start',
    backgroundColor: isMe ? '#00B3FF' : '#F0EFF4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderCurve: 'continuous',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    maxWidth: '80%',
  }),
  dot: {
    position: 'absolute',
    right: -4,
    bottom: 2,
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#00B3FF',
  },
});
