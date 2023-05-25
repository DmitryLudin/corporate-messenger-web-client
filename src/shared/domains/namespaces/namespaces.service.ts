import { Namespace } from 'shared/domains/namespaces/models/namepsace.model';
import {
  NamespacesTransport,
  namespaceTransport,
} from 'shared/domains/namespaces/transports/namespaces.transport';
import { RequestStore } from 'shared/lib/core/base-request-store';

type TNamespaceStore = {
  namespaces: Namespace[];
};

type TSelectedNamespaceStore = {
  namespace: Namespace | null;
};

export class NamespacesService {
  private readonly _namespacesStore = new RequestStore<TNamespaceStore>({
    namespaces: [],
  });
  private readonly _selectedNamespaceStore =
    new RequestStore<TSelectedNamespaceStore>({
      namespace: null,
    });

  get namespacesStore() {
    return this._namespacesStore.getStore();
  }

  get selectedNamespaceStore() {
    return this._selectedNamespaceStore.getStore();
  }

  constructor(private readonly transport: NamespacesTransport) {}

  getSelectedNamespaceId() {
    return this._selectedNamespaceStore.getStore().namespace?.id;
  }

  getAll() {
    this._namespacesStore.setLoading(true);
    return this.transport
      .getAll()
      .then((namespaces) => this._namespacesStore.updateStore({ namespaces }))
      .catch(this._namespacesStore.setError)
      .finally(() => this._namespacesStore.setLoading(false));
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

  join(name: string) {
    return this.transport.join(name);
  }

  create(data: { name: string; displayName: string }) {
    return this.transport.create(data).then((namespace) => {
      this._namespacesStore.updateStore((prevState) => ({
        ...prevState,
        namespaces: [...prevState.namespaces, namespace],
      }));

      return namespace;
    });
  }

  resetStore() {
    this._selectedNamespaceStore.resetStore();
  }
}

export const namespacesService = new NamespacesService(namespaceTransport);
