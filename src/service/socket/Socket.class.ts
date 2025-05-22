import io, {Socket as SocketIO} from 'socket.io-client';

import {ESocketSubEvents} from '~/enums/ESubscriptionEvents';
import {log} from '~/utils/log.util';

import {Environment} from '../Environment';
import {LifetimeStorage} from '../LifetimeStorage';
import {TSocketPubEvents} from './Socket.interface';
import {TSocketEventsForced} from './Socket.subscriptions';

export class Socket {
  private static instance: Socket | null = null;
  private socket: SocketIO;
  private manualRetryCount = 0;
  private initialized = false;

  private constructor() {
    this.socket = io(Environment.API_BASE_URL, {
      transports: ['websocket'],
      autoConnect: false,
      reconnection: true,
      retries: 3,
      reconnectionAttempts: 10,
      reconnectionDelay: 10 * 1000,
      reconnectionDelayMax: 20 * 1000,
      withCredentials: true,
      // @NOTE: VERY IMPORTANT. all emit calls must be acknowledged
      // if the server takes to long, it will retry causing issues (like in the diary)
      ackTimeout: 15 * 1000,
      query: {
        token: LifetimeStorage.getString('authToken'),
      },
    });
  }

  public static init(socketSubscriptions: TSocketEventsForced) {
    const instance = Socket.getInstance();
    if (instance.initialized) return;
    instance.initialized = true;

    log.log(
      `[Socket] 🟢 Starting connection to server: ${Environment.API_BASE_URL}`,
    );
    instance.onError();
    instance.onConnect();
    instance.onDisconnect();
    instance.connect();

    const keys = Object.values(ESocketSubEvents);
    for (const key of keys) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance.on(key, (args: any) => {
        try {
          socketSubscriptions[key](args);
        } catch (error) {
          log.error(`[Socket] 🔴 Error handling event ${key}:`, error);
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private on(event: any, callback: any) {
    this.socket.on(event, callback);
  }

  public static emit<T extends keyof TSocketPubEvents>(
    event: T,
    ...args: Parameters<TSocketPubEvents[T]>
  ): void {
    const instance = Socket.getInstance();

    instance.socket.emit(event, ...args);
  }

  public static disconnect() {
    log.log('[Socket] 🟡 Disconnecting from socket server...');
    const instance = Socket.getInstance();
    instance.socket.disconnect();
    instance.socket.removeAllListeners();
    instance.manualRetryCount = 0;
    Socket.instance = null;
  }

  private static getInstance(): Socket {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }

    return Socket.instance;
  }

  private connect() {
    if (this.manualRetryCount >= 10) {
      log.log('[Socket] 🟡 Max retry count reached...');

      return;
    }

    if (this.socket.connected) {
      log.log('[Socket] 🟡 Already connected');

      return;
    }

    this.socket.connect();
    this.manualRetryCount += 1;
  }

  private onError() {
    this.socket.on('connect_error', error => {
      if (this.socket.active) {
        log.log('[Socket] 🟡 reconnecting...', error);

        return;
      }
      log.log(
        `[Socket] 🔴 Connection denied by server. Manually reconnecting... Error: ${error.message}`,
      );
      this.connect();
    });
  }

  private onConnect() {
    this.socket.on('connect', () => {
      log.success('[Socket] 🟢 Connection to server established');
      this.manualRetryCount = 0;
    });
  }

  private onDisconnect() {
    this.socket.on('disconnect', () => {
      if (this.socket.active) {
        log.log('[Socket] 🔴 Server connection unintentionally closed.');
        log.log('[Socket] 🟡 Trying to reconnect socket server...');

        return;
      }

      this.socket.off('disconnect');
      this.manualRetryCount = 0;
    });
  }
}
