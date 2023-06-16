import { namespacesService, NamespacesService } from 'shared/domains/namespace';
import { RequestStore } from 'shared/lib/core';

import { Channel } from '../models';
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
import { TCreateMessageDto } from '../dto';

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

  get channelMessages() {
    const channelId = this._store.getStore().selectedChannelId;
    return this.messagesStore.getMessages(channelId);
  }

  constructor(
    private readonly channelsStore: ChannelsStore,
    private readonly messagesStore: ChannelMessagesStore,
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport,
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

  async fetchMessages(channelId: string) {
    const namespaceId = this.namespaceService.getSelectedNamespaceId();
    if (!namespaceId) return;

    return this.transport.getMessages(namespaceId, channelId).then((data) => {
      data.items.forEach((message) =>
        this.messagesStore.addChannelMessage(channelId, message)
      );
    });
  }

  sendMessage(data: TCreateMessageDto) {
    this.wsTransport.sendChannelMessage(data);
  }
}

export const selectedChannelService = new SelectedChannelService(
  channelsStore,
  channelMessagesStore,
  channelsTransport,
  channelsWsTransport,
  namespacesService
);
