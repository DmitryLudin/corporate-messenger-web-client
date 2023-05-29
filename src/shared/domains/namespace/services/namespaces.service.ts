import { RequestStore } from 'shared/lib/core';

import { Namespace } from '../models';
import { NamespacesTransport, namespaceTransport } from '../transports';

type TSelectedNamespaceStore = {
  namespace: Namespace | null;
};

export class NamespacesService {
  private readonly _selectedNamespaceStore =
    new RequestStore<TSelectedNamespaceStore>({
      namespace: null,
    });

  get selectedNamespaceStore() {
    return this._selectedNamespaceStore.getStore();
  }

  constructor(private readonly transport: NamespacesTransport) {}

  getSelectedNamespaceId() {
    return this._selectedNamespaceStore.getStore().namespace?.id;
  }

  getByName(name: string) {
    this._selectedNamespaceStore.resetStore();
    this._selectedNamespaceStore.setLoading(true);

    return this.transport
      .getByName(name)
      .then((namespace) => {
        this._selectedNamespaceStore.updateStore({ namespace });
        return namespace;
      })
      .catch(this._selectedNamespaceStore.setError)
      .finally(() => this._selectedNamespaceStore.setLoading(false));
  }

  resetStore() {
    this._selectedNamespaceStore.resetStore();
  }
}

export const namespacesService = new NamespacesService(namespaceTransport);
