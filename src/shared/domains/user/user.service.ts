import {
  userWsTransport,
  UserWsTransport,
} from 'shared/domains/user/transports/user.ws-transport';
import { IUser } from 'shared/domains/user/user.model';
import { Store } from 'shared/lib/core/base-store';

type TUserStore = {
  user: IUser | null;
};

const initialUserState: TUserStore = {
  user: null,
};

export class UserService {
  private readonly _store = new Store<TUserStore>(initialUserState);

  get store() {
    return this._store.getStore();
  }

  constructor(private readonly wsTransport: UserWsTransport) {}

  setUser(userData: IUser | null) {
    this._store.updateStore({ user: userData });
  }

  connect() {
    this.wsTransport.connect();
  }

  disconnect() {
    this.wsTransport.disconnect();
  }
}

export const userService = new UserService(userWsTransport);
