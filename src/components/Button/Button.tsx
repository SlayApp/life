import {memo} from 'react';
import {View} from 'react-native';

import {PressableScale} from '../PressableScale/PressableScale';
import {Text} from '../Text';
import {styles} from './Button.styles';

interface IProps {
  onPress: () => void;
  disabled?: boolean;
  label: string;
}

export const Button: React.FC<IProps> = memo(
  ({onPress, disabled = false, label}) => {
    return (
      <PressableScale disabled={disabled} onPress={onPress}>
        <View style={styles.buttonContainer(disabled)}>
          <Text variant="title" color="inverted">
            {label}
          </Text>
        </View>
      </PressableScale>
    );
  },
);
