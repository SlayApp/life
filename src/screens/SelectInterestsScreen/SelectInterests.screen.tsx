import {Pressable, Text, TextInput, View} from 'react-native';

import {KeyboardAvoidingView} from '~/components/KeyboardAvoidingView';
import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';

import {styles} from './SelectInterests.styles';

export const SelectInterestsScreen: React.FC = () => {
  return (
    <SafeAreaWrapper style={styles.flex1}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Name your character</Text>
          <Text style={styles.subtitle}>Choose a name for your character</Text>
        </View>
        <TextInput
          autoFocus
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Name"
        />
      </View>
      <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
  r;
};
