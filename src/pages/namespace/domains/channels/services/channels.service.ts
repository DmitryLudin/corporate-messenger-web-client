import { RequestStore } from 'core/base-request-store';
import { Channel } from 'pages/namespace/domains/channels/models/channel.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'pages/namespace/domains/channels/transports/channels.transport';
import {
  channelsWsTransport,
  ChannelsWsTransport,
} from 'pages/namespace/domains/channels/transports/channels.ws-transport';
import {
  NamespaceService,
  namespaceService,
} from 'pages/namespace/domains/namespace/namespace.service';
import { TCreateChannel } from 'pages/namespace/types/create-channel';

type TStore = {
  channels: Channel[];
};

const initialState: TStore = {
  channels: [],
};

export class ChannelsService {
  private readonly _store = new RequestStore<TStore>(initialState);

  get store() {
    return this._store.getStore();
  }

  constructor(
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport,
    private readonly namespaceService: NamespaceService
  ) {}

  getAllForUser(namespaceId: string) {
    this._store.resetStore();
    this._store.setLoading(true);

    return this.transport
      .getAllForUser(namespaceId)
      .then((channels) => this._store.updateStore({ channels }))
      .catch(this._store.setError)
      .finally(() => this._store.setLoading(false));
  }

  async createChannel(data: TCreateChannel) {
    const namespace = this.namespaceService.store.namespace;

    if (!namespace) return;

    return this.transport.create(namespace.id, data).then((channel) => {
      const channels = this._store.getStoreValue('channels');
      this._store.updateStore({ channels: channels.concat(channel) });
      return channel;
    });
  }

  connect(namespaceId: string) {
    this.wsTransport.connect();
    this.wsTransport.sendJoinChannels(namespaceId);
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  resetStore() {
    this._store.resetStore();
  }
}

export const channelsService = new ChannelsService(
  channelsTransport,
  channelsWsTransport,
  namespaceService
);
