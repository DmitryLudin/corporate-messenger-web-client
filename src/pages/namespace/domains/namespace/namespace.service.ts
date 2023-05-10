import { RequestStore } from 'core/base-request-store';
import { Namespace } from 'shared/domains/namespaces/models/namepsace.model';
import {
  NamespacesTransport,
  namespaceTransport,
} from 'shared/domains/namespaces/transports/namespaces.transport';

type TStore = {
  namespace: Namespace | null;
};

const initialState: TStore = {
  namespace: null,
};

export class NamespaceService {
  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(private readonly transport: NamespacesTransport) {}

  getByName(name: string) {
    this._store.resetStore();
    this._store.setLoading(true);

    return this.transport
      .getByName(name)
      .then((namespace) => {
        this._store.updateStore({ namespace });
        return namespace;
      })
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  resetStore() {
    this._store.resetStore();
  }
}

export const namespaceService = new NamespaceService(namespaceTransport);
