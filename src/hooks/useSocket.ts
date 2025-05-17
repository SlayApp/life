import {useEffect, useRef} from 'react';

import {Socket} from '~/service/socket/Socket.class';

import {useUser} from './useUser';

export const useSocket = () => {
  const user = useUser();

  const listenerData = useRef({
    user,
  });
  listenerData.current = {
    user,
  };

  useEffect(() => {
    Socket.init();

    return () => {
      Socket.disconnect();
    };
  }, [listenerData]);
};
