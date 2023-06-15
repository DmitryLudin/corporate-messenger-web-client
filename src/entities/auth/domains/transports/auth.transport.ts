import { BaseHttpTransport } from 'shared/lib/core';
import { User } from 'shared/domains/user';

import { ILoginDto, ISignupDto } from '../dto';

export class AuthTransport extends BaseHttpTransport {
  constructor() {
    super('auth');
  }

  authenticate() {
    return this.get(this.basePath).then(this.deserialize(User));
  }

  signUp(data: ISignupDto) {
    return this.post(`${this.basePath}/sign-up`, data).then(
      this.deserialize(User)
    );
  }

  logIn(data: ILoginDto) {
    return this.post(`${this.basePath}/log-in`, data).then(
      this.deserialize(User)
    );
  }

  logOut() {
    return this.post(`${this.basePath}/log-out`);
  }
}

export const authTransport = new AuthTransport();
