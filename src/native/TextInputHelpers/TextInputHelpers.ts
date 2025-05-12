import {findNodeHandle} from 'react-native';
import NativeTextInputHelpers from '../../../specs/NativeTextInputHelpers';

export abstract class TextInputHelpers {
  public static async clearText(
    componentOrHandle:
      | null
      | number
      | React.Component<any, any>
      | React.ComponentClass<any>,
  ): Promise<string | null> {
    const handle = findNodeHandle(componentOrHandle);
    if (!handle) {
      return null;
    }

    const result = await NativeTextInputHelpers.clearText(handle);
    return result;
  }
}
