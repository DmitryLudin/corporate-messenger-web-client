import { Store } from 'shared/lib/core';

import { Channel, ChannelMessageModel } from '../models';

type TStore = {
  messagesMap: Map<Channel['id'], ChannelMessageModel[]>;
};

export class ChannelMessagesStore {
  private readonly _store = new Store<TStore>({ messagesMap: new Map() });

  getMessages(channelId: string) {
    return this._store.getStore().messagesMap.get(channelId);
  }

  addChannelMessage(channelId: string, message: ChannelMessageModel) {
    const messagesMap = this._store.getStore().messagesMap;
    messagesMap.set(channelId, [
      ...(messagesMap.get(channelId) || []),
      message,
    ]);
    this._store.updateStore({ messagesMap });
  }

  removeChannelMessage(channelId: string, messageId: string) {
    const messagesMap = this._store.getStore().messagesMap;
    const messages = messagesMap.get(channelId);

    if (!messages) return;

    messagesMap.set(
      channelId,
      messages.filter((message) => message.id !== messageId)
    );
    this._store.updateStore({ messagesMap });
  }
}

export const channelMessagesStore = new ChannelMessagesStore();
