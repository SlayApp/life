import {SymbolView} from 'expo-symbols';
import {memo} from 'react';
import {View} from 'react-native';
import {useUnistyles} from 'react-native-unistyles';

import {PressableScale} from '../PressableScale/PressableScale';
import {SafeAreaWrapper} from '../SafeAreaWrapper';
import {Text} from '../Text';
import {styles} from './ScreenHeader.styles';
import {
  IScreenHeaderMidAction,
  IScreenHeaderSideAction,
} from './ScreenHeader.types';

interface IProps {
  leftAction?: IScreenHeaderSideAction;
  midAction?: IScreenHeaderMidAction;
  rightAction?: IScreenHeaderSideAction;
}

export const ScreenHeader: React.FC<IProps> = memo(
  ({leftAction, midAction, rightAction}) => {
    const {theme} = useUnistyles();

    return (
      <View>
        <SafeAreaWrapper edges="top" />
        <View style={styles.container}>
          <View style={styles.leftAction}>
            {leftAction ? (
              <PressableScale onPress={leftAction.onPress}>
                <SymbolView
                  name={leftAction.name}
                  style={styles.symbol}
                  tintColor={theme.colors.subdued60}
                  weight="semibold"
                />
              </PressableScale>
            ) : null}
          </View>
          <View style={styles.flex1}>
            {midAction ? (
              <Text variant="h2" weight="bold">
                Yes
              </Text>
            ) : null}
          </View>
          <View style={styles.leftAction}>
            {rightAction ? (
              <PressableScale onPress={rightAction.onPress}>
                <SymbolView
                  name={rightAction.name}
                  style={styles.symbol}
                  tintColor={theme.colors.subdued60}
                  weight="semibold"
                />
              </PressableScale>
            ) : null}
          </View>
        </View>
      </View>
    );
  },
);
