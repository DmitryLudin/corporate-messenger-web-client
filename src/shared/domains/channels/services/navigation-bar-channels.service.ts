import { RequestStore } from 'core/base-request-store';
import { Channel } from 'shared/domains/channels/models/channel.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'shared/domains/channels/transports/channels.transport';
import { TCreateChannel } from 'shared/domains/channels/types/create-channel';
import {
  namespacesService,
  NamespacesService,
} from 'shared/domains/namespaces/namespaces.service';

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
      const channels = await this.transport.getAllForUser(namespaceId);
      this._store.updateStore({ channels });
    } catch (error) {
      this._store.setError(error as Error);
    } finally {
      this._store.setLoading(false);
    }
  }

  async createChannel(data: TCreateChannel) {
    try {
      const namespaceId = this.namespacesService.getSelectedNamespaceId();
      const channel = await this.transport.create(namespaceId, data);
      const channels = this._store.getStoreValue('channels');
      this._store.updateStore({ channels: channels.concat(channel) });
      return channel;
    } catch (error) {
      console.error(error);
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
