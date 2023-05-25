import { Channel } from 'shared/domains/channels/models/channel.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'shared/domains/channels/transports/channels.transport';
import { TCreateChannel } from 'shared/domains/channels/types/create-channel';
import {
  namespacesService,
  NamespacesService,
} from 'shared/domains/namespaces';
import { RequestStore } from 'shared/lib/core/base-request-store';

type TChannelsStore = {
  channels: Channel[];
};

export class NavigationBarChannelsService {
  private readonly _store = new RequestStore<TChannelsStore>({
    channels: [],
  });

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: ChannelsTransport,
    private readonly namespacesService: NamespacesService
  ) {}

  async getAllForUser() {
    try {
      const namespaceId = this.namespacesService.getSelectedNamespaceId();
      this._store.resetStore();
      this._store.setLoading(true);
      // const channels = await this.transport.getAllForUser(namespaceId);
      // this._store.updateStore({ channels });
    } catch (error) {
      this._store.setError(error as Error);
    } finally {
      this._store.setLoading(false);
    }
  }

  resetStore() {
    this._store.resetStore();
  }
}

export const navigationBarChannelsService = new NavigationBarChannelsService(
  channelsTransport,
  namespacesService
);