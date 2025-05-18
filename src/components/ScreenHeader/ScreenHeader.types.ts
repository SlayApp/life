import {SymbolView} from 'expo-symbols';
import {ComponentProps} from 'react';

export interface IScreenHeaderSideAction {
  name: ComponentProps<typeof SymbolView>['name'];
  onPress: () => void;
}
export interface IScreenHeaderMidAction {
  markup: React.ReactNode;
  onPress: () => void;
}

export interface IScreenHeader {
  leftAction?: IScreenHeaderSideAction;
  midAction?: IScreenHeaderMidAction;
  rightAction?: IScreenHeaderSideAction;
}
