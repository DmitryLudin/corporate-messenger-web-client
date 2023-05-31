import { BaseWsTransport } from 'shared/lib/core';

import { ChannelsEventEnum } from '../const';

type TChannelsEventsMap = {
  [ChannelsEventEnum.JOIN_CHANNELS]: (namespaceId: string) => void;
  [ChannelsEventEnum.MEMBERS_COUNT]: (data: {
    channelId: string;
    membersCount: number;
  }) => void;
};

export class ChannelsWsTransport extends BaseWsTransport<TChannelsEventsMap> {
  constructor() {
    super('channels');
  }

  sendJoinChannels(namespaceId: string) {
    this.send(ChannelsEventEnum.JOIN_CHANNELS, namespaceId);
  }

  listenNewChannelMembersCount(
    callback: TChannelsEventsMap[ChannelsEventEnum.MEMBERS_COUNT]
  ) {
    this.listen(ChannelsEventEnum.MEMBERS_COUNT, callback);
  }
}

export const channelsWsTransport = new ChannelsWsTransport();
