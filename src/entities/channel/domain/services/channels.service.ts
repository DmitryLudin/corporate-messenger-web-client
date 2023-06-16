import { namespacesService, NamespacesService } from 'shared/domains/namespace';

import {
  channelMessagesStore,
  ChannelMessagesStore,
  channelsStore,
  ChannelsStore,
} from '../stores';
import {
  channelsTransport,
  ChannelsTransport,
  channelsWsTransport,
  ChannelsWsTransport,
} from '../transports';
import { TCreateChannelDto, TJoinChannelDto, TLeaveChannelDto } from '../dto';

export class ChannelsService {
  constructor(
    private readonly store: ChannelsStore,
    private readonly messagesStore: ChannelMessagesStore,
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport,
    private readonly namespaceService: NamespacesService
  ) {}

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
  }
}

export const channelsService = new ChannelsService(
  channelsStore,
  channelMessagesStore,
  channelsTransport,
  channelsWsTransport,
  namespacesService
);
