import React from 'react';
import {TextInput, View} from 'react-native';

import {Button} from '~/components/Button';
import {KeyboardAvoidingView} from '~/components/KeyboardAvoidingView';
import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {ScreenHeader} from '~/components/ScreenHeader/ScreenHeader';
import {Text} from '~/components/Text';

import {useEnterNameScreen} from './EnterName.hook';
import {styles} from './EnterName.styles';

export const EnterNameScreen: React.FC = () => {
  const {name, setName, keyboardVerticalOffset, onPress, ref, header} =
    useEnterNameScreen();

  return (
    <SafeAreaWrapper edges="bottom" style={styles.flex1}>
      <ScreenHeader leftAction={header.leftAction} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text variant="h2" weight="bold">
            Name your character
          </Text>
          <Text variant="body" weight="medium" color="secondary">
            Choose a name for your character
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            autoFocus
            value={name}
            onChangeText={setName}
            style={styles.input}
            textAlign="center"
            placeholder="Name"
          />
        </View>
      </View>
      <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.buttonContainer}>
          <Button disabled={!name.trim()} onPress={onPress} label="Next" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};
