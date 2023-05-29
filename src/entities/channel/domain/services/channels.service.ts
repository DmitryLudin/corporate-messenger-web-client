import { RequestStore } from 'shared/lib/core';

import {
  TChannelsStore,
  TSelectedChannelsStore,
  TSelfChannelsStore,
} from '../types';
import {
  channelsTransport,
  ChannelsTransport,
  channelsWsTransport,
  ChannelsWsTransport,
} from '../transports';
import { Channel } from '../models';
import { TCreateChannelDto } from '../dto';

export class ChannelsService {
  private readonly _channelsStore = new RequestStore<TChannelsStore>({
    channels: [],
    totalCount: 0,
  });
  private readonly _selfChannelsStore = new RequestStore<TSelfChannelsStore>({
    channels: [],
  });
  private readonly _selectedChannelsStore =
    new RequestStore<TSelectedChannelsStore>({});

  private namespaceId: string = '';
  private selectedChannelName: string = '';

  get channelsStore() {
    return this._channelsStore.getStore();
  }

  get selfChannelsStore() {
    return this._selfChannelsStore.getStore();
  }

  get selectedChannelsStore() {
    return this._selectedChannelsStore.getStore();
  }

  getSelectedChannel(): Channel | undefined {
    return this._selectedChannelsStore.getStoreValue(this.selectedChannelName);
  }

  constructor(
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport
  ) {}

  init(namespaceId: string) {
    this.namespaceId = namespaceId;
  }

  getChannels() {
    this._channelsStore.setLoading(true);

    return this.transport
      .getChannels(this.namespaceId)
      .then(({ meta, items }) =>
        this._channelsStore.updateStore({
          totalCount: meta.totalItems,
          channels: items,
        })
      )
      .catch(this._channelsStore.setError)
      .finally(() => this._channelsStore.setLoading(false));
  }

  getByName(channelName: string) {
    this._selectedChannelsStore.setLoading(true);

    return this.transport
      .getByName(this.namespaceId, channelName)
      .then((channel) => {
        this.selectedChannelName = channelName;
        this._selectedChannelsStore.updateStore({ [channelName]: channel });
      })
      .catch(this._selectedChannelsStore.setLoading)
      .finally(() => this._selectedChannelsStore.setLoading(false));
  }

  async getSelfChannels() {
    this._selfChannelsStore.setLoading(true);

    return this.transport
      .getSelf(this.namespaceId)
      .then((channels) => this._selfChannelsStore.updateStore({ channels }))
      .catch(this._selfChannelsStore.setLoading)
      .finally(() => this._selfChannelsStore.setLoading(false));
  }

  createChannel(data: TCreateChannelDto) {
    return this.transport.create(this.namespaceId, data).then((channel) => {
      this._selfChannelsStore.updateStore((state) => {
        state.channels.push(channel);
        return state;
      });
      if (this._channelsStore.getStore().totalCount < 30) {
        this._channelsStore.updateStore((state) => {
          state.channels.push(channel);
          return state;
        });
      }
      return channel;
    });
  }

  connect() {
    this.wsTransport.connect();
    this.wsTransport.sendJoinChannels(this.namespaceId);
    // this.wsTransport.listenNewChannelMembers(({ users, channelId }) => {
    //   const { members, channel } = this._selectedChannelsStore.getStore();
    //
    //   if (!members || channelId !== channel?.id) return;
    //
    //   members.items.push(...users);
    //   console.log(members);
    //   this._selectedChannelsStore.updateStoreValue('members', members);
    // });
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  reset() {
    this._selectedChannelsStore.resetStore();
    this._channelsStore.resetStore();
    this._selfChannelsStore.resetStore();
    this.namespaceId = '';
    this.selectedChannelName = '';
  }
}

export const channelsService = new ChannelsService(
  channelsTransport,
  channelsWsTransport
);
