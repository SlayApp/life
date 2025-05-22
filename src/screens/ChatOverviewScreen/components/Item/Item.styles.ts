import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  lastMessage: {
    // height: theme.fonts.variant.body.lineHeight * 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
}));
