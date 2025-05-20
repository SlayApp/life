import {useCallback} from 'react';

import {IInterestItemProps} from './InterestItem.types';

export const useInterestItem = ({
  interest,
  onRemoveInterestPress,
}: IInterestItemProps) => {
  const onPress = useCallback(
    () => onRemoveInterestPress(interest.id),
    [interest.id, onRemoveInterestPress],
  );

  return {onPress};
};
