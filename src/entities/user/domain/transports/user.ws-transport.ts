import { BaseWsTransport } from 'shared/lib/core';

export class UserWsTransport extends BaseWsTransport<{}> {
  constructor() {
    super('users');
  }
}

export const userWsTransport = new UserWsTransport();
