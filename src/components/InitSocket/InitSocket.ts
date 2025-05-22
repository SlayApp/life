import {useEffect} from 'react';

import {useSocket} from '~/service/socket/Socket.provider';
import {log} from '~/utils/log.util';

export const InitSocket = () => {
  const {initializeSocket, disconnectSocket} = useSocket();

  useEffect(() => {
    log.info('[InitSocket] useEffect');
    initializeSocket();

    return () => {
      disconnectSocket();
    };
  }, [initializeSocket, disconnectSocket]);

  return null;
};
