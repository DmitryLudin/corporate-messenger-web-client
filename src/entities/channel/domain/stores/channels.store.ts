import { plainToInstance } from 'class-transformer';
import { Store } from 'shared/lib/core';

import { Channel } from '../models';

type TChannelsStore = {
  channelsMap: Map<Channel['id'], Channel | undefined>;
  selfChannelIds: Array<Channel['id']>;
};

export class ChannelsStore {
  private readonly _channelsStore = new Store<TChannelsStore>({
    channelsMap: new Map(),
    selfChannelIds: [],
  });

  get selfChannelIds() {
    return this._channelsStore.getStore().selfChannelIds;
  }

  setSelfChannelIds(ids: string[]) {
    this._channelsStore.updateStore({ selfChannelIds: ids });
  }

  addSelfChannelId(channelId: string) {
    this._channelsStore.updateStore((state) => {
      state.selfChannelIds.push(channelId);
      return state;
    });
  }

  removeSelfChannelId(channelId: string) {
    this._channelsStore.updateStore((state) => {
      state.selfChannelIds = state.selfChannelIds.filter(
        (id) => id !== channelId
      );
      return state;
    });
  }

  getChannel(channelId: string) {
    return this._channelsStore.getStore().channelsMap.get(channelId);
  }

  setChannel(channel: Channel) {
    const channels = this._channelsStore.getStore().channelsMap;
    channels.set(channel.id, channel);
    this._channelsStore.updateStore({ channelsMap: channels });
  }

  updateChannel(channelId: string, data: Partial<Channel>) {
    const channels = this._channelsStore.getStore().channelsMap;
    const channel = channels.get(channelId);

    if (channel) {
      channels.set(
        channelId,
        plainToInstance(Channel, { ...channel, ...data })
      );
      this._channelsStore.updateStore({ channelsMap: channels });
    }
  }

  reset() {
    this._channelsStore.resetStore();
  }
}

export const channelsStore = new ChannelsStore();
