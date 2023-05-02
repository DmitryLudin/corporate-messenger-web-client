import { DefaultEventsMap, EventNames } from '@socket.io/component-emitter';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { TWsTransportCallback } from 'core/base-ws-transport/types';
import { Socket, io } from 'socket.io-client';

const baseURL = process.env.REACT_APP_API_WS_URL || '';

export class BaseWsTransport<T extends DefaultEventsMap> {
  protected socket: Socket<T> | null = null;

  constructor(private readonly namespace?: string) {}

  connect(callback?: () => void) {
    const url = this.namespace ? `${baseURL}/${this.namespace}` : baseURL;

    this.socket = io(url, {
      withCredentials: true,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      callback && callback();
    });
  }

  send<E extends EventNames<T>>(
    event: E,
    ...args: Parameters<T[E]>
  ): void | Error {
    if (!this.socket) {
      return new Error('Соединение с сервером не установлено');
    }

    this.socket.emit(event, ...args);
  }

  listen<E extends EventNames<T>>(event: E, listener: T[E]): void | Error {
    if (!this.socket) {
      return new Error('Соединение с сервером не установлено');
    }

    // @ts-ignore
    this.socket.on(event, listener);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  protected deserialize<T>(
    model: ClassConstructor<T>,
    callback: TWsTransportCallback<T>
  ) {
    return (data: T) => callback(plainToInstance(model, data));
  }

  protected deserializeArray<T>(
    model: ClassConstructor<T>,
    callback: TWsTransportCallback<T[]>
  ) {
    return (data: Array<T>) =>
      callback(
        Array.isArray(data)
          ? data.map((item) => plainToInstance(model, item))
          : []
      );
  }
}
