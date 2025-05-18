import {Dimensions} from 'react-native';
import {UnistylesRuntime} from 'react-native-unistyles';

export const getHeight = () => {
  const height =
    UnistylesRuntime.screen.height || Dimensions.get('window').height;
  const width = UnistylesRuntime.screen.width || Dimensions.get('window').width;

  return height > width ? height : width;
};
export const getWidth = () => {
  const height =
    UnistylesRuntime.screen.height || Dimensions.get('window').height;
  const width = UnistylesRuntime.screen.width || Dimensions.get('window').width;

  return height > width ? width : height;
};
