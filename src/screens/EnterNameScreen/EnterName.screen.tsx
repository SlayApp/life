import React from 'react';
import {TextInput, View} from 'react-native';

import {Button} from '~/components/Button';
import {KeyboardAvoidingView} from '~/components/KeyboardAvoidingView';
import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {Text} from '~/components/Text';

import {useEnterNameScreen} from './EnterName.hook';
import {styles} from './EnterName.styles';

export const EnterNameScreen: React.FC = () => {
  const {name, setName, keyboardVerticalOffset, onPress, ref} =
    useEnterNameScreen();

  return (
    <SafeAreaWrapper style={styles.flex1}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text variant="headline" weight="bold">
            Name your character
          </Text>
          <Text variant="body" color="secondary">
            Choose a name for your character
          </Text>
        </View>
        <TextInput
          ref={ref}
          autoFocus
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Name"
        />
      </View>
      <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.buttonContainer}>
          <Button disabled={!name.trim()} onPress={onPress} label="Next" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};
