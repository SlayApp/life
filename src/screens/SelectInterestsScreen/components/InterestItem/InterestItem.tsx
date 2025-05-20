import {SymbolView} from 'expo-symbols';
import {memo} from 'react';
import {View} from 'react-native';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useInterestItem} from './InterestItem.hook';
import {styles} from './InterestItem.styles';
import {IInterestItemProps} from './InterestItem.types';

export const InterestItem: React.FC<IInterestItemProps> = memo(props => {
  const {interest} = props;
  const {onPress} = useInterestItem(props);

  return (
    <PressableScale onPress={onPress}>
      <View style={styles.container}>
        <Text color="inverted" weight="bold" variant="body">
          {interest}
        </Text>
        <SymbolView name="xmark" size={12} weight="bold" tintColor="white" />
      </View>
    </PressableScale>
  );
});
