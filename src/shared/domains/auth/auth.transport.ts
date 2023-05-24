import { ILoginDto, ISignupDto } from 'shared/domains/auth/dto';
import { User } from 'shared/domains/user/user.model';
import { BaseHttpTransport } from 'shared/lib/core/base-http-transport';

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
