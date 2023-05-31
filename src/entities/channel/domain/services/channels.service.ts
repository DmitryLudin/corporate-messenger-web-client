import { channelsStore, ChannelsStore } from 'entities/channel/domain/stores';
import { namespacesService, NamespacesService } from 'shared/domains/namespace';
import { RequestStore } from 'shared/lib/core';

import { TSelectedChannelsStore } from '../types';
import {
  channelsTransport,
  ChannelsTransport,
  channelsWsTransport,
  ChannelsWsTransport,
} from '../transports';
import { Channel } from '../models';
import { TCreateChannelDto, TJoinChannelDto, TLeaveChannelDto } from '../dto';

export class ChannelsService {
  private readonly _selectedChannelsStore =
    new RequestStore<TSelectedChannelsStore>({});

  private selectedChannelId: string = '';

  get selectedChannelsStore() {
    return this._selectedChannelsStore.getStore();
  }

  getSelectedChannel(): Channel | undefined {
    return this._selectedChannelsStore.getStoreValue(this.selectedChannelId);
  }

  constructor(
    private readonly store: ChannelsStore,
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport,
    private readonly namespaceService: NamespacesService
  ) {}

  getByName(channelName: string) {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();

    if (!namespaceId) return;

    this._selectedChannelsStore.setLoading(true);

    return this.transport
      .getByName(namespaceId, channelName)
      .then((channel) => {
        this.selectedChannelId = channel.id;
        this._selectedChannelsStore.updateStore({ [channel.id]: channel });
      })
      .catch(this._selectedChannelsStore.setLoading)
      .finally(() => this._selectedChannelsStore.setLoading(false));
  }

  async createChannel(data: TCreateChannelDto) {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();

    if (!namespaceId) return;

    return this.transport.create(namespaceId, data).then((channel) => {
      this.store.setChannel(channel);
      this.store.addSelfChannelId(channel.id);
      return channel;
    });
  }

  async joinChannel(channelId: string, data: TJoinChannelDto) {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();

    if (!namespaceId) return;

    return this.transport
      .join(namespaceId, channelId, data)
      .then((channel) => {
        this.store.setChannel(channel);
        this.store.addSelfChannelId(channel.id);
      })
      .catch();
  }

  async leaveChannel(channelId: string, data: TLeaveChannelDto) {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();

    if (!namespaceId) return;

    return this.transport
      .leave(namespaceId, channelId, data)
      .then((channel) => {
        this.store.setChannel(channel);
        this.store.removeSelfChannelId(channel.id);
      })
      .catch();
  }

  connect() {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();

    if (!namespaceId) return;

    this.wsTransport.connect();
    this.wsTransport.sendJoinChannels(namespaceId);
    this.wsTransport.listenNewChannelMembersCount(
      ({ membersCount, channelId }) => {
        this.store.updateChannel(channelId, { membersCount });
      }
    );
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  reset() {
    this.store.reset();
    this._selectedChannelsStore.resetStore();
    this.selectedChannelId = '';
  }
}

export const channelsService = new ChannelsService(
  channelsStore,
  channelsTransport,
  channelsWsTransport,
  namespacesService
);
