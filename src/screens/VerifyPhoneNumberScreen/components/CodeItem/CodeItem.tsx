import Animated from 'react-native-reanimated';

import {styles as onboardingTextInputStyles} from '~/components/OnboardingTextInput/OnboardingTextInput.styles';
import {Text} from '~/components/Text';

import {useCodeItem} from './CodeItem.hook';
import {styles} from './CodeItem.styles';

interface IProps {
  value?: string;
}
export const CodeItem: React.FC<IProps> = ({value}) => {
  const {animatedStyles} = useCodeItem(value);

  return (
    <Animated.View
      style={[
        onboardingTextInputStyles.container,
        styles.container,
        animatedStyles,
      ]}>
      <Text variant="h3">{value}</Text>
    </Animated.View>
  );
};
