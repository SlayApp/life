import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {useDeleteUser} from '~/hooks/useDeleteUser';

import {styles} from './Header.styles';

export const Header: React.FC = () => {
  const logOut = useDeleteUser();
  const onPress = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <View style={styles.container}>
      <SafeAreaWrapper edges="top" />
      <View style={styles.headerContent}>
        <Pressable onPress={onPress}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#000',
              borderRadius: 10,
            }}
          />
        </Pressable>
        <Text style={styles.title}>Chats</Text>
        <View
          style={{
            opacity: 0,
            width: 20,
            height: 20,
            backgroundColor: '#000',
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};
