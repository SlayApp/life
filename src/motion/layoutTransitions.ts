import {LayoutAnimationFunction} from 'react-native-reanimated';

import {spring} from './spring';

export const SpringOriginXAnimation: LayoutAnimationFunction = values => {
  'worklet';

  return {
    animations: {
      originX: spring(values.targetOriginX, {
        response: 0.6,
        dampingFraction: 0.6,
      }),
    },

    initialValues: {
      originX: values.currentOriginY,
    },
  };
};
