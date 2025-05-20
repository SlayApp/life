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

export const SpringOriginXYAnimation: LayoutAnimationFunction = values => {
  'worklet';

  return {
    animations: {
      originX: spring(values.targetOriginX, {
        response: 0.4,
        dampingFraction: 0.925,
      }),
      originY: spring(values.targetOriginY, {
        response: 0.4,
        dampingFraction: 0.925,
      }),
    },

    initialValues: {
      originX: values.currentOriginX,
      originY: values.currentOriginY,
    },
  };
};
