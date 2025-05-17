import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';

export const useLandingScreen = () => {
  const {navigate} = useNavigation();

  const onPress = useCallback(() => {
    navigate(EUnauthorizedStack.EnterName);
  }, [navigate]);

  return {onPress};
};
