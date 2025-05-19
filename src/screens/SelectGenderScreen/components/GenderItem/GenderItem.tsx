import {SymbolView} from 'expo-symbols';
import Animated from 'react-native-reanimated';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useGenderItem} from './GenderItem.hooks';
import {styles} from './GenderItem.styles';
import {IGenderItemProps} from './GenderItem.types';

export const GenderItem: React.FC<IGenderItemProps> = props => {
  const {onPressHandler, animatedBorderStyle, animatedCheckmarkStyle, theme} =
    useGenderItem(props);

  return (
    <PressableScale haptics activeScale={0.98} onPress={onPressHandler}>
      <Animated.View style={[styles.itemContainer, animatedBorderStyle]}>
        <Text variant="title">{props.title}</Text>
        <Animated.View style={animatedCheckmarkStyle}>
          <SymbolView
            style={{height: 24, width: 24}}
            name="checkmark.circle.fill"
            tintColor={theme.colors.primary}
            weight="bold"
          />
        </Animated.View>
      </Animated.View>
    </PressableScale>
  );
};
