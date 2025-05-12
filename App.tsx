import {useCallback, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Input, IInput} from './src/components/Input';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    bottom: 400,
  },
  textInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
  },
  textInputAbsolute: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: 32,
    width: 32,
    fontSize: 24,
    fontWeight: '600',
  },
  textInputContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  button: {
    height: 32,
    width: 32,
    backgroundColor: 'red',
  },
});

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const textInputRef = useRef<IInput>(null);

  const handlePress = useCallback(async () => {
    const value = await textInputRef.current?.clearText();
    if (value) {
      setText(value);
    }
  }, []);

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1} />
      <Text style={{fontSize: 24, fontWeight: '600', alignSelf: 'center'}}>
        {text}
      </Text>
      <View style={styles.textInputContainer}>
        <Input style={styles.textInput} ref={textInputRef} />

        <Pressable style={styles.button} onPress={handlePress} />
      </View>
    </View>
  );
}

export default App;
