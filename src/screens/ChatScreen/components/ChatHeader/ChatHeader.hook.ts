import {useNavigation} from '@react-navigation/native';

export const useChatHeader = () => {
  const {goBack} = useNavigation();

  return {
    goBack,
  };
};
