import {Image} from 'expo-image';
import {View} from 'react-native';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useItem} from './Item.hook';
import {styles} from './Item.styles';
import {IItemProps} from './Item.types';

export const Item: React.FC<IItemProps> = props => {
  const {name, lastMessage, profilePictureUri} = props;
  const {onPressHandler} = useItem(props);

  return (
    <PressableScale onPress={onPressHandler}>
      <View style={styles.container}>
        <View style={styles.avatar}>
          {profilePictureUri ? (
            <Image
              source={{uri: profilePictureUri}}
              style={styles.avatarImage}
            />
          ) : null}
        </View>
        <View style={styles.content}>
          <Text numberOfLines={1} variant="label">
            {name}
          </Text>
          <Text numberOfLines={2} variant="body">
            {lastMessage}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};
