import {useCallback, useMemo} from 'react';

import {formatChatDate} from '~/utils/formatChatDate';

import {IItemProps} from './Item.types';

export const useItem = (props: IItemProps) => {
  const {id, onPress, message} = props;

  const formattedDate = useMemo(() => {
    return formatChatDate(message.createdAt);
  }, [message.createdAt]);

  const onPressHandler = useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  return {
    onPressHandler,
    formattedDate,
  };
};
