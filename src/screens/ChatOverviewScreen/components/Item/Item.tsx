import {Image} from 'expo-image';
import {View} from 'react-native';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useItem} from './Item.hook';
import {styles} from './Item.styles';
import {IItemProps} from './Item.types';

export const Item: React.FC<IItemProps> = props => {
  const {name, lastMessage, profilePictureUri} = props;
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text numberOfLines={1} variant="label">
              {name}
            </Text>
            <View style={{}}>
              <Text color="tertiary" variant="small" weight="medium">
                {formattedDate}
              </Text>
            </View>
          </View>
          <Text numberOfLines={1} variant="body" color="tertiary">
            {lastMessage}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};
