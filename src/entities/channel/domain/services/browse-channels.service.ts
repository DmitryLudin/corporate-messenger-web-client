import { Store } from 'shared/lib/core';

import { channelsStore, ChannelsStore } from '../stores';
import { channelsTransport, ChannelsTransport } from '../transports';
import { Channel } from '../models';

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

  constructor(
    private readonly transport: ChannelsTransport,
    private readonly channelsStore: ChannelsStore
  ) {}

  getChannelById(channelId: string) {
    return this.channelsStore.getChannel(channelId);
  }

  async fetchChannels(namespaceId: string) {
    try {
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
  channelsTransport,
  channelsStore
);
