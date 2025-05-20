import {memo} from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';

import {SpringOriginXYAnimation} from '~/motion/layoutTransitions';

import {TInterest} from '../../SelectInterests.types';
import {InterestItem} from '../InterestItem';
import {styles} from './InterestList.styles';

interface IProps {
  interests: TInterest[];
  onRemoveInterestPress: (id: string) => void;
}

export const InterestList: React.FC<IProps> = memo(
  ({interests, onRemoveInterestPress}) => {
    return (
      <Animated.View style={styles.container}>
        {interests.map(interest => (
          <Animated.View
            key={interest.id}
            entering={FadeIn.duration(100)}
            layout={SpringOriginXYAnimation}>
            <InterestItem
              interest={interest}
              onRemoveInterestPress={onRemoveInterestPress}
            />
          </Animated.View>
        ))}
      </Animated.View>
    );
  },
);
