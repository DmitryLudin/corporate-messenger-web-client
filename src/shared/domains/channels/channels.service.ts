import { RequestStore } from 'core/base-request-store';
import { TCreateChannel } from 'pages/namespace/types/create-channel';
import { Channel } from 'shared/domains/channels/models/channel.model';
import { Members } from 'shared/domains/channels/models/members.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'shared/domains/channels/transports/channels.transport';
import {
  channelsWsTransport,
  ChannelsWsTransport,
} from 'shared/domains/channels/transports/channels.ws-transport';

type TChannelsStore = {
  channels: Channel[];
};

type TSelectedChannelsStore = {
  channel: Channel | null;
  members: Members | null;
};

export class ChannelsService {
  private readonly _channelsStore = new RequestStore<TChannelsStore>({
    channels: [],
  });
  private readonly _selectedChannelStore =
    new RequestStore<TSelectedChannelsStore>({
      channel: null,
      members: null,
    });

  get channelsStore() {
    return this._channelsStore.getStore();
  }

  get selectedChannelStore() {
    return this._selectedChannelStore.getStore();
  }

  constructor(
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport
  ) {}

  getAllForUser(namespaceId: string) {
    this._channelsStore.resetStore();
    this._channelsStore.setLoading(true);

    return this.transport
      .getAllForUser(namespaceId)
      .then((channels) => this._channelsStore.updateStore({ channels }))
      .catch(this._channelsStore.setError)
      .finally(() => this._channelsStore.setLoading(false));
  }

  getByName(namespaceId: string, channelName: string) {
    this._selectedChannelStore.setLoading(true);

    return this.transport
      .getByName(namespaceId, channelName)
      .then((channel) => this._selectedChannelStore.updateStore({ channel }))
      .catch(this._selectedChannelStore.setError)
      .finally(() => this._selectedChannelStore.setLoading(false));
  }

  getChannelMembers(namespaceId: string) {
    const channel = this._selectedChannelStore.getStore().channel;

    if (!channel) return;

    return this.transport
      .getChannelMembers(namespaceId, channel.id)
      .then((members) => this._selectedChannelStore.updateStore({ members }))
      .catch(this._selectedChannelStore.setError);
  }

  createChannel(namespaceId: string, data: TCreateChannel) {
    return this.transport.create(namespaceId, data).then((channel) => {
      const channels = this._channelsStore.getStoreValue('channels');
      this._channelsStore.updateStore({ channels: channels.concat(channel) });
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
    this._channelsStore.resetStore();
    this._selectedChannelStore.resetStore();
  }
}

export const channelsService = new ChannelsService(
  channelsTransport,
  channelsWsTransport
);
