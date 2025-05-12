import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  clearText(tag: number): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeTextInputHelpers');
