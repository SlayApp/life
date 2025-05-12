import {
  memo,
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
} from 'react';
import {TextInputProps, TextInput, findNodeHandle} from 'react-native';
import NativeTextInputHelpers from '../../../specs/NativeTextInputHelpers';

export interface IInput {
  clearText: () => Promise<string | null>;
  focus: TextInput['focus'];
  blur: TextInput['blur'];
}

type TProps = TextInputProps;

export const Input = memo(
  forwardRef<IInput, TProps>((props, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [_, setText] = useState('');
    const {onChangeText} = props;

    const handleChangeText = useCallback(
      (text: string) => {
        setText(text);
        onChangeText?.(text);
      },
      [onChangeText],
    );

    useImperativeHandle(
      ref,
      () => ({
        clearText: async () => {
          const handle = findNodeHandle(inputRef.current);
          if (!handle) {
            return null;
          }
          const value = await NativeTextInputHelpers.clearText(handle);

          return value;
        },
        focus: () => {
          inputRef.current?.focus();
        },
        blur: () => {
          inputRef.current?.blur();
        },
      }),
      [],
    );

    return (
      <TextInput {...props} onChangeText={handleChangeText} ref={inputRef} />
    );
  }),
);
