import {StyleSheet} from 'react-native-unistyles';

import {CHAT_HEADER_HEIGHT} from '../../Chat.constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerContent: {
    height: CHAT_HEADER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    height: 20,
    width: 20,
  },
  placeholderButton: {
    opacity: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Rounded-Regular',
    color: '#93989E',
  },
  textContainer: {
    flexDirection: 'column',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
