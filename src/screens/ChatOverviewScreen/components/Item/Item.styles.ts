import {StyleSheet} from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing['12'],
    flex: 1,
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
    gap: theme.spacing['2'],
    flex: 1,
    justifyContent: 'flex-start',
  },
  nameDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  unreadMessagesContainer: {
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
