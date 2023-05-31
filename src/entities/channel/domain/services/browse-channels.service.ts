import { Channel } from 'entities/channel/domain/models';
import { namespacesService, NamespacesService } from 'shared/domains/namespace';
import { Store } from 'shared/lib/core';

import { channelsStore, ChannelsStore } from '../stores';
import { channelsTransport, ChannelsTransport } from '../transports';

type TStore = {
  channelIds: Array<Channel['id']>;
  totalCount: number;
};

export class BrowseChannelsService {
  private readonly _store = new Store<TStore>({
    channelIds: [],
    totalCount: 0,
  });

  get store() {
    return this._store.getStore();
  }

  getChannelById(channelId: string) {
    return this.channelsStore.getChannel(channelId);
  }

  constructor(
    private readonly channelsStore: ChannelsStore,
    private readonly transport: ChannelsTransport,
    private readonly namespaceService: NamespacesService
  ) {}

  async fetchChannels() {
    try {
      const namespaceId = this.namespaceService.getSelectedNamespaceId();
      if (!namespaceId) return;

      const { items, meta } = await this.transport.getChannels(namespaceId);
      const channelIds = items.map((channel) => {
        this.channelsStore.setChannel(channel);
        return channel.id;
      });
      this._store.updateStore({
        channelIds,
        totalCount: meta.totalItems,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const browseChannelsService = new BrowseChannelsService(
  channelsStore,
  channelsTransport,
  namespacesService
);
