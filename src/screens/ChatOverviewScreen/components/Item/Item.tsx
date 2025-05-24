import {Image} from 'expo-image';
import {View} from 'react-native';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useItem} from './Item.hook';
import {styles} from './Item.styles';
import {IItemProps} from './Item.types';

export const Item: React.FC<IItemProps> = props => {
  const {name, message, profilePictureUri} = props;
  const {onPressHandler, formattedDate} = useItem(props);

  return (
    <PressableScale activeScale={0.99} onPress={onPressHandler}>
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
          <View style={styles.nameDateContainer}>
            <Text numberOfLines={1} variant="body" weight="semibold">
              {name}
            </Text>
            <Text color="primary" variant="tiny">
              {formattedDate}
            </Text>
          </View>
          <Text numberOfLines={1} variant="body" color="secondary">
            {message.content}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};
