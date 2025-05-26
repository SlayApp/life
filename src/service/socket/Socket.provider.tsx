// src/containers/SocketConnection.ts
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createContainer} from 'unstated-next';

import {ESocketSubEvents} from '~/enums/ESubscriptionEvents';
import {useUser} from '~/hooks/useUser';
import {Socket} from '~/service/socket/Socket.class';
import {optimisticAddMessage} from '~/utils/cache/optimisticAddMessage';
import {log} from '~/utils/log.util';

import {TSocketEventsForced} from './Socket.subscriptions';

const useContainer = () => {
  const user = useUser();
  const [isConnected, setIsConnected] = useState(false);

  const listenerRef = useRef({
    userId: user.id,
  });
  listenerRef.current = {
    userId: user.id,
  };

  useEffect(() => {
    log.info('[Socket] isConnected', isConnected);
  }, [isConnected]);

  const socketSubscriptions = useMemo<TSocketEventsForced>(
    () => ({
      [ESocketSubEvents.CONNECT]: () => {
        log.info('[Socket] onConnect');
        setIsConnected(true);
      },
      [ESocketSubEvents.DISCONNECT]: () => {
        log.info('[Socket] onDisconnect');
        setIsConnected(false);
      },
      [ESocketSubEvents.CHARACTER_RESPONSE]: data => {
        log.info('[Socket] onCharacterResponse', data);
        optimisticAddMessage(
          data.message,
          data.character,
          listenerRef.current.userId,
        );
      },
    }),
    [],
  );

  const initializeSocket = useCallback(() => {
    Socket.init(socketSubscriptions);
  }, [socketSubscriptions]);

  const disconnectSocket = useCallback(() => {
    Socket.disconnect();
  }, []);

  return {isConnected, initializeSocket, disconnectSocket};
};

export const SocketConnection = createContainer(useContainer);
export const SocketConnectionProvider = SocketConnection.Provider;
export const useSocket = SocketConnection.useContainer;
