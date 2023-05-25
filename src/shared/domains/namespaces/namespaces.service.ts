import { Namespace } from 'shared/domains/namespaces/models/namepsace.model';
import {
  NamespacesTransport,
  namespaceTransport,
} from 'shared/domains/namespaces/transports/namespaces.transport';
import { RequestStore } from 'shared/lib/core/base-request-store';

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
    const namespaceId = this._selectedNamespaceStore.getStore().namespace?.id;

    if (!namespaceId) throw new Error('Рабочее пространство не выбрано');

    return namespaceId;
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
