import {useCallback} from 'react';

import {IInterestItemProps} from './InterestItem.types';

export const useInterestItem = ({
  index,
  onRemoveInterestPress,
}: IInterestItemProps) => {
  const onPress = useCallback(
    () => onRemoveInterestPress(index),
    [index, onRemoveInterestPress],
  );

  return {onPress};
};
