import { RequestStore } from 'core/base-request-store';
import { Namespace } from 'shared/domains/namespaces/models/namepsace.model';
import {
  NamespacesTransport,
  namespaceTransport,
} from 'shared/domains/namespaces/transports/namespaces.transport';

type TStore = {
  namespaces: Namespace[];
};

const initialState: TStore = {
  namespaces: [],
};

class NamespacesService {
  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(private readonly transport: NamespacesTransport) {}

  getAll() {
    this._store.setLoading(true);
    this.transport
      .getAll()
      .then((namespaces) => this._store.updateStore({ namespaces }))
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  create(data: { name: string; displayName: string }) {
    return this.transport.create(data).then((namespace) => {
      this._store.updateStore((prevState) => ({
        ...prevState,
        namespaces: [...prevState.namespaces, namespace],
      }));

      return namespace;
    });
  }
}

export const namespacesService = new NamespacesService(namespaceTransport);
