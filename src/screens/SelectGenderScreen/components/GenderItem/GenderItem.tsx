import {UpdateUserDtoGenderEnum} from 'api-client';
import {SymbolView} from 'expo-symbols';
import Animated from 'react-native-reanimated';

import {PressableScale} from '~/components/PressableScale/PressableScale';
import {Text} from '~/components/Text';

import {useGenderItem} from './GenderItem.hooks';
import {styles} from './GenderItem.styles';
import {IGenderItemProps} from './GenderItem.types';

const t: {[key in UpdateUserDtoGenderEnum]: string} = {
  [UpdateUserDtoGenderEnum.Male]: 'Male',
  [UpdateUserDtoGenderEnum.Female]: 'Female',
  [UpdateUserDtoGenderEnum.NonBinary]: 'Non binary',
};

export const GenderItem: React.FC<IGenderItemProps> = props => {
  const {
    onPressHandler,
    animatedContainerStyles,
    animatedCheckmarkStyle,
    theme,
  } = useGenderItem(props);

  return (
    <PressableScale haptics activeScale={0.98} onPress={onPressHandler}>
      <Animated.View style={[styles.itemContainer, animatedContainerStyles]}>
        <Text variant="title">{t[props.id]}</Text>
        <Animated.View style={animatedCheckmarkStyle}>
          <SymbolView
            style={styles.symbolView}
            name="checkmark.circle.fill"
            tintColor={theme.colors.primary}
            weight="bold"
          />
        </Animated.View>
      </Animated.View>
    </PressableScale>
  );
};
