import { TCreateMessageDto } from 'entities/channel/domain/dto';
import { ChannelMessageModel } from 'entities/channel/domain/models';
import { BaseWsTransport } from 'shared/lib/core';

import { ChannelsEventEnum } from '../const';

type TChannelsEventsMap = {
  [ChannelsEventEnum.JOIN_CHANNELS]: (namespaceId: string) => void;
  [ChannelsEventEnum.MEMBERS_COUNT]: (data: {
    channelId: string;
    membersCount: number;
  }) => void;
  [ChannelsEventEnum.SEND_MESSAGE]: (data: TCreateMessageDto) => void;
  [ChannelsEventEnum.NEW_MESSAGE]: (data: ChannelMessageModel) => void;
};

export class ChannelsWsTransport extends BaseWsTransport<TChannelsEventsMap> {
  constructor() {
    super('channels');
  }

  sendJoinChannels(namespaceId: string) {
    this.send(ChannelsEventEnum.JOIN_CHANNELS, namespaceId);
  }

  sendChannelMessage(data: TCreateMessageDto) {
    this.send(ChannelsEventEnum.SEND_MESSAGE, data);
  }

  listenChannelNewMessage(
    callback: TChannelsEventsMap[ChannelsEventEnum.NEW_MESSAGE]
  ) {
    this.listen(ChannelsEventEnum.NEW_MESSAGE, callback);
  }

  listenNewChannelMembersCount(
    callback: TChannelsEventsMap[ChannelsEventEnum.MEMBERS_COUNT]
  ) {
    this.listen(ChannelsEventEnum.MEMBERS_COUNT, callback);
  }
}

export const channelsWsTransport = new ChannelsWsTransport();
