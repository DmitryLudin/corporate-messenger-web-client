import { BrowseChannel } from 'shared/domains/channels/models/browse-channel/browse-channel.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'shared/domains/channels/transports/channels.transport';
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
    private readonly transport: ChannelsTransport,
    private readonly namespacesService: NamespacesService
  ) {}

  async getAll() {
    try {
      const namespaceId = this.namespacesService.getSelectedNamespaceId();
      this._store.resetStore();
      this._store.setLoading(true);
      // const pagination = await this.transport.getAll(namespaceId);
      // this._store.updateStore({
      //   channels: pagination.items,
      //   totalCount: pagination.meta.totalItems,
      // });
    } catch (error) {
      this._store.setError(error as Error);
    } finally {
      this._store.setLoading(false);
    }
  }
}

export const browseChannelsService = new BrowseChannelsService(
  channelsTransport,
  namespacesService
);
