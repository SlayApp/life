import {ViewProps} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useUnistyles} from 'react-native-unistyles';

import {TFCWithChildren} from '~/types/TFCWithChildren';

export const WhiteOnWhiteShadow: TFCWithChildren<ViewProps> = ({
  children,
  ...rest
}) => {
  const {theme} = useUnistyles();
  const aStyles = useAnimatedStyle(() => ({
    boxShadow: theme.shadows.whiteOnWhite,
  }));

  return (
    <Animated.View {...rest} style={[aStyles, rest.style]}>
      {children}
    </Animated.View>
  );
};
