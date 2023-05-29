import { BaseWsTransport } from 'shared/lib/core';
import { User } from 'shared/models';

import { ChannelsEventEnum } from '../const';

type TChannelsEventsMap = {
  [ChannelsEventEnum.JOIN_CHANNELS]: (namespaceId: string) => void;
  [ChannelsEventEnum.MEMBERS_ADDED]: (data: {
    users: User[];
    channelId: string;
  }) => void;
};

export class ChannelsWsTransport extends BaseWsTransport<TChannelsEventsMap> {
  constructor() {
    super('channels');
  }

  sendJoinChannels(namespaceId: string) {
    this.send(ChannelsEventEnum.JOIN_CHANNELS, namespaceId);
  }

  // listenNewChannelMembers(
  //   callback: TChannelsEventsMap[ChannelsEventEnum.MEMBERS_ADDED]
  // ) {
  //   this.listen(
  //     ChannelsEventEnum.MEMBERS_ADDED,
  //     this.deserialize(NewChannelMember, callback)
  //   );
  // }
}

export const channelsWsTransport = new ChannelsWsTransport();
