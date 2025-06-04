import {Image} from 'expo-image';
import {View} from 'react-native';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {TypingIndicator} from '../TypingIndicator';
import {useItem} from './Item.hook';
import {styles} from './Item.styles';
import {IItemProps} from './Item.types';

export const Item: React.FC<IItemProps> = props => {
  const {name, message, profilePictureUri, hasUnreadMessages} = props;
  const {onPressHandler, formattedDate, isTyping} = useItem(props);

  return (
    <PressableScale activeScale={0.99} onPress={onPressHandler}>
      <View style={styles.wrapper}>
        {hasUnreadMessages ? (
          <View style={styles.unreadMessagesContainer} />
        ) : null}
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
              <Text color="secondary" variant="tiny">
                {formattedDate}
              </Text>
            </View>
            {isTyping ? (
              <TypingIndicator size={6} />
            ) : (
              <Text
                weight={hasUnreadMessages ? 'medium' : 'regular'}
                numberOfLines={1}
                variant="body"
                color={hasUnreadMessages ? 'primary' : 'secondary'}>
                {message.content}
              </Text>
            )}
          </View>
        </View>
      </View>
    </PressableScale>
  );
};
