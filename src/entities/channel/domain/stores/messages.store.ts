import { Store } from 'shared/lib/core';

import { Channel, ChannelMessageModel } from '../models';

type TStore = {
  messagesMap: Map<
    Channel['id'],
    Map<ChannelMessageModel['id'], ChannelMessageModel>
  >;
};

export class ChannelMessagesStore {
  private readonly _store = new Store<TStore>({ messagesMap: new Map() });

  getMessage(channelId: string, messageId: string) {
    return this._store.getStore().messagesMap.get(channelId)?.get(messageId);
  }

  addMessage(channelId: string, message: ChannelMessageModel) {
    const messagesMap = this._store.getStore().messagesMap;
    const channelMessagesMap = messagesMap.get(channelId);

    if (channelMessagesMap) {
      channelMessagesMap.set(message.id, message);
    } else {
      const channelMap = new Map();
      channelMap.set(message.id, message);
      messagesMap.set(channelId, channelMap);
    }

    this._store.updateStore({ messagesMap });
  }

  removeMessage(channelId: string, messageId: string) {
    const messagesMap = this._store.getStore().messagesMap;
    const channelMessagesMap = messagesMap.get(channelId);
    channelMessagesMap?.delete(messageId);
    this._store.updateStore({ messagesMap });
  }
}

export const channelMessagesStore = new ChannelMessagesStore();
