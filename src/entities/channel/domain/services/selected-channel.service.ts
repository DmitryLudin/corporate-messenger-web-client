import { namespacesService, NamespacesService } from 'shared/domains/namespace';
import { RequestStore } from 'shared/lib/core';

import { Channel } from '../models';
import { channelsStore, ChannelsStore } from '../stores';
import { channelsTransport, ChannelsTransport } from '../transports';

type TStore = {
  selectedChannelId: Channel['id'];
};

export class SelectedChannelService {
  private readonly _store = new RequestStore<TStore>({
    selectedChannelId: '',
  });

  get store() {
    return this._store.getStore();
  }

  get selectedChannel() {
    return this.channelsStore.getChannel(
      this._store.getStoreValue('selectedChannelId')
    );
  }

  constructor(
    private readonly channelsStore: ChannelsStore,
    private readonly transport: ChannelsTransport,
    private readonly namespaceService: NamespacesService
  ) {}

  fetchByName(channelName: string) {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();
    if (!namespaceId) return;

    this._store.setLoading(true);

    return this.transport
      .getByName(namespaceId, channelName)
      .then((channel) => {
        this._store.updateStore({ selectedChannelId: channel.id });
        this.channelsStore.setChannel(channel);
      })
      .catch(this._store.setStore)
      .finally(() => this._store.setLoading(false));
  }
}

export const selectedChannelService = new SelectedChannelService(
  channelsStore,
  channelsTransport,
  namespacesService
);
