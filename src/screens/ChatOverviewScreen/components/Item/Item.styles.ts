import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    gap: 2,
  },
  name: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  message: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Rounded-Regular',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
