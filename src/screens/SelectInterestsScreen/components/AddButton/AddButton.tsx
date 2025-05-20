import {View} from 'react-native';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {styles} from './AddButton.styles';

interface IProps {
  onPress: () => void;
}

export const AddButton: React.FC<IProps> = ({onPress}) => {
  return (
    <PressableScale onPress={onPress}>
      <View style={styles.container}>
        <Text variant="small" weight="bold" style={{color: 'white'}}>
          Add
        </Text>
      </View>
    </PressableScale>
  );
};
