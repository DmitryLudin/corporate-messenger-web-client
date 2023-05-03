import { RequestStore } from 'core/base-request-store';
import { Channel } from 'pages/app/domains/models/channel.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'pages/app/domains/transports/channels.transport';
import {
  channelsWsTransport,
  ChannelsWsTransport,
} from 'pages/app/domains/transports/channels.ws-transport';

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
    private readonly wsTransport: ChannelsWsTransport
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
  channelsWsTransport
);
