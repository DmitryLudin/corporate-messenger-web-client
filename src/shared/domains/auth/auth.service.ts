import {
  authTransport,
  AuthTransport,
} from 'shared/domains/auth/auth.transport';
import { ILoginDto, ISignupDto } from 'shared/domains/auth/dto';
import { userService, UserService } from 'shared/domains/user';
import { TRequestError } from 'shared/lib/core/base-http-transport/types';
import { RequestStore } from 'shared/lib/core/base-request-store';

type TAuthStore = {
  isAuthorized: boolean;
  authError?: TRequestError;
};

const initialAuthState: TAuthStore = {
  isAuthorized: false,
};

class AuthService {
  private readonly _store = new RequestStore<TAuthStore>(initialAuthState);

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: AuthTransport,
    private readonly userService: UserService
  ) {}

  authenticate() {
    return this.transport
      .authenticate()
      .then((user) => {
        this.userService.setUser(user);
        this._store.updateStore({ isAuthorized: true });
      })
      .catch((error: TRequestError) => {
        this._store.updateStore({ authError: error });
      });
  }

  logIn(userData: ILoginDto) {
    this._store.setLoading(true);
    return this.transport
      .logIn(userData)
      .then((user) => {
        this.userService.setUser(user);
        this._store.updateStore({ isAuthorized: true });
        this._store.setError();
        return user;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  logOut() {
    this._store.setLoading(true);
    return this.transport
      .logOut()
      .then(() => {
        this._store.resetStore();
        this.userService.setUser(null);
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  signUp(userData: ISignupDto) {
    this._store.setLoading(true);

    return this.transport
      .signUp(userData)
      .then(() => this.transport.logIn(userData))
      .then((user) => {
        this.userService.setUser(user);
        this._store.updateStoreValue('isAuthorized', true);
        return user;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }
}

export const authService = new AuthService(authTransport, userService);
