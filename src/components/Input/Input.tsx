import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {findNodeHandle, TextInput, TextInputProps} from 'react-native';
import NativeTextInputHelpers from 'specs/NativeTextInputHelpers';

export interface IInput {
  clearText: () => Promise<string | null>;
  focus: TextInput['focus'];
  blur: TextInput['blur'];
}

export type TInputProps = Omit<TextInputProps, 'value'> & {
  initialValue?: string;
};

export const Input = memo(
  forwardRef<IInput, TInputProps>((props, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [text, setText] = useState(props.initialValue ?? '');
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
      <TextInput
        {...props}
        value={text}
        onChangeText={handleChangeText}
        ref={inputRef}
      />
    );
  }),
);
