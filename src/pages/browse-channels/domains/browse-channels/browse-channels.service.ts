import {
  browseChannelsTransport,
  BrowseChannelsTransport,
} from 'pages/browse-channels/domains/browse-channels/browse-channels.transport';
import { BrowseChannel } from './models/browse-channel.model';
import {
  namespacesService,
  NamespacesService,
} from 'shared/domains/namespaces';
import { RequestStore } from 'shared/lib/core/base-request-store';

type TStore = {
  channels: BrowseChannel[];
  totalCount: number;
};

class BrowseChannelsService {
  private readonly _store = new RequestStore<TStore>({
    channels: [],
    totalCount: 0,
  });

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: BrowseChannelsTransport,
    private readonly namespacesService: NamespacesService
  ) {}

  async getAll() {
    try {
      const namespaceId = this.namespacesService.getSelectedNamespaceId();
      this._store.resetStore();
      this._store.setLoading(true);
      const result = await this.transport.getAll(namespaceId);
      this._store.updateStore({
        channels: result.items,
        totalCount: result.meta.totalItems,
      });
    } catch (error) {
      this._store.setError(error as Error);
    } finally {
      this._store.setLoading(false);
    }
  }
}

export const browseChannelsService = new BrowseChannelsService(
  browseChannelsTransport,
  namespacesService
);
