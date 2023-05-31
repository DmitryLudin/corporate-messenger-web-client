import { namespacesService, NamespacesService } from 'shared/domains/namespace';

import { channelsStore, ChannelsStore } from '../stores';
import { channelsTransport, ChannelsTransport } from '../transports';

export class SelfChannelsService {
  getSelfChannelIds() {
    return this.store.selfChannelIds;
  }

  getChannelById(channelId: string) {
    return this.store.getChannel(channelId);
  }

  constructor(
    private readonly store: ChannelsStore,
    private readonly transport: ChannelsTransport,
    private readonly namespaceService: NamespacesService
  ) {}

  async fetchSelfChannels() {
    try {
      const namespaceId = this.namespaceService.getSelectedNamespaceId();
      if (!namespaceId) return;

      const channels = await this.transport.getSelf(namespaceId);
      const ids = channels.map((channel) => {
        this.store.setChannel(channel);
        return channel.id;
      });

      this.store.setSelfChannelIds(ids);
    } catch (error) {
      console.log(error);
    }
  }
}

export const selfChannelsService = new SelfChannelsService(
  channelsStore,
  channelsTransport,
  namespacesService
);
