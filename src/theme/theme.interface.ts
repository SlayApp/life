import {theme} from './theme';

export type TMainTheme = typeof theme;
type AppThemes = {
  main: TMainTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}
