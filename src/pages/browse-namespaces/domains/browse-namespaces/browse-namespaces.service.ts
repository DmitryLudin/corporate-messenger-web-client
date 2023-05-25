import {
  Namespace,
  NamespacesTransport,
  namespaceTransport,
} from 'shared/domains/namespaces';
import { RequestStore } from 'shared/lib/core/base-request-store';

type TStore = {
  namespaces: Namespace[];
};

class BrowseNamespacesService {
  private readonly _store = new RequestStore<TStore>({
    namespaces: [],
  });

  get store() {
    return this._store.getStore();
  }

  constructor(private readonly transport: NamespacesTransport) {}

  getAll() {
    this._store.setLoading(true);

    return this.transport
      .getAll()
      .then((namespaces) => this._store.updateStore({ namespaces }))
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  join(name: string) {
    return this.transport.join(name);
  }

  create(data: { name: string; displayName: string }) {
    return this.transport.create(data).then((namespace) => {
      this._store.updateStore((prevState) => ({
        ...prevState,
        namespaces: prevState.namespaces.concat(namespace),
      }));

      return namespace;
    });
  }
}

export const browseNamespacesService = new BrowseNamespacesService(
  namespaceTransport
);
