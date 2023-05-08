import { BaseWsTransport } from 'core/base-ws-transport';

export class UserWsTransport extends BaseWsTransport<{}> {
  constructor() {
    super('users');
  }
}

export const userWsTransport = new UserWsTransport();
