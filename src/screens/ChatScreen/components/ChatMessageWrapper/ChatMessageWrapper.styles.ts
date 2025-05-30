import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: (isMe: boolean) => ({
    alignSelf: isMe ? 'flex-end' : 'flex-start',
    backgroundColor: isMe ? '#00B3FF' : '#F0EFF4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderCurve: 'continuous',
    borderTopLeftRadius: isMe ? 16 : 0,
    borderBottomLeftRadius: isMe ? 16 : 0,
    borderTopRightRadius: isMe ? 0 : 16,
    borderBottomRightRadius: isMe ? 0 : 16,
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
  inner: {
    minHeight: theme.fonts.variant.body.lineHeight,
  },
}));
