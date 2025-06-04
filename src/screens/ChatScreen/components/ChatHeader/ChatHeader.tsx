import {Image} from 'expo-image';
import {SymbolView} from 'expo-symbols';
import React from 'react';
import {Pressable, View} from 'react-native';
import {useUnistyles} from 'react-native-unistyles';

import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {Text} from '~/components/Text';

import {useChatHeader} from './ChatHeader.hook';
import {styles} from './ChatHeader.styles';

interface IProps {
  name?: string;
  profilePictureUri?: string;
}

export const ChatHeader: React.FC<IProps> = ({name, profilePictureUri}) => {
  const {theme} = useUnistyles();
  const {goBack} = useChatHeader();

  return (
    <View style={styles.container}>
      <SafeAreaWrapper edges="top" />
      <View style={styles.headerContent}>
        <Pressable onPress={goBack}>
          <SymbolView
            name="chevron.left"
            style={styles.backButton}
            tintColor="#93989E"
            weight="bold"
            type="monochrome"
          />
        </Pressable>
        <View style={styles.titleContainer}>
          <View style={styles.avatar}>
            <Image
              source={{uri: profilePictureUri}}
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text variant="title" color="primary">
              {name}
            </Text>
          </View>
        </View>
        <View pointerEvents="none" style={styles.placeholderButton}>
          <SymbolView
            name="chevron.left"
            style={styles.backButton}
            tintColor="white"
            weight="bold"
            type="monochrome"
          />
        </View>
      </View>
    </View>
  );
};
