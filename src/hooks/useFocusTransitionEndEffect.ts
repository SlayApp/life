import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import {TRootParamList} from '~/types/navigation';

export const useFocusTransitionEndEffect = (effect: () => void) => {
  const {addListener} =
    useNavigation<NativeStackNavigationProp<TRootParamList>>();

  useFocusEffect(
    useCallback(() => {
      const listener = addListener('transitionEnd', () => {
        effect();
      });

      return listener;
    }, [addListener, effect]),
  );
};
