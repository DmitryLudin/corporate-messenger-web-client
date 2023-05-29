import { RequestStore } from 'shared/lib/core';

import { Namespace } from '../models';
import { NamespacesTransport, namespaceTransport } from '../transports';
import type { TCreateNamespaceDto } from '../dto';

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

  create(data: TCreateNamespaceDto) {
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
