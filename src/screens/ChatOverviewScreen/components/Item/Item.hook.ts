import {useCallback} from 'react';

import {IItemProps} from './Item.types';

export const useItem = (props: IItemProps) => {
  const {id, onPress} = props;

  const onPressHandler = useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  return {
    onPressHandler,
  };
};
