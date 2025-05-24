import React from 'react';
import {Pressable, View} from 'react-native';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {Text} from '~/components/Text';

import {useHeader} from './Header.hooks';
import {styles} from './Header.styles';

export const Header: React.FC = () => {
  const {user, onPress} = useHeader();

  return (
    <View style={styles.container}>
      <SafeAreaWrapper edges="top" />
      <View style={styles.headerContent}>
        <Pressable onPress={onPress}>
          <View style={styles.nameContainer}>
            <Text color="inverted" variant="small" weight="bold">
              {user.firstName.slice(0, 1)}
            </Text>
          </View>
        </Pressable>
        <Text variant="headline">Chats</Text>
        <View style={[styles.nameContainer, styles.placeholderButton]} />
      </View>
    </View>
  );
};
