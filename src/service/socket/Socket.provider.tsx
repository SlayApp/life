// src/containers/SocketConnection.ts
import {useCallback, useEffect, useMemo, useState} from 'react';
import {createContainer} from 'unstated-next';

import {ESocketSubEvents} from '~/enums/ESubscriptionEvents';
import {Socket} from '~/service/socket/Socket.class';
import {log} from '~/utils/log.util';

import {TSocketEventsForced} from './Socket.subscriptions';

const useContainer = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    log.info('[Socket] isConnected', isConnected);
  }, [isConnected]);

  const socketSubscriptions = useMemo<TSocketEventsForced>(
    () => ({
      [ESocketSubEvents.CONNECT]: () => {
        log.success('[Socket] onConnect');
        setIsConnected(true);
      },
      [ESocketSubEvents.DISCONNECT]: () => {
        log.error('[Socket] onDisconnect');
        setIsConnected(false);
      },
      [ESocketSubEvents.CHARACTER_RESPONSE]: data => {
        log.info('[Socket] onCharacterResponse', data);
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
