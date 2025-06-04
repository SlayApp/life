import React from 'react';
import {Pressable, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {Text} from '~/components/Text';

import {useHeader} from './Header.hooks';
import {styles} from './Header.styles';
import {IHeaderProps} from './Header.types';

export const Header: React.FC<IHeaderProps> = props => {
  const {user, onPress, animatedStyle} = useHeader(props);

  return (
    <View style={styles.container}>
      <SafeAreaWrapper edges="top" />
      <Animated.View style={[styles.headerContent, animatedStyle]}>
        <Pressable onPress={onPress}>
          <View style={styles.nameContainer}>
            <Text color="inverted" variant="small" weight="bold">
              {user.firstName?.slice(0, 1)}
            </Text>
          </View>
        </Pressable>
        <Text variant="headline">Chats</Text>
        <View style={[styles.nameContainer, styles.placeholderButton]} />
      </Animated.View>
    </View>
  );
};
