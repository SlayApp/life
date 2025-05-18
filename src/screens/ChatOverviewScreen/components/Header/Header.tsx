import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {Text} from '~/components/Text';
import {useDeleteUser} from '~/hooks/useDeleteUser';
import {useUser} from '~/hooks/useUser';

import {styles} from './Header.styles';

export const Header: React.FC = () => {
  const user = useUser();
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
              width: 24,
              height: 24,
              backgroundColor: '#000',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text color="inverted" variant="label">
              {user.username.slice(0, 1)}
            </Text>
          </View>
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
