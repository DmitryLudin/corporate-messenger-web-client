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
import { IUnreadChannelTimestampDto, TCreateMessageDto } from '../dto';

type TStore = {
  selectedChannelId: Channel['id'];
};

type TMessagesStore = {
  messageIds: string[];
};

export class SelectedChannelService {
  private readonly _store = new RequestStore<TStore>({
    selectedChannelId: '',
  });
  private readonly _messagesStore = new RequestStore<TMessagesStore>({
    messageIds: [],
  });

  get store() {
    return this._store.getStore();
  }

  get channelMessagesStore() {
    return this._messagesStore.getStore();
  }

  get selectedChannel() {
    return this.channelsStore.getChannel(
      this._store.getStoreValue('selectedChannelId')
    );
  }

  constructor(
    private readonly channelsStore: ChannelsStore,
    private readonly messagesStore: ChannelMessagesStore,
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport
  ) {}

  getChannelMessage(messageId: string) {
    const channelId = this._store.getStore().selectedChannelId;
    return this.messagesStore.getMessage(channelId, messageId);
  }

  fetchByName(namespaceId: string, channelName: string) {
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

  async fetchMessages(namespaceId: string, channelId: string) {
    this._messagesStore.setLoading(true);
    return this.transport
      .getMessages(namespaceId, channelId)
      .then((data) => {
        const messageIds = data.items.map((message) => {
          this.messagesStore.addMessage(channelId, message);
          return message.id;
        });
        this._messagesStore.updateStore({ messageIds });
      })
      .catch(this._messagesStore.setError)
      .finally(() => this._messagesStore.setLoading(false));
  }

  sendMessage(data: TCreateMessageDto) {
    this.wsTransport.sendChannelMessage(data);
  }

  sendChannelViewed(data: IUnreadChannelTimestampDto) {
    console.log(data);
    this.wsTransport.sendChannelViewed(data);
    setTimeout(() => {
      this.channelsStore.updateChannel(data.channelId, {
        isUnread: false,
        lastReadTimestamp: data.timestamp,
      });
    }, 5000);
  }

  listenNewMessage() {
    this.wsTransport.listenChannelNewMessage((data) => {
      this.messagesStore.addMessage(data.channelId, data);
      this._messagesStore.updateStore((prevState) => {
        prevState.messageIds.push(data.id);
        return prevState;
      });
    });
  }

  resetStore() {
    this._store.resetStore();
    this._messagesStore.resetStore();
  }
}

export const selectedChannelService = new SelectedChannelService(
  channelsStore,
  channelMessagesStore,
  channelsTransport,
  channelsWsTransport
);
