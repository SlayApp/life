import {Image} from 'expo-image';
import {Pressable, Text, View} from 'react-native';

import {useItem} from './Item.hook';
import {styles} from './Item.styles';
import {IItemProps} from './Item.types';

export const Item: React.FC<IItemProps> = props => {
  const {name, lastMessage, profilePictureUri} = props;
  const {onPressHandler} = useItem(props);

  return (
    <Pressable onPress={onPressHandler}>
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
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <Text numberOfLines={2} style={styles.message}>
            {lastMessage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
