import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

export const useChatHeader = () => {
  const {goBack} = useNavigation();

  const onBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  return {
    onBackPress,
  };
};
