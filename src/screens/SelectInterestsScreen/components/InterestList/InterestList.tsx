import {memo} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {InterestItem} from '../InterestItem';
import {styles} from './InterestList.styles';

interface IProps {
  interests: string[];
  onRemoveInterestPress: (index: number) => void;
}

export const InterestList: React.FC<IProps> = memo(
  ({interests, onRemoveInterestPress}) => {
    return (
      <Animated.View style={styles.container}>
        {interests.map((interest, index) => (
          <Animated.View
            key={`${index}-${interest}`}
            entering={FadeIn.duration(100)}
            exiting={FadeOut.duration(100)}>
            <InterestItem
              index={index}
              interest={interest}
              onRemoveInterestPress={onRemoveInterestPress}
            />
          </Animated.View>
        ))}
      </Animated.View>
    );
  },
);
